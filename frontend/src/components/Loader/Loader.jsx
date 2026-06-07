import React from 'react';
import './Loader.scss';

export const Loader = ({ message = "Loading..." }) => {
    return (
        <div className="loader-overlay">
            <div className="loader-content">
                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
                <h2 className="loader-text">{message}</h2>
            </div>
        </div>
    );
};
