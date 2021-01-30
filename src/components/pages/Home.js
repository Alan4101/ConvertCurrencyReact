import React from "react";
import CurrencyList from "../currency-rate/CurrencyList";

export default function Home() {
  return (
    <div className="main-container">
      <div className="container text-center main-container">
        <div className="title-page">
          <h1>Курс валют</h1>
        </div>
      <CurrencyList />
      </div>
    </div>
    
  );
}