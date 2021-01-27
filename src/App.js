import React from 'react';
import './App.css';
import TicTacToe from './components/TicTacToe'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import checkRow from './components/RowChecker';

//Function to create and populate a table
function createTable(cellContent, rows = 3, columns = 3) {

  let table = [] // create a table

  // For each row create a column and push (append) that into the table
  for (let i = 0; i < rows; i++) {

    let row = [] // create a row

    //For each column in the row put the cell content into the array
    for (let c = 0; c < columns; c++) {
      row.push(cellContent())
    }

    table.push(row)
  }

  return table
}

export class App extends React.Component {

  //Create Icon Elements for use in the render
  nort = <FontAwesomeIcon icon={faCircle} className="icon" />
  cross = <FontAwesomeIcon icon={faTimes} className="icon" />

  constructor(props) {
    super(props)

    // Create a table with default rows and columns 
    // Inside the table put an object with an owner, active variable and another smaller table inside
    let table = createTable(() => { return {
      owner: null,
      table: createTable(() => { return { owner: null }}), 
      active: true
    }})

    // Set the state to hold the players, current player and the table created above
    this.state = {
      players: [
        {id: 0, name:"Player A"},
        {id: 1, name:"Player B"}
      ],
      currentPlayer: 0,
      table,
      winner: null
    }
  }

  // Whenever a nort or cross is placed call this function
  // 
  processPlace = (x, y, x2, y2) => {
    
    this.setState(function(stateLocal) {
      let table = stateLocal.table
      table[y][x].table[y2][x2].owner = stateLocal.currentPlayer
      let allSquare = false //If sending to a large square that has already been won the next player can plan in any square
      
      // Checks if as a result of the last placement the current mini table has been won
      table[y][x].owner = checkRow(table[y][x].table)

      let winner = checkRow(table)
      if (winner != null) {
        return {
          table,
          winner,
          currentPlayer: stateLocal.currentPlayer === 0 ? 1 : 0 // Switch the current player to the other player
        } // return
      } // If winner not null

      // Checks if the cell the player is sending the next player too is already won?
      if (table[y2][x2].owner !== null) allSquare = true // If so the player then can place in whichever mini table they like
      
      // For each mini table in the 3x3
      for (let i = 0; i < table.length; i++) {
        for (let b = 0; b < table.length; b++) {

          if (allSquare === false) {
            // If all squares is false

            // Check if this is the correct table, if so enable the table, else disable the cell incase it was used in the last turn
            if (i === y2 && b === x2) {
              table[i][b].active = true
            } else {
              table[i][b].active = false
            }

          } else {
            // If all squares is true

            //Checks if the table is already won, if so no not enable, else enable as we want all the open tables to be clickable
            if (table[i][b].owner !== null) {
              table[i][b].active = false
            } else {
              table[i][b].active = true
            }

          } // if allSquare === false
         
        } // for b as column Index
        
      } // for i as row Index


      // Return the changes to state as a result of a placement
      return {
        table,
        currentPlayer: stateLocal.currentPlayer === 0 ? 1 : 0 // Switch the current player to the other player
      } // return

    }) // setState

  } // processPlace

  render() {

    // Create the table rows from the state
    let TableRows = this.state.table.map((row, indexRow) => (
      <tr key={indexRow}> {/* Table Row */}
        {row.map((cell, indexCol) => ( /* Map Row for each cell */
          <td className={`top ${cell.active  === true ? "activeTable" : null}`} key={indexCol}> {/* Table Cell */}
            {/* Inside each cell put another mini table (Defined in another file) */}
            <TicTacToe y={indexRow} x={indexCol} place={this.processPlace} owner={cell.owner} table={cell.table} active={cell.active} />
          </td>
        ))}
      </tr>
    )) // map table

    //Return the actual HTML for the app
    return (
      <div>

        {this.state.winner !== null ? (
          <h2>
            <span className="currentPlayerText">{this.state.players[this.state.currentPlayer].name} Has Won !!!</span>
          </h2>
        ) : null}
        {/* Put a large nort or cross over the entire table if the table is won */}
        {this.state.winner !== null ? (
          this.state.winner === 0 ? 
            <div className="iconContainer">
              <FontAwesomeIcon icon={faCircle} className="iconFullLarge" />
            </div> :
            <div className="iconContainer">
              <FontAwesomeIcon icon={faTimes} className="iconFullLarge" />
            </div>
        ) : (

        <h2> {/* Show whose Turn it currently is at the top of the play area */}
          {this.state.currentPlayer === 0 ? this.nort : (this.state.currentPlayer === 1 ? this.cross : null)} 
          <span className="currentPlayerText">It is {this.state.players[this.state.currentPlayer].name}{"'s"} turn</span>
          {this.state.currentPlayer === 0 ? this.nort : (this.state.currentPlayer === 1 ? this.cross : null)}
        </h2> 
        )}

        {/* Create the table that the game is played in */}
        <table>
          <tbody>
            {TableRows /* Put the table rows created above into the main HTML */}
          </tbody>
        </table>
      </div>
    ) // return

  } // render()

} // class App

export default App
