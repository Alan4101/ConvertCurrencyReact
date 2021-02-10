import React, { useState, useEffect } from "react"
import axios from "axios"
import configAPI from "../configAPI"

import CurrencyForm from "./CurrencyForm"

import { LoaderComponent } from "../Loader"
import { AlertComponent } from "../Alert"

const CalculateCurrency = () => {
  const [optionsCurrency, setOptions] = useState({
    base: "USD",
    convertTo: "EUR",
    amount: "",
    result: "",
    date: "",
    oneRate: "",
    currencies: ["USD", "EUR", "PLN", "CZK", "RUB"],
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleSelect = (e) => {
    setOptions((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleInput = (e) => {
    setOptions((prevState) => {
      return { ...prevState, amount: e.target.value, result: null, data: null }
    })
  }

  const handleSwap = (e) => {
    e.preventDefault()

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
        opt={optionsCurrency}
      />
    )
  }
}

export default CalculateCurrency
