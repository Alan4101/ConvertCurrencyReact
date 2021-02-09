import React from "react"
import CalculateCurrency from "../calculate-currency/CalculateCurrency"

export default function Converter() {
  return (
    <div className="main-container">
      <div className="container container-converter ">
        <CalculateCurrency />
      </div>
    </div>
  )
}
