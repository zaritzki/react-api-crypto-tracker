import React, { useRef, useState, useEffect } from 'react';
import Chart from "chart.js";

import { HistoryOptions } from '../configs/ChartConfigs';
import imgUp from "../assets/up.png";
import imgDown from "../assets/down.png";

const HistoryChart = ({data}) => {
    const { day, week, year, all, detail } = data;
    
    const chartRef =  useRef();
    const [timeFormat, setTimeFormat] = useState('24h');
    
    const determineTimeFormat = () => {
        switch (timeFormat) {
            case '24h':
                return day;
            case '7d':
                return week;
            case '1y':  
                return year;
            case 'all':
                return all;
            default:
                return day;
        }
    }

    useEffect(() => {
        if (chartRef && chartRef.current && detail) {
            const chartIntance = new Chart(chartRef.current, {
                type: 'line',
                data: {
                    datasets: [{
                        label: `${detail.name} Price Trends`,
                        data: determineTimeFormat(),
                        backgroundColor: 'rgba(172, 50, 228, 0.1)',
                        borderColor: 'rgba(172, 50, 228, 1)',
                        pointRadius: 0,
                        borderWidth: 1
                    }]
                },
                options: {...HistoryOptions}
            });

        }
        
    });

    const renderPrice = () => {
        if (detail) {
            return (
                <>
                    <div className="coin-info">
                        <div className="coin">
                            <img src={detail.image} alt={detail.name} />
                            <h1>{detail.name}</h1>
                        </div>
                    </div>
                    <div className="chart-top">
                        <div className="chart-prices">
                            <p className="">&euro;{detail.current_price.toLocaleString()}</p>
                            <p className={detail.price_change_24h < 0 ? 'red' : 'green'}>
                                <img className="chart-arrow" src={detail.price_change_24h < 0 ? imgDown : imgUp} alt={detail.price_change_percentage_24h.toFixed(2)} />
                                {detail.price_change_percentage_24h.toFixed(2)}%
                            </p>
                        </div>
                        <div className="chart-button">
                            <button onClick={() => setTimeFormat('24h')} className="btn">24h</button>
                            <button onClick={() => setTimeFormat('7d')} className="btn">7d</button>
                            <button onClick={() => setTimeFormat('1y')} className="btn">1y</button>
                            <button onClick={() => setTimeFormat('all')} className="btn">All</button>
                        </div>
                    </div>
                </>
            )
        }
    }

    return (
        <div className="chart-container">
            <div className="">{renderPrice()}</div>
            <div>
                <canvas ref={chartRef} id="myChart" width={250} height={250}></canvas>
            </div>
        </div>
    );
}

export default HistoryChart;
