import React from 'react'
import {useState} from 'react'


const CartListItem  = ({course}) => {

    const addToSchedule = () => {}
    
    const [collapsed, setCollapsed] = useState(collapsed)

    const generateSection = (section) => {
        var secid = section.id
        secid = secid.substr(secid.length - 3)

        const times = section.meetings.map((meeting) => (
            meeting.day + meeting.start + "-" + meeting.end
        ))
        return ("Sec " + secid + ": " +  times.join(", "))
    }

    return (
        <div>
            <div className = "cart-list-item">
                <button className = "collapse-button"
                    onClick={() => setCollapsed(!collapsed)}>{collapsed ? '+' : '-'}</button>
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
