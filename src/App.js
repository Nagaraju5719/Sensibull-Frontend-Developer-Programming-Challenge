import Stockspage from './Components/StocksPage';
import Quotespage from './Components/QuotesPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Grid } from "@mui/material"
import './App.css';

function App() {
  return (
    <Grid direction={"row"} justifyContent={'center'} alignItems={"center"}>
      <Router>
        <Routes>
          <Route exact path='/' element={<Stockspage />} />
          <Route exact path='/instruments' element={<Stockspage />} />
          <Route exact path='/quotes/:id' element={<Quotespage />} />
        </Routes>
      </Router>
    </Grid>
  );
}

export default App;
