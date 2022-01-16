import React, {useEffect} from 'react'
import Grid from './Grid'
import Blocks from './Blocks'


const Schedule = ({timetables}) => {
    var position = 0

    const getBoundryTimes = (timetable) => {
        var min = 9
        var max = 16

        for (let i = 0; i < timetable.length; i++) {
            let sections = Object.values(timetable[i].ids)
            for (let j = 0; j < sections.length; j++){
                for (let k = 0; k < sections[j].length; k++) {
                    let start = parseFloat(sections[j][k][0].substring(1))
                    if (start < min) min = start
                    let end = parseFloat(sections[j][k][1].substring(1))
                    if (end > max) max = end
                }
            }
        }
        console.log(min)
        console.log(max)

        return [min, max]
    }

    var startTime
    var endTime
    
    if (timetables.length > 0) {
        [startTime, endTime] = getBoundryTimes(timetables[0])
    } else {
        startTime = 10
        endTime = 17
    }
    
    return (
    <div className = "schedule-container">
            <Grid startTime={startTime} endTime = {endTime}/>
            <Blocks startTime={startTime} endTime = {endTime} data = {{timetables, position}}/>
    </div>
    )
}

export default Schedule;