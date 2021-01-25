import React from 'react'

export default function CurrencyItem(props){

    const {ccy, base_ccy, buy, sale} = props.data

    return(
        <tr>
            <th>{ccy}</th>
            <td>{base_ccy}</td>
            <td>{Number(buy).toFixed(2)}</td>
            <td>{Number(sale).toFixed(2)}</td>
        </tr>

    )
}