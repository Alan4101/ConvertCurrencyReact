import React, {useState, useEffect} from 'react'
import axios from 'axios'
import cc from 'currency-codes'
import config from "../config";

export default function CalculateCurrency(){

    const currencies =["USD", "EUR", "PLN","CZK", "RUB"]

    const [optionsCurrency, setOptions] = useState({
        base: "USD",
        convertTo:'EUR',
        amount: '',
        result: '',
        date: ''
    })

    const handlerSelect = e =>{
        setOptions(prev => {
            return{...prev, [e.target.name]: e.target.value,}
        })
    }

    const handlerInput = e =>{
        setOptions((prevState) => {
            return {...prevState, amount: e.target.value ,result: null, data: null}
        })
    }

    const handleSwap = e => {
        e.preventDefault()

        setOptions(prev => {
            return{...prev, convertTo: optionsCurrency.base, base: optionsCurrency.convertTo, result: null}
        })
    }

    useEffect(() => {
        let cleanup = false

        const calculate = async () =>{

            if(optionsCurrency.amount === isNaN){
                return null
            }else {
                try {
                    const response = await axios.get(`${config.API_EXCHANGE}${optionsCurrency.base}`)
                    const date = response.data.date
                    const result = (response.data.rates[optionsCurrency.convertTo] * optionsCurrency.amount).toFixed(4)

                    if(!cleanup){
                        setOptions(prev =>{
                            return{ ...prev, date, result }
                        })
                    }
                }catch (error) {
                    console.log(error.message)
                }
            }
        }

        calculate()

        return ()=> cleanup =true

    },[optionsCurrency])

    const { date, result , amount, convertTo, base} = optionsCurrency

    return(
        <form className='form-currency'>

        <h4>Курс взятий за поточну дату: {date}</h4>
            <p>{ amount==='' ? 0 : amount} <b>{base}</b> дорівнює {result} <b>{ convertTo}</b> </p>
            <div className="form-wrapper">
                <div className="input-block">

                    <div className="mb-3">
                        <label htmlFor='baseCurrency'>{cc.code(base).currency}</label>
                        <input id='baseCurrency' type="text"  onChange={handlerInput} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor='resultCurrency'>{cc.code(convertTo).currency}</label>
                        <input
                            id='resultCurrency'
                            type="text"
                            className="form-control"
                            value={amount === "" ? "0" : result === null ? "Calculating..." : result }
                            disabled/>
                    </div>
                </div>
                <div className="select-block">
                    <div className="mb-3">

                        <select
                            name='base'
                            value={base}
                            className="form-select"
                            aria-label="Default select example"
                            onChange={handlerSelect}
                        >
                            {
                                currencies
                                    .filter(i => i !== convertTo)
                                    .map( currency => <option key={currency} value={currency}>{currency}</option>)
                            }
                        </select>
                    </div>
                    <div className="mb-3">
                        <select
                            name='convertTo'
                            value={convertTo}
                            className="form-select"
                            aria-label="Default select example"
                            onChange={handlerSelect}
                        >
                            {
                                currencies
                                    .filter( i => i !== base)
                                    .map( currency => <option key={currency} value={currency}>{currency}</option>)
                            }
                        </select>
                    </div>
                </div>
            </div>

            <button type="button" onClick={handleSwap} className="btn btn-primary">Змінити</button>

        </form>
    )
}