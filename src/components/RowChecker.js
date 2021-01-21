
// Function to check if a table is won 
export function checkRow(tableArray) {

    //Array of possible combinations that will win a table
    let options = [
        [ [0, 0], [0, 1], [0, 2] ],
        [ [1, 0], [1, 1], [1, 2] ],
        [ [2, 0], [2, 1], [2, 2] ],
        [ [0, 0], [1, 0], [2, 0] ],
        [ [0, 1], [1, 1], [2, 1] ],
        [ [0, 2], [1, 2], [2, 2] ],
        [ [0, 0], [1, 1], [2, 2] ],
        [ [0, 2], [1, 1], [2, 0] ],
    ]

    let winner = null

    // for each option in possible options check if match
    options.forEach((option, index) => {

        let person = null
        let fail = false

        // for each point in the option check if owned by the same owner as other points in this option
        option.forEach(place => {

            // check if the points owners are all the same
            if (tableArray[place[0]][place[1]].owner === 0 && (person === 0 || person === null)) {
                person = 0
            } else if (tableArray[place[0]][place[1]].owner === 1 && (person === 1 || person === null)) {
                person = 1
            } else {

                // If does not pass either of other tests the option is either made up of different owners 
                // or one of the points does not have an owner
                person = null
                fail = true
            }

            // If failed reset the person to null
            person = (fail ? null : person)
        })

        //If there is not already a winner set the winner to person
        if (winner == null) winner = person
    })

    return winner
}

export default checkRow