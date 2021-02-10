import React, { useState, useEffect } from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import axios from "axios"
import configAPI from "../configAPI"

import {
  fetchForeignCurrency,
  changeBase,
  changeConvert,
  changeAmount,
} from "../../redux/actions"

import CurrencyForm from "./CurrencyForm"
import { LoaderComponent } from "../Loader"
import { AlertComponent } from "../Alert"

const TempCalculateCurrency = (props) => {
  const currencies = ["USD", "EUR", "PLN", "CZK", "RUB"]

  const [optionsCurrency, setOptions] = useState({
    base: "USD",
    convertTo: "EUR",
    amount: "",
    result: "",
    date: "",
    oneRate: "",
  })

  const dispatch = useDispatch()
  //   const isLoading = useSelector((state) => state.loadingAndError.isLoaded)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleSelect = (e) => {
    setOptions((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
    // if (e.target.name === "base") {
    //   dispatch(changeBase(e.target.value))
    // } else {
    //   dispatch(changeConvert(e.target.value))
    //   console.log(e.target.value)
    // }
  }
  //   console.log(optionss)

  const handleInput = (e) => {
    setOptions((prevState) => {
      return { ...prevState, amount: e.target.value, result: null, data: null }
    })
    // dispatch(changeAmount(e.target.value))
  }

  const handleSwap = (e) => {
    e.preventDefault()
    // dispatch(changeBase())
    setOptions((prev) => {
      return {
        ...prev,
        convertTo: optionsCurrency.base,
        base: optionsCurrency.convertTo,
        result: null,
      }
    })
  }

  useEffect(() => {
    let cleanup = false
    const calculate = async () => {
      try {
        if (optionsCurrency.amount === isNaN) {
          return null
        } else {
          const response = await axios.get(
            `${configAPI.API_EXCHANGE}${optionsCurrency.base}`
          )
          const date = response.data.date
          const result = (
            response.data.rates[optionsCurrency.convertTo] *
            optionsCurrency.amount
          ).toFixed(4)
          const oneRate = response.data.rates[
            optionsCurrency.convertTo
          ].toFixed(4)
          if (!cleanup) {
            setOptions((prev) => {
              return { ...prev, date, result, oneRate }
            })
          }
          setIsLoading(true)
        }
      } catch (error) {
        setIsError(true)
        console.log(error.message)
      }
    }

    calculate()

    return () => (cleanup = true)
  }, [optionsCurrency.base, optionsCurrency.convertTo, optionsCurrency.amount])

  //   useEffect(() => {
  //     dispatch(fetchForeignCurrency())
  //   }, [dispatch])

  const { date, result, amount, convertTo, base } = optionsCurrency
  const opt = {
    date,
    result,
    amount,
    convertTo,
    base,
    currencies,
  }
  if (isError) {
    return (
      <AlertComponent
        type="error"
        title="Помилка!"
        message="Щось пішло не так. Спробуйте пізніше!"
      />
    )
  } else if (!isLoading) {
    return <LoaderComponent />
  } else {
    return (
      <CurrencyForm
        onChangeInput={handleInput}
        onClickBtnSwap={handleSwap}
        onChangeSelect={handleSelect}
        //   opt={props}
        opt={opt}
      />
    )
  }
}
const mapDispatchToProps = {
  changeBase,
  changeConvert,
  changeAmount,
}
const mapStateToProps = (state) => ({
  date: state.currency.date,
  amount: state.currency.amount,
  base: state.currency.base,
  convertTo: state.currency.convertTo,
  result: state.currency.result,
  currencies: state.currency.currencies,
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TempCalculateCurrency)
