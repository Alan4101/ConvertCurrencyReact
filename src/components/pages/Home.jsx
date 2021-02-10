import React from "react"
import CurrencyList from "../currency-rate/CurrencyList"
import CalculateCurrency from "../calculate-currency/CalculateCurrency"
import CalculateUACurrency from "../calculate-currency/CalculateUACurrency"
import TempCalculateCurrency from "../calculate-currency/TempCalculateCurrency"

export default function Home() {
  return (
    <div className="main-container">
      <div className="container text-center main-container">
        <div className="title-page">
          <h1>Конвертер валют</h1>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <TempCalculateCurrency />
            {/* <CalculateCurrency /> */}
          </div>
          <div className="col-md-6 col-sm-12">
            <CalculateUACurrency />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <CurrencyList />
          </div>
        </div>
      </div>
    </div>
  )
}
