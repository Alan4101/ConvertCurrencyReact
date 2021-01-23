import React, {useState, useEffect} from 'react'
import axios from 'axios'

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
            return{
                ...prev,
                [e.target.name]: e.target.value,

            }

        })
        console.log(optionsCurrency)
    }

    const handlerInput = e =>{
        const val = e.target.value

        setOptions((prevState) => {
            return {...prevState, amount: val ,result: null, data: null}
        })

    }

    useEffect(()=>{
        const amount = optionsCurrency.amount

        if(amount === isNaN){
            return;
        }else {
            axios.get(`https://api.exchangeratesapi.io/latest?base=${optionsCurrency.base}`)
                .then( res =>{

                    const date = res.data.date
                    const result = (res.data.rates[optionsCurrency.convertTo] * amount).toFixed(4)

                    setOptions(prev =>{
                        return{ ...prev, date, result }
                    })

                })
                .catch( err => console.log(err))
        }
    },[optionsCurrency])

    const { date, result , amount} = optionsCurrency

    return(
        <form className='form-currency'>
        <h3>Date: {date}</h3>
            <div className="form-wrapper">
                <div className="input-block">
                    <div className="mb-3">
                        <input type="text"  onChange={handlerInput} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <input
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
                            value={optionsCurrency.base}
                            className="form-select"
                            aria-label="Default select example"
                            onChange={handlerSelect}
                        >
                            {
                                currencies
                                    .filter(i => i !== optionsCurrency.convertTo)
                                    .map( currency => <option key={currency} value={currency}>{currency}</option>)
                            }
                        </select>
                    </div>
                    <div className="mb-3">
                        <select
                            name='convertTo'
                            value={optionsCurrency.convertTo}
                            className="form-select"
                            aria-label="Default select example"
                            onChange={handlerSelect}
                        >
                            {
                                currencies
                                    .filter( i => i !== optionsCurrency.base)
                                    .map( currency => <option key={currency} value={currency}>{currency}</option>)
                            }
                        </select>
                    </div>
                </div>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}