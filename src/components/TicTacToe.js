import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'

export class tictactoe extends Component {
  nort = <FontAwesomeIcon icon={faCircle} className="icon" />
  cross = <FontAwesomeIcon icon={faTimes} className="icon" />

  // Function to check if the cell should have the clickable tag or not
  cellClickable = (cell) => {
    return this.props.active === true && cell.owner == null
  }

  //Function that is called when a user clicks on a cell
  processClick = (x, y, cell) => {
    
    // Checks to ensure that the cell in clickable
    if (this.cellClickable(cell)) { 

      // Call the handler that is passed down through props to notify the App that a element has been placed
      this.props.place(this.props.x, this.props.y, x, y)
      
    } // if cellClickable()

  } // processClick()

  // code to be rendered
  render() {

    //create table rows and cells with either nothing, a nort or a cross depending on the cell owner
    let TableRows = this.props.table.map((row, i) => ( // Map each row in table to a html row element
      <tr key={i}>
        {row.map((cell, b) => ( // Map each cell in row to correct element
          <td className={`innerCell `} key={b}>
            <div onClick={() => {this.processClick(b, i, cell)}}  className={this.cellClickable(cell) ? "active" : ""}>
              {cell.owner === 0 ? this.nort : (cell.owner === 1 ? this.cross : null)}
            </div>
          </td>
        ))}
      </tr>
    ))


    return (
      <div> 
        {/* Put a large nort or cross over the entire table if the table is won */}
        {this.props.owner !== null ? (
          this.props.owner === 0 ? 
            <div className="iconContainer">
              <FontAwesomeIcon icon={faCircle} className="iconLarge" />
            </div> :
            <div className="iconContainer">
              <FontAwesomeIcon icon={faTimes} className="iconLarge" />
            </div>
        ) : null}

        {/* Create the mini table that the user can or can't place in */}
        <table className="innerTable">
          <tbody>
            {TableRows}
          </tbody>
        </table>

      </div>
    ) // return

  } // render()

} // class tictactoe

export default tictactoe
