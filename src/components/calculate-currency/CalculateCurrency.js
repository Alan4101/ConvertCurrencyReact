import React, {useState, useEffect} from 'react'

import Loader from 'react-loader-spinner'
import axios from 'axios'
import cc from 'currency-codes'

import config from "../../config"

import { Alert, AlertTitle } from '@material-ui/lab'
import { TextField,
    IconButton,
    Select,
    InputLabel,
    FormControl,
    MenuItem,
    makeStyles
} from '@material-ui/core'
import ImportExportIcon from '@material-ui/icons/ImportExport'

import './calculate-curency.css'

export default function CalculateCurrency(){

    const currencies = ["USD", "EUR", "PLN","CZK", "RUB"]
    const [optionsCurrency, setOptions] = useState({
        base: "USD",
        convertTo:'EUR',
        amount: '',
        result: '',
        date: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false);

    const handleSelect = e =>{
        setOptions(prev => {
            return{...prev, [e.target.name]: e.target.value,}
        })
    }

    const onlyNumber = e =>{
        e.target.value = e.target.value.replace(/[^0-9.]/g,"");
    }

    const handleInput = e =>{
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

    const { date, result , amount, convertTo, base} = optionsCurrency

    useEffect(() => {
        let cleanup = false
        const calculate = async () =>{
            try {

                if(optionsCurrency.amount === isNaN){
                    return null
                }else {
                    const response = await axios.get(`${config.API_EXCHANGE}${optionsCurrency.base}`)
                    const date = response.data.date
                    const result = (response.data.rates[optionsCurrency.convertTo] * optionsCurrency.amount).toFixed(4)

                    if(!cleanup){
                        setOptions(prev =>{
                            return{ ...prev, date, result }
                        })
                    }
                    setIsLoading(true)
                }
            }catch (error) {
                setIsError(true)
                console.log(error.message)
            }
        }

        calculate()

        return ()=> cleanup =true

    }, [base, convertTo, amount])

    const useStyles = makeStyles((theme) => ({
        formControl: {
            minWidth: 200,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));
    const classes = useStyles()

    if(isError) {
        return(
            <Alert severity='error'>
                <AlertTitle>Error</AlertTitle>
                Щось пішло не так!
            </Alert>
        )
    }else if(!isLoading){
        return (
            <div className="loader-container">
                <div className="loader-wrapper">
                    <Loader type="Bars" color="#8540f5" height={35} width={35} />
                </div>
            </div>
        )
    }else {
        return(
            <div className="form-container">
                <h4>Курс взятий за поточну дату: {date}</h4>
                <p>{ amount==='' ? 0 : amount} <b>{base}</b> дорівнює {result} <b>{ convertTo}</b> </p>

                <form className='form-currency'>
                    <div className="form-wrapper">
                        <div className="form-block">
                            <div className="mb-3">
                                <TextField
                                    itemType='number'
                                    label={cc.code(base).currency}
                                    onChange={handleInput}
                                    onKeyPress={onlyNumber}
                                />
                            </div>
                            <div className="mb-3">
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="baseCurrencySelect">Базова валюта</InputLabel>
                                    <Select
                                        labelId="baseCurrencySelect"
                                        id="demo-simple-select"
                                        value={base}
                                        name="base"
                                        onChange={handleSelect}
                                    >
                                        {
                                            currencies
                                                .filter(i => i !== convertTo)
                                                .map( currency => <MenuItem  key={currency} value={currency}>{currency}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="form-block">
                            <div className="form-block__wrapper">
                                <IconButton
                                    className='btn btn-primary'
                                    onClick={handleSwap}
                                    aria-label="Change">
                                    <ImportExportIcon/>
                                </IconButton>
                            </div>
                        </div>
                        <div className="form-block">
                            <div className="mb-3">
                                <TextField
                                    disabled
                                    label={cc.code(convertTo).currency}
                                    value={amount === "" ? "" : result === null ? "Calculating..." : result }
                                />
                            </div>
                            <div className="mb-3">
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="convertCurrencySelect">Валюта для конвертації</InputLabel>
                                    <Select
                                        labelId="convertCurrencySelect"
                                        id="demo-simple-select"
                                        value={convertTo}
                                        name="convertTo"
                                        onChange={handleSelect}
                                    >
                                        {
                                            currencies
                                                .filter(i => i !== base)
                                                .map( currency => <MenuItem  key={currency} value={currency}>{currency}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}