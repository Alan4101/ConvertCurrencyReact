import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {fetchUACurrency} from '../../redux/actions'
import CurrencyItem from '../currency-rate/CurrencyItem'
import { AlertComponent } from '../Alert'
import { LoaderComponent } from '../Loader'


const CurrencyList = () =>{

    const dispatch = useDispatch()
    const currency = useSelector( state => state.currency.uaCurrency)
    const loader = useSelector(state => state.loadingAndError.isLoaded)
    const isError = useSelector(state => state.loadingAndError.loadError) 

    React.useEffect(()=>{
        dispatch(fetchUACurrency())
    },[dispatch])

    if(isError){
      return <AlertComponent type="error" title="Помилка!" message="Щось пішло не так. Спробуйте пізніше!"/>
    }else if(loader){
      return <LoaderComponent/>
    }else{
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
    
}

export default CurrencyList
