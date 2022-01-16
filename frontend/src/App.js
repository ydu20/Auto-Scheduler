import './App.css';
import SearchBar from './components/SearchBar'
import SearchList from './components/SearchList'
import CartList from './components/CartList'
import {useState, useEffect} from 'react'
import Buttons from './components/Buttons'
import Schedule from './components/schedule/Schedule'
import sampleTBs from './sample.json'

function App() {

  const [searchQuery, setSearchQuery] = useState('');

  const [cart, setCart] = useState([]);

  var [timetables, setTimetables] = useState([]);

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
        <a key = {cart} class = "cart-list">
          <CartList cart = {cart} setCart={setCart}/>
        </a>

        <a className = "schedule-buttons">
          {/* <Schedule timeTables = {timeTables} /> */}
          <Schedule timetables = {timetables} /> 
          <Buttons cart = {cart} setTimetables={setTimetables}/>
        </a>
      </section>
    </div>
  );
}

export default App;
