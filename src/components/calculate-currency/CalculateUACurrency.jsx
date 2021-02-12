import React, { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import cc from "currency-codes"
import {
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@material-ui/core"
import useStyles from "./styleConfig"

import { fetchUACurrency } from "../../redux/actions"
import { swapBlockElements, onlyNumber } from "../../utils/utils"
import "./calculate-curency.css"

export default function CalculateUACurrency() {

  const dispatch = useDispatch()
  const currencyData = useSelector((state) => state.currency.uaCurrency)
  const classes = useStyles()

  const select = useRef(null)
  const paragrafCurrency = useRef(null)

  const [state, setState] = useState({
    ammount: null,
    result: null,
    currnecy: "USD",
    saleOrBuy: true,
    activeBtn: true,
  })

  function calculateResultAndRate(element, amount, type = "buy") {
    const result = (type === "buy"
      ? +amount * Number(element[type])
      : +amount / Number(element[type])
    ).toFixed(3)
    const oneRate = (type === "buy"
      ? 1 * Number(element[type])
      : 1 / Number(element[type])
    ).toFixed(3)
    setState((prevState) => {
      return {
        ...prevState,
        result,
        oneRate,
      }
    })
  }

  useEffect(() => {
    dispatch(fetchUACurrency())
  }, [dispatch])

  useEffect(() => {
    currencyData.forEach((i) => {
      if (i.ccy === state.currnecy) {
        !state.saleOrBuy
          ? calculateResultAndRate(i, state.ammount, "sale")
          : calculateResultAndRate(i, state.ammount, "buy")
      }
    })
  }, [state.ammount, state.currnecy, state.saleOrBuy, currencyData])

  const handleChangeSelect = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        currnecy: e.target.value,
      }
    })
  }

  const handleInputChange = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        ammount: e.target.value,
      }
    })
  }

  const handleSale = (e) => {
    e.preventDefault()
    setState((prev) => {
      return {
        ...prev,
        activeBtn: false,
        saleOrBuy: false,
      }
    })
    swapBlockElements(select, paragrafCurrency)
  }
  /*купити */
  const handleBuy = (e) => {
    e.preventDefault()
    setState((prev) => {
      return {
        ...prev,
        saleOrBuy: true,
        activeBtn: true,
      }
    })
    swapBlockElements(paragrafCurrency, select)
  }
  const { amount, result, currnecy, activeBtn, saleOrBuy, oneRate } = state

  return (
    <div className="form-container">
      <div className="form-ua-convert">
        <form className="form-currency">
          <div className="form-legend">
            <h2 className="table-title">Конвертер валют в UAH</h2>
            <div className="form-block">
              <button
                disabled={activeBtn ? true : false}
                onClick={handleBuy}
                className={
                  activeBtn ? "btnm-primary active-btn" : "btnm-primary"
                }
              >
                Купити
              </button>
              <button
                disabled={activeBtn ? false : true}
                onClick={handleSale}
                className={
                  activeBtn ? "btnm-primary" : "btnm-primary active-btn"
                }
              >
                Продати
              </button>
            </div>
          </div>
          <div className="form-wrapper ">
            <div className="form-block">
              <div ref={select} className="mb-3">
                <FormControl className={classes.select}>
                  <InputLabel id="baseCurrencySelect"></InputLabel>
                  <Select
                    labelId="baseCurrencySelect"
                    id="demo-simple-select"
                    value={currnecy}
                    onChange={handleChangeSelect}
                  >
                    {currencyData.map((currency) => (
                      <MenuItem key={currency.buy} value={currency.ccy}>
                        {currency.ccy}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="mb-3">
                <FormControl className={classes.formControl}>
                  <TextField
                    itemType="number"
                    label="100"
                    className={classes.label}
                    onChange={handleInputChange}
                    onKeyDown={onlyNumber}
                  />
                </FormControl>
              </div>
            </div>
            <div className="form-block">
              <div ref={paragrafCurrency} className="mb-3">
                <p className="currency-text">UAH</p>
              </div>
              <div className="mb-3">
                <FormControl className={classes.formControl}>
                  <TextField
                    disabled
                    name="value"
                    label={saleOrBuy ? "UAH" : currnecy}
                    value={
                      amount ? "" : result === null ? "Calculating..." : result
                    }
                  />
                </FormControl>
              </div>
            </div>
          </div>
          <div className="form-block">
            <p className="one-rate-p">
              {oneRate
                ? saleOrBuy
                  ? `1 ${cc.code(currnecy).currency} = ${oneRate} UAH`
                  : `1 UAH = ${oneRate} ${cc.code(currnecy).currency} `
                : ""}
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
