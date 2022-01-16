import React, {useEffect} from 'react'


const Schedule = ({timeTables}) => {
    var position = 0

    const getBoundryTimes = (timetable) => {
        var temp = Object.values(timetable[0].ids)[0][0]
        var min = parseFloat(temp[0].substring(1))
        var max = parseFloat(temp[1].substring(1))

        for (let i = 0; i < timetable.length; i++) {
            const sections = Object.values(timetable[i].ids)
            for (let j = 0; j < sections.length; j++){
                for (let k = 0; k < sections[j].length; k++) {
                    const start = parseFloat(sections[j][k][0].substring(1))
                    if (start < min) min = start
                    const end = parseFloat(sections[j][k][1].substring(1))
                    if (end > max) max = end
                }
            }
        }
        console.log(min)
        console.log(max)

        return [min, max]
    }

    var startTime = getBoundryTimes(timeTables[0])[0]
    var endTime = getBoundryTimes(timeTables[0])[0]

    var numRows = Math.ceil(endTime) - Math.floor(startTime) + 1
    var numCols = 6

    var grid = <div/>
    var blocks = <div/>

    useEffect( () => {
        generateGrid()
        generateBlocks()
        console.log(grid)
        console.log(blocks)
    }, [startTime, endTime])



    const generateGridHeader = () => {
        return (
            [<div className = "grid-header"/>,
            <h3 className = "grid-header">Mon</h3>,
            <h3 className = "grid-header">Tue</h3>,
            <h3 className = "grid-header">Wed</h3>,
            <h3 className = "grid-header">Thu</h3>,
            <h3 className = "grid-header">Fri</h3>]
        )
    }

    const calculateTime = (time) => {
        if (time <= 12) {
            return (time + "AM")
        } else {
            return ((time-12) + "PM")
        }
    }

    const generateGridBody = () => {
        var cells = []
        for (let i = 0; i < (numRows-2); i++) {
            cells.push(<div className = "grid-sidebar">
                {calculateTime(Math.floor(startTime) + 1 + i)}
            </div>)
            for (let j = 0; j < numCols-1; j++) {
                cells.push(<div className = "grid-box" />)
            }
        }
        for (let i = 0; i < (numCols); i++) {
            cells.push(<div className = "grid-box-bottom"/>)
        }
        return cells
    }

    const gridStyle = () =>{
        return {
            gridTemplateColumns: 'repeat(' + numCols + ',1fr)',
        gridTemplateRows: 'repeat(' + numRows + ',1fr)'
        }
    };

    const generateGrid = () => {
        grid = (<div className = "schedule-grid" 
                style = {gridStyle()}>
                    {generateGridHeader()}
                    {generateGridBody()}
                </div>)
    }

    const generateBlocks = () => {

        blocks = (  <div className = "schedule-blocks"
                        style = {gridStyle(numRows, numCols)}>
                            <div className = "class-block" style = {{gridColumn: 2, gridRow: 2, backgroundColor: '#f5f6f7'}}>
                                HIIII
                            </div>
                    </div>)
    }

    return (
    <div className = "schedule-container">
            {grid}
            {blocks}
    </div>
    )
}

export default Schedule;