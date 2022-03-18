/********************************************************************************************************************************
 *      VERSION 2.7.1
 *      Added: -Fixed issue where AI would allow instant wins 
 *      Useful Examples in this file: Using Timeout to sleep functions for set times. 
 *                                    Using .bind() to prevent eventListeners from autoRunning
 *                                    Using .addAttribute() / .removeAttribute() methods. 
 *      
 ********************************************************************************************************************************/
let val = (id) => document.getElementById(id);
let taken = (id) => val(id).innerHTML === "X";
let open = (id) => val(id).innerHTML === "_";
let aiToken = (id) => val(id).innerHTML = "O";
let aiPlace = (id) => val(id).innerHTML === "O";
let scores = (win, lose, tie) => val("ScoreBoard").innerHTML = `W: ${win} | L: ${lose} | Tie: ${tie}` 

/****************************************************
 * 
 *  userClick(): Denotes the players turn sequence
 *  if the player selects an invalid move, the box highlights red for 1.5 seconds
 * 
 *****************************************************/

const userClick = (e) => {
    if(activeGame){    
        if(!playerLock){
            if(val(e).innerHTML == "_"){
                val(e).innerHTML = "X";
                if(!humanVictory()){
                    setTimeout(() => {enemyTurn(e);}, 1250)
                    playerLock = true;
                }
                else{
                    declareSupremacy("Human")
                }
            }
            else{
                val(e).setAttribute("style", "color: red;");
                setTimeout(() => {val(e).removeAttribute("style")}, 1500);
            }
        }
    }
}
/****************************************************
 * 
 *  enemyTurn(): first checks if the Enemy can win in this turn
 *  if it cannot, it performs a counter action based on opponents other pieces
 *  if there is no counter action to perform, it selects a random tile on the board
 * 
 *****************************************************/

const enemyTurn = (id) => {
    if(!checkIfCanWin()){  
        if(firstTurnOnly){
            firstTurn(id);
            firstTurnOnly = false;
        }
        else{
            switch(id) {
                case(1):
                    if(taken(3) && open(2))
                        aiToken(2);
                    else if(taken(7) && open(4))
                        aiToken(4);
                    else if(taken(9) && open(5))
                        aiToken(5);
                    else if(taken(2) && open(3))
                        aiToken(3);
                    else if(taken(5) && open(9))
                        aiToken(9);
                    else
                        randTurn();
                    break;
                    
                case(2):
                    if(taken(8) && open(5))
                        aiToken(5);
                    else if(taken(5) && open(8))
                        aiToken(8);
                    else if(taken(1) && open(3))
                        aiToken(3);
                    else if(taken(3) && open(1))
                        aiToken(1);
                    else
                        randTurn();
                    break;

                case(3):
                    if(taken(7) && open(5))
                        aiToken(5);
                    else if(taken(5) && open(7))
                        aiToken(7);
                    else if(taken(1) && open(2))
                        aiToken(2);
                    else if(taken(2) && open(1))
                        aiToken(1);
                    else if(taken(9) && open(6))
                        aiToken(6);
                    else if(taken(6) && open(9))
                        aiToken(9)
                    else
                        randTurn();
                    break;

                case(4):
                    if(taken(1) && open(7))
                        aiToken(7);
                    else if(taken(7) && open(1))
                        aiToken(1);
                    else if(taken(5) && open(6))
                        aiToken(6);
                    else if(taken(6) && open(5))
                        aiToken(5);
                    else
                        randTurn();
                    break;
                case(5):
                    if(taken(2) && open(8))
                        aiToken(8);
                    else if(taken(8) && open(2))
                        aiToken(2);
                    else if(taken(4) && open(6))
                        aiToken(6);
                    else if(taken(6) && open(4))
                        aiToken(4);
                    else if(taken(1) && open(9))
                        aiToken(9);
                    else if(taken(9) && open(1))
                        aiToken(1);
                    else if(taken(7) && open(3))
                        aiToken(3);
                    else if(taken(3) && open(7))
                        aiToken(7);
                    else
                        randTurn();
                    break;
                    
                case(6):
                    if(taken(4) && open(5))
                        aiToken(5);
                    else if(taken(5) && open(4))
                        aiToken(4);
                    else if(taken(3) && open(9))
                        aiToken(9);
                    else if(taken(9) && open(3))
                        aiToken(3);
                    else
                        randTurn();
                    break;

                case(7):
                    if(taken(3) && open(5))
                        aiToken(5);
                    else if(taken(5) && open(3))
                        aiToken(3);
                    else if(taken(1) && open(4))
                        aiToken(4);
                    else if(taken(4) && open(1))
                        aiToken(1);
                    else if(taken(8) && open(9))
                        aiToken(9);
                    else if(taken(9) && open(8))
                        aiToken(8);
                    else
                        randTurn();
                    break;

                case(8):
                    if(taken(2) && open(5))
                        aiToken(5);
                    else if(taken(5) && open(2))
                        aiToken(2);
                    else if(taken(7) && open(9))
                        aiToken(9);
                    else if(taken(9) && open(7))
                        aiToken(7);
                    else
                        randTurn();
                    break;

                case(9):
                    if(taken(1) && open(5))
                        aiToken(5);
                    else if(taken(5) && open(1))
                        aiToken(1);
                    else if(taken(7) && open(8))
                        aiToken(8);
                    else if(taken(8) && open(7))
                        aiToken(7);
                    else if(taken(3) && open(6))
                        aiToken(6);
                    else if(taken(6) && open(3))
                        aiToken(3);
                    else
                        randTurn();
                    break;
                default:
                    randTurn();
                    break;
            }  
        } 
    }
    else{
        declareSupremacy("Opponent");
    }
    playerLock = false;
}

const firstTurn = (id) => {
    const firstPicks = [1, 3, 7, 9];
    switch (id) {
        case(5):
            aiToken(firstPicks[Math.floor(Math.random() * firstPicks.length)]);
            break;
        default:
            aiToken(5);
    }
}
/****************************************************
 * 
 *  checkIfCanWin(), Method is called at the start of opponent turn
 *  if the opponent can claim Victory, it will immediately choose the position
 *  if Victory is achieved, true is returned and declareRobotSupremacy() is called
 *  labelling the opponent a winner.
 * 
 *****************************************************/

const checkIfCanWin = () => {
    if(((aiPlace(2) && aiPlace(3)) || ((aiPlace(4)) && aiPlace(7)) || (aiPlace(5) && aiPlace(9))) && open(1)) {
        aiToken(1);
        return true;
    }
    if(((aiPlace(1) && aiPlace(3)) || ((aiPlace(5)) && aiPlace(8))) && open(2)) {
        aiToken(2);
        return true;
    }
    if(((aiPlace(2) && aiPlace(1)) || ((aiPlace(6)) && aiPlace(9)) || (aiPlace(7) && aiPlace(5))) && open(3)) {
        aiToken(3);
        return true;
    }
    if(((aiPlace(1) && aiPlace(7)) || ((aiPlace(5)) && aiPlace(6))) && open(4)) {
        aiToken(4);
        return true;
    }
    if(((aiPlace(1) && aiPlace(9)) || ((aiPlace(3)) && aiPlace(7)) || ((aiPlace(2)) && aiPlace(8)) || ((aiPlace(4)) && aiPlace(6))) && open(5)) {
        aiToken(5);
        return true;
    }
    if(((aiPlace(4) && aiPlace(5)) || ((aiPlace(3)) && aiPlace(9))) && open(6)) {
        aiToken(6);
        return true;
    }
    if(((aiPlace(1) && aiPlace(4)) || ((aiPlace(3)) && aiPlace(5)) || ((aiPlace(8)) && aiPlace(9))) && open(7)) {
        aiToken(7);
        return true;
    }
    if(((aiPlace(1) && aiPlace(9)) || ((aiPlace(2)) && aiPlace(5))) && open(8)) {
        aiToken(8);
        return true;
    }
    if(((aiPlace(1) && aiPlace(5)) || ((aiPlace(7)) && aiPlace(8)) || ((aiPlace(3)) && aiPlace(6))) && open(9)) {
        aiToken(9);
        return true;
    }
    return false;
}

const declareSupremacy = (victor) => {
    if(victor == "Human"){
        win++;
    }
    else if(victor == "Opponent"){
        lose++;
    }
    else{
        tie++;
    }
    val("notices").innerHTML = `${victor} wins!`;
    scores(win,lose,tie);
    activeGame = false;
} 

/****************************************************
 * 
 *  Opponents Random Turn functions, picks a position at random
 *  using checkCell(), it confirms the position is valid, else it rolls
 *  for a new position
 * 
 *****************************************************/

const randTurn = () => {
    const checkCell = () => {
        for(let i = 1; i <= 9; i++){
            if((val(i).innerHTML) == "_"){
                return true
            }
        }
        return false;
    }
    let validTurn = false;
    let validTurnsLeft = true;
    do{
        let enemyPick = Math.ceil(Math.random() * 9)
        if(open(enemyPick)){
            aiToken(enemyPick);
            validTurn = true;
        }
        else{
            validTurnsLeft = checkCell();
        }
    }while(!validTurn && validTurnsLeft);
    if(!validTurnsLeft){
        declareSupremacy("Nobody");
    }
}

const refresh = () => {
    validTurnsLeft = true;
    activeGame = true;
    firstTurnOnly = true;
    for(let i = 1; i < 10; i++){
        val(i).innerHTML = "_";
    }
    val("notices").innerHTML = "";

}
/****************************************************
 * 
 *  humanVictory() - Checks if Human Won
 * 
 *****************************************************/

const humanVictory = () => {
    if(taken(1) && taken(2) && taken(3)){
        return true;
    }
    else if(taken(4) && taken(5) && taken(6)){
        return true;
    }
    else if(taken(7) && taken(8) && taken(9)){
        return true;
    }
    else if(taken(1) && taken(4) && taken(7)){
        return true;
    }
    else if(taken(2) && taken(5) && taken(8)){
        return true;
    }
    else if(taken(1) && taken(5) && taken(9)){
        return true;
    }
    else if(taken(3) && taken(5) && taken(7)){
        return true;
    }
    else if(taken(3) && taken(6) && taken(9)){
        return true;
    }
    else{
        return false;
    }
}

/****************************************************
 * 
 *  Event Listeners for the Buttons on the screen
 *  playerLock - Prevents player from taking multiple turns
 *  before the Opponent can choose theirs, toggles on and off between turns
 * 
 *****************************************************/
let activeGame = true;
let playerLock = false;
let firstTurnOnly = true;
let lose = 0, win = 0, tie = 0;
//Top
val("1").addEventListener("mouseup", userClick.bind(this, 1))
val("2").addEventListener("mouseup", userClick.bind(this, 2))
val("3").addEventListener("mouseup", userClick.bind(this, 3))
//Mid
val("4").addEventListener("mouseup", userClick.bind(this, 4))
val("5").addEventListener("mouseup", userClick.bind(this, 5))
val("6").addEventListener("mouseup", userClick.bind(this, 6))
//Bot
val("7").addEventListener("mouseup", userClick.bind(this, 7))
val("8").addEventListener("mouseup", userClick.bind(this, 8))
val("9").addEventListener("mouseup", userClick.bind(this, 9))
//Refresh Page
val("Refresh").addEventListener("click", refresh);