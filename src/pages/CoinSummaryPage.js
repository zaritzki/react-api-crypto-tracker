import React, { useState, useEffect } from 'react';
import CoinGecko from '../apis/CoinGecko';

import AppName from '../components/AppName';
import CoinLists from '../components/CoinLists';

import '../components/CoinLists.css';

const CoinSummaryPage = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const res = await CoinGecko.get('/coins/markets', {
                    params: {
                        vs_currency: 'eur',
                        order: 'market_cap_desc',
                        per_page: 10,
                        page: 1,
                        sparkline: false
                    }  
                }).then(res => {
                    // console.log(res.data);
                    setCoins(res.data);
                })
                .catch(err => {
                    console.log(err);
                });

            setLoading(false);
        }

        fetchData();
    }, []);

    const filteredCoins = coins.filter(coin => 
        coin.name.toLowerCase().includes(search.toLowerCase()) // make lowercase
    )

    // get whatever type in
    const handleChange = e => {
        e.preventDefault();
        setSearch(e.target.value.toLowerCase());
    }

    return (
        <div className="coin-app">
            <AppName />
            <div className="coin-search">
                <form>
                    <input type="text" placeholder="Search" className="coin-input" onChange={handleChange} />
                </form>
            </div>

            {loading ? 'Loading' : (
                <CoinLists filteredCoins={filteredCoins} />
                )
            }
        </div>
    )
}

export default CoinSummaryPage;
