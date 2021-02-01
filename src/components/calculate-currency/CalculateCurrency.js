import React, { useState, useEffect } from "react";

import Loader from "react-loader-spinner";
import axios from "axios";
import cc from "currency-codes";

import configAPI from "../configAPI";

import { Alert, AlertTitle } from "@material-ui/lab";
import {
  TextField,
  IconButton,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import ImportExportIcon from "@material-ui/icons/ImportExport";

import CalculateUACurrency from "./CalculateUACurrency" 
import "./calculate-curency.css"

export default function CalculateCurrency() {
  const currencies = ["USD", "EUR", "PLN", "CZK", "RUB"];
  const [optionsCurrency, setOptions] = useState({
    base: "USD",
    convertTo: "EUR",
    amount: "",
    result: "",
    date: "",
    oneRate: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSelect = (e) => {
    setOptions((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onlyNumber = (e) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, "");
  };

  const handleInput = (e) => {
    setOptions((prevState) => {
      return { ...prevState, amount: e.target.value, result: null, data: null };
    });
  };

  const handleSwap = (e) => {
    e.preventDefault();

    setOptions((prev) => {
      return {
        ...prev,
        convertTo: optionsCurrency.base,
        base: optionsCurrency.convertTo,
        result: null,
      };
    });
  };

  useEffect(() => {
    let cleanup = false;
    const calculate = async () => {
      try {
        if (optionsCurrency.amount === isNaN) {
          return null;
        } else {
          const response = await axios.get(
            `${configAPI.API_EXCHANGE}${optionsCurrency.base}`
          );
          const date = response.data.date;
          const result = (
            response.data.rates[optionsCurrency.convertTo] *
            optionsCurrency.amount
          ).toFixed(4);
          const oneRate = response.data.rates[
            optionsCurrency.convertTo
          ].toFixed(4);
          if (!cleanup) {
            setOptions((prev) => {
              return { ...prev, date, result, oneRate };
            });
          }
          setIsLoading(true);
        }
      } catch (error) {
        setIsError(true);
        console.log(error.message);
      }
    };

    calculate();

    return () => (cleanup = true);
  }, [optionsCurrency.base, optionsCurrency.convertTo, optionsCurrency.amount]);

  const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 200,
      color: "#fff",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
      color: "#fff",
    },
    select:{
      minWidth: 70
    }
  }));

  const classes = useStyles();

  const { date, result, amount, convertTo, base, oneRate } = optionsCurrency;

  if (isError) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Щось пішло не так!
      </Alert>
    );
  } else if (!isLoading) {
    return (
      <div className="loader-container">
        <div className="loader-wrapper">
          <Loader type="Bars" color="#8540f5" height={35} width={35} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="form-container">
        <h4 className="text-center">Конвертер іноземних валют</h4>
        
        <form className="form-currency">
          <div className="form-legend">
          <p className="text-center">Дата курсу: {date}</p>
        <p>
          {amount === "" ? 0 : amount} <b>{base}</b> дорівнює {result}{" "}
          <b>{convertTo}</b>
        </p>

            <p></p>
          </div>
          <div className="form-wrapper">
            <div className="form-block">
            <div className="mb-3">
                <FormControl className={classes.select}>
                  <InputLabel id="baseCurrencySelect">From</InputLabel>
                  <Select
                    labelId="baseCurrencySelect"
                    id="demo-simple-select"
                    value={base}
                    name="base"
                    onChange={handleSelect}
                  >
                    {currencies
                      .filter((i) => i !== convertTo)
                      .map((currency) => (
                        <MenuItem key={currency} value={currency}>
                          {currency}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
              <div className="mb-3">
                <FormControl className={classes.formControl}>
                  <TextField
                    itemType="number"
                    label={cc.code(base).currency}
                    onChange={handleInput}
                    onKeyPress={onlyNumber}
                    className= {classes.label}
                  />
                </FormControl>
              </div>
              
            </div>
            <div className="form-block">
              <div className="plr-1">
              <div className="form-block__wrapper">
                  <IconButton
                    className="btn color-theme"
                    onClick={handleSwap}
                    aria-label="Change"
                  >
                    <ImportExportIcon />
                  </IconButton>
                </div>
              
              </div>
                
            </div>
            <div className="form-block">
            <div className="mb-3">
                <FormControl className={classes.select}>
                  <InputLabel id="convertCurrencySelect">
                    To
                  </InputLabel>
                  <Select
                    labelId="convertCurrencySelect"
                    id="demo-simple-select"
                    value={convertTo}
                    name="convertTo"
                    onChange={handleSelect}
                  >
                    {currencies
                      .filter((i) => i !== base)
                      .map((currency) => (
                        <MenuItem key={currency} value={currency}>
                          {currency}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
              <div className="mb-3">
                <FormControl className={classes.formControl}>
                  <TextField
                    disabled
                    label={cc.code(convertTo).currency}
                    value={
                      amount === ""
                        ? ""
                        : result === null
                        ? "Calculating..."
                        : result
                    }
                  />
                </FormControl>
              </div>
              
            </div>
            <div className="form-block">
              <p>
                1 {base} = {oneRate} {convertTo}
              </p>
            </div>
          </div>
        </form>
        <CalculateUACurrency/>
      </div>
    );
  }
}
