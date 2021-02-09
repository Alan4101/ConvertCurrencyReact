import React from 'react'
import Loader from 'react-loader-spinner'

export const LoaderComponent = () =>{
    return(
        <div className="loader-container">
            <div className="loader-wrapper">
                <Loader type="Bars" color="#8540f5" height={35} width={35} />
            </div>
        </div>
    )
}