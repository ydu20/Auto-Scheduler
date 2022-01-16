import React from 'react'


const Blocks = ({startTime, endTime, data}) => {

    var numRows = (Math.ceil(endTime) - Math.floor(startTime) + 1) * 4
    const numCols = 6

    const gridStyle = () => {
        return {
            gridTemplateColumns: 'repeat(' + numCols + ',1fr)',
        gridTemplateRows: 'repeat(' + numRows + ',1fr)'
        }
    };

    const getColor = (x) => {
        let colors = ["blue", "red", "aqua", "orange", "green", "pink"]
        return colors[x % 8]
    }

    const getTextColor = (x) => {
        let colors = ["aqua", "orange", "blue", "red", "pink", "green"]
        return colors[x % 8]
    }

    const dayToPos = (day) => {
        if (day === 'M') {
            return 2
        } else if (day === 'T') {
            return 3
        } else if (day === 'W') {
            return 4
        } else if (day === 'R') {
            return 5
        } else {
            return 6
        }
    }

    const timeToPos = (time) => {
        let hour = parseInt(Math.floor(time))
        let frac = Math.round((time-hour) / 0.6 * 4)
        return 5 + (hour-Math.floor(startTime)) * 4 + frac
    }

    const getGridRow = (start, end) => {
        let returnStr = timeToPos(start).toString() + "/" + timeToPos(end).toString()
        return returnStr
    }

    const generateBlocks = () => {
        let blocks = []
        if (data.timetables.length > 0) {
            let timetable = data.timetables[data.position]
            for (let i = 0; i < timetable.length; i++) {
                let bgc = getColor(i)
                let tc = getTextColor(i)
                for (const [key, value] of Object.entries(timetable[i].ids)) {
                    for (let k = 0; k < value.length; k++) {
                        let day = value[k][0][0]
                        let start = parseFloat(value[k][0].substring(1))
                        let end = parseFloat(value[k][1].substring(1))
                        let block = <div className = "class-block" style = {{
                            gridColumn: dayToPos(day), gridRow: getGridRow(start, end), 
                            backgroundColor: bgc, color: tc}}>
                            {key}
                        </div>
                        blocks.push(block)
                    }
                }
            }
        }
        return blocks
    }

    return (
        <div className = "schedule-blocks"
        style = {gridStyle(numRows, numCols)}>
            {generateBlocks()}
        </div>
    )
}

export default Blocks;