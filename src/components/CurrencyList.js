import React,  { useState, useEffect} from 'react'
import CurrencyItem from "./CurrencyItem";

export default function CurrencyList (){

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result)

                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if(error){
        return <div>Error: {error.message}</div>;
    }else if(!isLoaded){
        return <div>Loading...</div>;
    }else {
        return (
            <div className="currency-list-container">
                <div className="sub-title__base-ccy">
                    <p>Базова валюта: { items[0]?items[0].base_ccy: 'UAH'}</p>
                </div>
                <ul className="list-currency">
                <li className='item-currency active'>
                    <span></span>
                    <span></span>
                    <span>Купівля</span>
                    <span>Продаж</span>
                </li>
                    {
                        items.map(i=> (<CurrencyItem key={i.ccy} data={i}/>))
                    }
                </ul>
            </div>


        )
    }
}
