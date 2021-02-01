import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {fetchUACurrency} from '../redux/actions'
import CurrencyItem from './currency-rate/CurrencyItem'


export const TemtTest = () =>{

    const dispatch = useDispatch();
    const currency = useSelector( state => state.currency.uaCurrency);

    
    React.useEffect(()=>{
        dispatch(fetchUACurrency())
    },[dispatch])
    return(
        <div className="container">
            <h1>redux</h1>
            <table className="table table-currency">
          <thead className="thead-dark">
            <tr className="table-header">
              <th scope="col">Валюта</th>
              <th scope="col">Базова валюта</th>
              <th scope="col">Купівля</th>
              <th scope="col">Продаж</th>
            </tr>
          </thead>
          <tbody>
            {currency.map((i) => (
              <CurrencyItem key={i.ccy} data={i} />
            ))}
          </tbody>
        </table>
        </div>
    )
}
