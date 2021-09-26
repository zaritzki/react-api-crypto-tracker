import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CoinGecko from '../apis/CoinGecko';

import AppName from '../components/AppName';
import HistoryChart from '../components/HistoryChart';
import CoinData from '../components/CoinData';

import '../components/CoinDetails.css';

const CoinDetailPage = () => {
    const { id } = useParams();
    const [coinData, setCoinData] = useState({});
    const [loading, setLoading] = useState(false);

    const formatData = data => {
        return data.map((el) => {
            return {
                t: el[0],
                y: el[1].toFixed(2),
            }
        })
    }

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                setLoading(true);
    
                const [day, week, year, detail] = await Promise.all([
                    CoinGecko.get(`/coins/${id}/market_chart`, {
                        params: {
                            vs_currency: 'eur',
                            days: "1"
                        }
                    }),
                    CoinGecko.get(`/coins/${id}/market_chart`, {
                        params: {
                            vs_currency: 'eur',
                            days: "7"
                        }
                    }),
                    CoinGecko.get(`/coins/${id}/market_chart`, {
                        params: {
                            vs_currency: 'eur',
                            days: "365"
                        }
                    }),
                    CoinGecko.get('/coins/markets', {
                        params: {
                            vs_currency: 'eur',
                            ids: id
                        }
                    })
                ]);
    
                setCoinData({ 
                    day: formatData(day.data.prices),
                    week: formatData(week.data.prices),
                    year: formatData(year.data.prices),
                    detail: detail.data[0]
                });
    
                setLoading(false);
            }
    
            fetchData();
            
        }
    }, [id]);

    return (
        <div className="coin-app">
            <AppName />

            {loading ? 'Loading...' : (
                <>
                    <HistoryChart data={coinData} />
                    <CoinData />
                </>
            )}
        </div>
    )
}

export default CoinDetailPage;
