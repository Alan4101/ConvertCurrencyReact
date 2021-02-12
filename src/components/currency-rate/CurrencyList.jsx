import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import CurrencyItem from "../currency-rate/CurrencyItem"

import { fetchUACurrency } from "../../redux/actions"
import { AlertComponent } from "../Alert"
import { LoaderComponent } from "../Loader"

const CurrencyList = () => {
  const dispatch = useDispatch()
  const currency = useSelector((state) => state.currency.uaCurrency)
  const loader = useSelector((state) => state.loadingAndError.isLoaded)
  const isError = useSelector((state) => state.loadingAndError.loadError)

  useEffect(() => {
    dispatch(fetchUACurrency())
  }, [dispatch])

  if (isError) {
    return (
      <AlertComponent
        type="error"
        title="Помилка!"
        message="Щось пішло не так. Спробуйте пізніше!"
      />
    )
  } else if (loader) {
    return <LoaderComponent />
  } else {
    return (
      <div className="table-container">
        <h2 className="table-title">Курс валют</h2>
        <table className="table-currency-rate">
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Базова валюта</th>
              <th>Купівля</th>
              <th>Продаж</th>
            </tr>
          </thead>
          <tbody>
            {currency.map((i) => (
              <CurrencyItem key={i.ccy} data={i} />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default CurrencyList
