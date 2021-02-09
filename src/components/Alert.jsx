import React from 'react'
import { Alert, AlertTitle } from "@material-ui/lab"

export const AlertComponent = ({title, message, type}) =>{
    return(
        <Alert severity={type}>
            <AlertTitle>{title}</AlertTitle>
            {message}
        </Alert>
    )
}