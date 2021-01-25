import React from 'react'
import CalculateCurrency from '../calculate-currency/CalculateCurrency'

export default function Converter(){
    return(
        <div className='container container-converter'>
            {/*<h1>Конвертер валют</h1>*/}
            <CalculateCurrency/>
        </div>
    )
}