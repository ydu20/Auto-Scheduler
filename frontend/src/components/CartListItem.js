import React from 'react'
import {useState} from 'react'


const CartListItem  = ({course, cart, setCart}) => {

    const addToSchedule = () => {
        // not yet implemented
    }
    
    const [collapsed, setCollapsed] = useState(true)

    const generateSection = (section) => {
        var secid = section.id
        secid = secid.substr(secid.length - 3)

        const times = section.meetings.map((meeting) => (
            meeting.day + meeting.start + "-" + meeting.end
        ))
        return ("Sec " + secid + ": " +  times.join(", "))
    }

    const removeFromCart = () => {
        const newCart = []
        cart.forEach((item, i) => {
            if (item !== course) {
                newCart.push(item);
            }
        })
        setCart(newCart)
    }

    return (
        <div>
            <div className = "cart-list-item">
                <button className = "collapse-button"
                    onClick={() => setCollapsed(!collapsed)}>{collapsed ? '+' : '–'}
                </button>
                <button onClick = {() => removeFromCart()}>x</button>
                <h3>{course.id}</h3>
                <p>{course.title}</p>
            </div>
            {course.sections.map((section) => (
                <div className = {`cart-list-sections ${collapsed ? 'collapsed' : 'expanded'}`}>
                    <p>
                        {generateSection(section)}
                    </p>
                    <button onClick = {() => addToSchedule()}> + </button>
                </div>
            ))}

        </div>
        
    )
}

export default CartListItem
