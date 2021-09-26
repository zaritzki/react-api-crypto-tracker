import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import CoinSummaryPage from './pages/CoinSummaryPage';
import CoinDetailPage from './pages/CoinDetailPage';


import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Route exact path="/" component={CoinSummaryPage} />
      <Route exact path="/coins/:id" component={CoinDetailPage} />
    </BrowserRouter>
  )
};

export default App;
