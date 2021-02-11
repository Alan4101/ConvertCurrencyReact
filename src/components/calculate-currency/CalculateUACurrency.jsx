import React, { useState, useEffect, useRef } from "react"
import axios from "axios"

import {
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  makeStyles,
} from "@material-ui/core"
import configAPI from "../configAPI"

import "./calculate-curency.css"

export default function CalculateUACurrency() {
  const [data, setData] = useState([])

  const [state, setState] = useState({
    ammount: null,
    result: null,
    currnecy: "USD",
    saleOrBuy: true,
    activeBtn: true,
  })

  const select = useRef(null)
  const paragrafCurrency = useRef(null)
  useEffect(() => {
    const getCurrencyRate = async () => {
      try {
        const datas = await axios.get(configAPI.API_PRIVATBANK)
        setData(datas.data)
      } catch (error) {
        throw error
      }
    }

    getCurrencyRate()
  }, [])

  useEffect(() => {
    if (!state.saleOrBuy) {
      data.forEach((i) => {
        if (i.ccy === state.currnecy) {
          setState((prev) => {
            const result = (state.ammount * Number(i.sale)).toFixed(4)
            const oneRate = (1 * Number(i.sale)).toFixed(4)
            return {
              ...prev,
              result,
              oneRate,
            }
          })
        }
      })
    } else {
      data.forEach((i) => {
        if (i.ccy === state.currnecy) {
          setState((prev) => {
            const result = (state.ammount * Number(i.buy)).toFixed(4)
            const oneRate = (1 * Number(i.buy)).toFixed(4)
            return {
              ...prev,
              result,
              oneRate,
            }
          })
        }
      })
    }
  }, [state.ammount, state.currnecy, data, state.saleOrBuy, state.activeBtn])

  const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 90,
      width: 50,
      color: "#fff",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
      color: "#fff",
    },
    select: {
      minWidth: 70,
    },
  }))

  const classes = useStyles()

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
      }
    })

    select.current.parentElement.prepend(paragrafCurrency.current)
    paragrafCurrency.current.parentElement.appendChild(select.current)
  }
  /*купити */
  const handleBuy = (e) => {
    e.preventDefault()
    setState((prev) => {
      return {
        ...prev,
        activeBtn: true,
      }
    })

    select.current.parentElement.prepend(paragrafCurrency.current)
    paragrafCurrency.current.parentElement.appendChild(select.current)
  }
  const { amount, result, currnecy, activeBtn, saleOrBuy } = state

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

          <div className="form-wrapper">
            <div className="form-block">
              <div ref={select} className="mb-3">
                <FormControl className={classes.select}>
                  <InputLabel id="baseCurrencySelect"></InputLabel>
                  <Select
                    labelId="baseCurrencySelect"
                    id="demo-simple-select"
                    value={currnecy}
                    name="currnecy"
                    onChange={handleChangeSelect}
                  >
                    {data.map((currency) => (
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
                    label="Введіть суму"
                    className={classes.label}
                    onChange={handleInputChange}
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
                    label={saleOrBuy ? "UAH" : currnecy}
                    value={
                      amount ? "" : result === null ? "Calculating..." : result
                    }
                  />
                </FormControl>
              </div>
            </div>
            {/* <div className="form-block">
              <p>{oneRate ? `1 ${currnecy} = ${oneRate} UAH` : ""}</p>
            </div> */}
          </div>
        </form>
      </div>
    </div>
  )
}
