import React from 'react';
import Loader from 'react-loader-spinner';
import './spinner.css';

function Spinner() {
    return (
        <div className="spinner">
            <Loader type="Bars" color="rgba(255,99,71 ,.75 )" opacity={0.5} height={150} width={150} />
            <p>Loading...</p>
        </div>
    )
}



export default Spinner;