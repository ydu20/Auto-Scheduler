import React from 'react'


const Buttons = ({cart, setTimetables}) => {

    

    let generateSchedule = async () => {
        const cart_abbrev = cart.map((course) => {
            return {
                id: course.id,
                // course_quality: course.course_quality,
                // difficulty: course.difficulty,
                sections: course.sections
            }
        })

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cart_abbrev)
        }

        const response = await fetch('http://127.0.0.1:8000/api/scheduler', requestOptions)
        const data = await response.json()
        console.log(data)
        setTimetables(data)
    }

    let clearSchedule = () => {
        setTimetables([])
    }
    return (
        <div className = "buttons">
            <button onClick = {() => generateSchedule()}>Generate</button>
            <button onClick = {() => clearSchedule()}>Clear</button>
        </div>
    )
}

export default Buttons;