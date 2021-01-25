import React from 'react'
import CurrencyList from '../currency-rate/CurrencyList'

export default function Home() {

return(
    <div className="container text-center">
        <div className="title-page">
            <h1>Курс валют</h1>
        </div>
        <CurrencyList/>
    </div>
)

}