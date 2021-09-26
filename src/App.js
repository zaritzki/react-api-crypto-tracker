import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';
import Coin from './Coin';


function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      .then(res => {
        // console.log(res.data);
        setCoins(res.data);
        
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // get whatever type in
  const handleChange = e => {
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) // make lowercase
  )

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-title">React CryptoCurrency Tracker</h1>
        <form>
          <input type="text" placeholder="Search" className="coin-input" onChange={handleChange} />
        </form>
      </div>
      <div className="coin-container">
        {filteredCoins.map(coin =>{
          return (
            <Coin 
              key={coin.id} 
              name={coin.name} 
              image={coin.image} 
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              volume={coin.total_volume}
            />
          )
        })}
      </div>
    </div>
  );
}

export default App;
