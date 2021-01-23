import React from 'react'
import CalculateCurrency from '../components/calculateCurrency'

export default function Converter(){
    return(
        <div className='container'>
            <h1>Конвертер валют</h1>
            <CalculateCurrency/>
        </div>
    )
}