import React from 'react'
import CurrencyList from '../components/CurrencyList'

export default function Home() {

return(
    <div className="container">
        <div className="title-page">
            <h1>Курс валют</h1>
        </div>
        <CurrencyList/>
    </div>
)

}