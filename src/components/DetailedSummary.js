import React from 'react';

const DetailedSummary = ({data}) => {
    // console.log(data.fully_diluted_valuation)
    return (
        <div className="coin-summary">
            {data.market_cap ? (
                <p>
                    <span>Market Cap</span>
                    <strong>&euro;{data.market_cap.toLocaleString()}</strong>
                </p>
            ):''}
            {data.total_volume ? (
                <p>
                    <span>24 Hour Trading Vol</span>
                    <strong>&euro;{data.total_volume.toLocaleString()}</strong>
                </p>
            ):''}
            {data.fully_diluted_valuation ? (
                <p>
                    <span>Fully Diluted Valuation</span>
                    <strong>&euro;{data.fully_diluted_valuation.toLocaleString()}</strong>
                </p>
            ):''}
            {data.circulating_supply ? (
                <p>
                    <span>Circulating Supply</span>
                    <strong>{data.circulating_supply.toLocaleString()}</strong>
                </p>
            ):''}
            {data.total_supply ? (
                <p>
                    <span>Total Supply</span>
                    <strong>{data.total_supply.toLocaleString()}</strong>
                </p>
            ):''}
            {data.max_supply ? (
                <p>
                    <span>Max Supply</span>
                    <strong>{data.max_supply.toLocaleString()}</strong>
                </p>
            ):''}
        </div>
    )
}

export default DetailedSummary;
