import React from 'react'


const SearchListItem = ({course, cart, setCart}) => {

    let addCourse = () => {
        const reducer = (prev, curr) => {
            return prev || (curr.id == course.id)
        }
        if (cart.length < 6 && (cart.length === 0 || !cart.reduce(reducer, false))) {
            updateCart()
        }
    }

    let updateCart = async () => {
        const newCart = [...cart]
        let response = await fetch('http://127.0.0.1:8000/api/course/' + course.id)
        let data = await response.json()
        console.log(data)
        newCart.push(data)
        setCart(newCart)
    }

    return (
        <div className = "search-list-item">
            <button onClick = {() => addCourse()}> + </button>
            <h3>{course.id}</h3>
            <p>{course.title}</p>
        </div>
    )
}

export default SearchListItem
