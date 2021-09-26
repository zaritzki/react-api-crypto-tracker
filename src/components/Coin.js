import React from 'react';
import { Link } from 'react-router-dom';

const Coin = ({ 
    id,
    name, 
    image, 
    symbol, 
    price, 
    volume, 
    priceChange,
    marketcap
}) => {

    return (
        <Link to={`/coins/${id}`} className="coin-row">
            <div className="coin-info">
                <div className="coin">
                    <img src={image} alt={name} />
                    <h1>{name}</h1>
                    <p className="coin-symbol">{symbol.toUpperCase() }</p>
                </div>
            </div>
            <div className="coin-detail">
                <div className="coin-data">
                    <p className="coin-price"><span>Price:</span> &euro;{price.toLocaleString()}</p>
                    {priceChange < 0 ? (
                        <p className="coin-percent red"><span>24h:</span> {priceChange.toFixed(2)}%</p>
                    ) : (
                        <p className="coin-percent green"><span>24h:</span> {priceChange.toFixed(2)}%</p>
                    )}
                    <p className="coin-volume"><span>24h Volume:</span> &euro;{volume.toLocaleString()}</p>
                    <p className="coin-marketcap"><span>Mkt Cap:</span> &euro;{marketcap.toLocaleString()}</p>
                </div>
            </div>
        </Link>
    )
};

export default Coin;
