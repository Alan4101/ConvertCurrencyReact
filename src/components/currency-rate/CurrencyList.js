import React,  { useState, useEffect} from 'react'

import Loader from "react-loader-spinner"

import configAPI from "../configAPI"
import CurrencyItem from "./CurrencyItem"

export default function CurrencyList (){

    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch(configAPI.API_PRIVATBANK)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true)
                    setItems(result)

                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }, [])



    if(error){
        return <div>Error: {error.message}</div>
    }else if(!isLoaded){
        // return <div>Loading...</div>
        return (
            <div className="loader-container">
                <div className="loader-wrapper">
                    <Loader type="Bars" color="#8540f5" height={35} width={35} />
                </div>
            </div>

        )
    }else {
        return (
            <div className="currency-list-container">
                <div className="sub-title__base-ccy">
                    <p>Базова валюта: { items[0]?items[0].base_ccy: 'UAH'}</p>
                </div>
                <table className="table table-currency">
                    <thead className="thead-dark">
                    <tr className="table-header">
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col">Купівля</th>
                        <th scope="col">Продаж</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        items.map(i=> (<CurrencyItem key={i.ccy} data={i}/>))
                    }

                    </tbody>
                </table>
            </div>


        )
    }
}
