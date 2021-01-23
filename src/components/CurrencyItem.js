import React from 'react'

export default function CurrencyItem(props){

    const {ccy, base_ccy, buy, sale} = props.data

    return(
        <li className="item-currency">
            <span>{ccy} </span>
            <span>{base_ccy} </span>
            <span>{Number(buy).toFixed(2)} </span>
            <span>{Number(sale).toFixed(2)} </span>
        </li>
    )
}