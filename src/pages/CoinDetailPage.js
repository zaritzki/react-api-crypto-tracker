import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CoinGecko from '../apis/CoinGecko';

import Loader from '../components/Loader';
import HistoryChart from '../components/HistoryChart';
import CoinMoreData from '../components/CoinMoreData';

import '../assets/CoinDetails.css';


const CoinDetailPage = () => {
    const { id } = useParams();
    const [coinData, setCoinData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const formatData = data => {
        return data.map((el) => {
            return {
                t: el[0],
                y: el[1].toFixed(2),
            }
        })
    }

    useEffect(() => {
        const fetchData = async () => {

            setIsLoading(true);

            const [day, week, year, all, detail, detailsMore] = await Promise.all([
                CoinGecko.get(`/coins/${id}/market_chart`, {
                    params: {
                        vs_currency: 'eur',
                        days: "1"
                    },
                }),
                CoinGecko.get(`/coins/${id}/market_chart`, {
                    params: {
                        vs_currency: 'eur',
                        days: "7"
                    },
                }),
                CoinGecko.get(`/coins/${id}/market_chart`, {
                    params: {
                        vs_currency: 'eur',
                        days: "365"
                    },
                }),
                CoinGecko.get(`/coins/${id}/market_chart`, {
                    params: {
                        vs_currency: 'eur',
                        days: "max"
                    },
                }),
                CoinGecko.get('/coins/markets', {
                    params: {
                        vs_currency: 'eur',
                        ids: id
                    },
                }),
                CoinGecko.get(`/coins/${id}`, {
                    params: {
                        localization: false,
                        tickers: false,
                        market_data: false,
                        community_data: false,
                        developer_data: false,
                    },
                }),
            ]);

            setCoinData({ 
                day: formatData(day.data.prices),
                week: formatData(week.data.prices),
                year: formatData(year.data.prices),
                all: formatData(all.data.prices),
                detail: detail.data[0],
                detailsMore: detailsMore.data
            });

            setIsLoading(false);
        }

        fetchData();
    }, [id]);

    return (
        <div className="coin-app">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <HistoryChart data={coinData} />
                    <CoinMoreData data={[coinData.detail, coinData.detailsMore]} />
                </>
            )}
        </div>
    )
}

export default CoinDetailPage;
