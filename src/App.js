import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Coin from "./Coin";

//https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const handlechange = (e) => {
    setSearch(e.target.value);
  };
  const filtredcoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search currency</h1>
        <form>
          <input
            type="text"
            placeholder="Search..."
            className="coin-input"
            onChange={handlechange}
            value={search}
          />
        </form>
      </div>
      {filtredcoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbole={coin.symbole}
            volume={coin.total_volume}
            price={coin.current_price}
            pricechange={coin.price_change_percentage_24h}
            marketcap={coin.market_cap}
          />
        );
      })}
    </div>
  );
}

export default App;
