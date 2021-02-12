import React from "react"
import cc from "currency-codes"
import {
  TextField,
  IconButton,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  
} from "@material-ui/core"
import ImportExportIcon from "@material-ui/icons/ImportExport"
import useStyles from './styleConfig'
import { onlyNumber } from '../../utils/utils'

import "./calculate-curency.css"

export default function CurrencyForm(props) {

  const classes = useStyles()
  const {
    date,
    result,
    amount,
    convertTo,
    base,
    currencies,
    oneRate,
  } = props.opt

  const handleChangeInput = (e) => {
    props.onChangeInput(e)
  }
  const handleBtnSwap = (e) => {
    props.onClickBtnSwap(e)
  }
  const handleChangeSelect = (e) => {
    props.onChangeSelect(e)
  }
  return (
    <div className="form-container">
      <form className="form-currency">
        <div className="form-legend">
          <h2 className="table-title">Конвертер іноземних валют</h2>
          <p className="">Середній курс у банках на: {date}</p>
        </div>
        <div className="form-wrapper form-foreign__wrapper">
          <div className="form-block">
            <div className="mb-3">
              <FormControl className={classes.select}>
                <InputLabel id="baseCurrencySelect"></InputLabel>
                <Select
                  labelId="baseCurrencySelect"
                  id="demo-simple-select"
                  value={base}
                  name="base"
                  onChange={handleChangeSelect}
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
                  label="100"
                  onChange={handleChangeInput}
                  onKeyPress={onlyNumber}
                  className={classes.label}
                />
              </FormControl>
            </div>
          </div>
          <div className="form-block">
            <div className=" plr-1">
              <div className="form-block__wrapper">
                <IconButton
                  className="btn-theme text-color"
                  onClick={handleBtnSwap}
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
                <InputLabel id="convertCurrencySelect"></InputLabel>
                <Select
                  labelId="convertCurrencySelect"
                  id="demo-simple-select"
                  value={convertTo}
                  name="convertTo"
                  onChange={handleChangeSelect}
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
                  label="100"
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
        </div>
        <div className="form-block block-center">
          <p className="one-rate-p">
            1 {cc.code(base).currency} = {oneRate} {cc.code(convertTo).currency}
          </p>
        </div>
      </form>
    </div>
  )
}
