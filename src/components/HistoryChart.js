import React, { useRef, useState, useEffect } from 'react';
import Chart from "chart.js/auto";

import { HistoryOptions } from '../configs/ChartConfigs';

const HistoryChart = ({data}) => {
    const chartRef =  useRef();
    const [timeFormat, setTimeFormat] = useState('24h');

    const { day, week, year, detail } = data;

    console.log(day);

    const determineTimeFormat = () => {
        switch (timeFormat) {
            case '24h':
                return day;
            case '7d':
                return week;
            case '1y':
                return year;
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
                        label: `${detail.name} price`,
                        // data: [12, 19, 3, 5, 2, 3],
                        data: determineTimeFormat(),
                        backgroundColor: 'rgba(172, 50, 228, 0.2)',
                        borderColor: 'rgba(172, 50, 228, 1)',
                        pointRadius: 0,
                        borderWidth: 1
                    }]
                },
                options: {...HistoryOptions}
            });

        }
        
    },[chartRef, detail]);

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
                    <p className="">{detail.current_price.toFixed(2)}</p>
                    <p className={detail.price_change_24h < 0 ? 'red' : 'green'}>
                        {detail.price_change_percentage_24h.toFixed(2)}%
                    </p>
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
            <div className="chart-button mt-1">
                <button onClick={() => setTimeFormat('24h')} className="btn btn-outline-secondary btn-sm">24h</button>
                <button onClick={() => setTimeFormat('7d')} className="btn btn-outline-secondary btn-sm mx-1">7d</button>
                <button onClick={() => setTimeFormat('1y')} className="btn btn-outline-secondary btn-sm">1y</button>
            </div>
        </div>
    )
}

export default HistoryChart;
