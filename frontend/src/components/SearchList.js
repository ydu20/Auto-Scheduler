import React, { useEffect, useState } from 'react'
import SearchListItem from './searchListItem'

const SearchList = ( {searchQuery, cart, setCart} ) => {

    let [results, setResults] = useState([])

    useEffect(() => {
        let query = searchQuery.toLowerCase();
        getResults(query)
    }, [searchQuery])

    let getResults = async (query) => {
        if (query.length >= 3) {
            let response = await fetch('http://127.0.0.1:8000/api/search/' + query)
            console.log(response)
            let data = await response.json()
            console.log(data)
            data.sort((a, b) => {
                return (a.id.localeCompare(b.id))
            })
            setResults(data)
        } else {
            setResults([])
        }
    }

    return (
        <div>
        {results.map((course, index) => (
                <SearchListItem key = {index} course = {course} cart = {cart} setCart = {setCart}/>
            ))}
        </div>
    )
        
    
}

export default SearchList;