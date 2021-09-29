import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header';
import CoinSummaryPage from './pages/CoinSummaryPage';
import CoinDetailPage from './pages/CoinDetailPage';


import './assets/App.css';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={CoinSummaryPage} />
      <Route exact path="/coins/:id" component={CoinDetailPage} />
    </BrowserRouter>
  )
};

export default App;
