import React, {useEffect} from 'react'

const Grid = ({startTime, endTime}) => {

    var numRows = Math.ceil(endTime) - Math.floor(startTime) + 1
    const numCols = 6

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
        if (time < 12) {
            return (time + "AM")
        } else if (time === 12) {
            return ("12PM")
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

    return (
        <div className = "schedule-grid" 
                style = {gridStyle()}>
                    {generateGridHeader()}
                    {generateGridBody()}
        </div>
    )
}

export default Grid;