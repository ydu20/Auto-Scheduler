import './App.css';
import SearchBar from './components/SearchBar'
import SearchList from './components/SearchList'
import CartList from './components/CartList'
import {useState, useEffect} from 'react'


function App() {

  const [searchQuery, setSearchQuery] = useState('');

  const [cart, setCart] = useState([]);

  return (
    <div className = "container dark">
      Auto-Schedule
      <div className = "search-bar">
        <SearchBar 
          searchQuery = {searchQuery}
          setSearchQuery = {setSearchQuery}/>
      </div>
      <section>
        <a id = "search-list">
          <SearchList searchQuery = {searchQuery} cart = {cart} setCart = {setCart}/>
        </a>
        <a key = {cart} id = "cart-list">
          <CartList cart = {cart} setCart={setCart}/>
        </a>
      </section>
      
    </div>
  );
}

export default App;
