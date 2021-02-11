import React from "react"
import cc from "currency-codes"

import {
  TextField,
  IconButton,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  makeStyles,
} from "@material-ui/core"
import ImportExportIcon from "@material-ui/icons/ImportExport"
import "./calculate-curency.css"

export default function CurrencyForm(props) {
  const {
    date,
    result,
    amount,
    convertTo,
    base,
    currencies,
    oneRate,
  } = props.opt

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

  const onlyNumber = (e) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, "")
  }
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
                  label={cc.code(base).currency}
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
        </div>
        <div className="form-block block-center">
          <p className="one-rate-p">
            1 {base} = {oneRate} {convertTo}
          </p>
        </div>
      </form>
    </div>
  )
}
