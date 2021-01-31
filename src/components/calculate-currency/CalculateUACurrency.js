import React, { useState, useEffect } from "react";
import axios from "axios";
import configAPI from "../configAPI";

// import { Alert, AlertTitle } from "@material-ui/lab";
import {
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  makeStyles,
} from "@material-ui/core";

export default function CalculateUACurrency() {
  const [data, setData] = useState([]);

  const [state, setState] = useState({
    ammount: null,
    result: null,
    currnecy: "",
  });

  useEffect(() => {
    const getCurrencyRate = async () => {
      try {
        const datas = await axios.get(configAPI.API_PRIVATBANK);
        setData(datas.data);
        console.log(datas.data)
      } catch (error) {
        throw error;
      }
    };

    getCurrencyRate();
  }, []);

  useEffect(() => {

    data.forEach( i=>{
      if (i.ccy === state.currnecy) {
        setState((prev) => {
            const result = (state.ammount * Number(i.buy)).toFixed(3)
          return {
            ...prev,
            result
          };
        });
      }
    });
  }, [state.ammount, state.currnecy, data]);

  const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 200,
      color: "#fff",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
      color: "#fff",
    },
  }));

  const classes = useStyles();

  const handleChangeSelect = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        currnecy: e.target.value,
      };
    });
  };

  const handleInputChange = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        ammount: e.target.value,
      };
    });
  };

  const { amount, result, currnecy } = state;

  return (
    <div className="form-ua-convert">
      <form className="form-currency">
        <div className="form-wrapper">
          <div className="form-block">
            <div className="mb-3">
              <FormControl className={classes.formControl}>
                <TextField
                  itemType="number"
                  label="Введіть суму"
                  className={classes.label}
                  onChange={handleInputChange}
                />
              </FormControl>
            </div>
            <div className="mb-3">
              <FormControl className={classes.formControl}>
                <InputLabel id="baseCurrencySelect">Оберіть валюту</InputLabel>
                <Select
                  labelId="baseCurrencySelect"
                  id="demo-simple-select"
                  value={currnecy}
                  name="currnecy"
                  onChange={handleChangeSelect}
                >
                  {data.map( currency => (
                        <MenuItem key={currency.buy} value={currency.ccy}>
                          {currency.ccy}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="form-block">
            <div className="mb-3">
              <FormControl className={classes.formControl}>
                <TextField
                  disabled
                  label="UAH"
                  value={
                    amount ? "" : result === null ? "Calculating..." : result
                  }
                />
              </FormControl>
            </div>
          </div>
          <div className="form-block">
            <p>{/* 1 {base} = {oneRate} {convertTo} */}</p>
          </div>
        </div>
      </form>
    </div>
  );
}
