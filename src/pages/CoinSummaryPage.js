import React, { useState, useEffect } from 'react';
import CoinGecko from '../apis/CoinGecko';

import Loader from '../components/Loader';
import CoinLists from '../components/CoinLists';

import '../assets/CoinLists.css';

const CoinSummaryPage = () => {
    const [coins, setCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            const res = await CoinGecko.get('/coins/markets', {
                params: {
                    vs_currency: 'eur',
                    order: 'market_cap_desc',
                    per_page: 20,
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

            setIsLoading(false);
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
            <div className="coin-search">
                <form>
                    <input type="text" placeholder="Search" className="coin-input" onChange={handleChange} />
                </form>
            </div>

            {isLoading ? (
                <Loader />
            ) : (
                <CoinLists filteredCoins={filteredCoins} />
                )
            }
        </div>
    )
}

export default CoinSummaryPage;
