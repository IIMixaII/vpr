const gameBoard = document.querySelector("#gameboard")
const playerDispaly = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")
const width = 8
let playerGo = 'white'
playerDispaly.textContent = 'white'
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    toggleMenu();
  }
});

/* function toggleMenu() {
  var menu = document.getElementById('menu');
  menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'flex' : 'none';
}
 */
const startPieces = [
  rook, knight, bishop, queen, king, bishop, knight, rook,
  pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
  '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '',
  pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
  rook, knight, bishop, queen, king, bishop, knight, rook
]
function createBoard() {
  startPieces.forEach((startPiece, i) => {
    const square = document.createElement('div')
    square.classList.add('square')
    square.innerHTML = startPiece 
    square.firstChild?.setAttribute('draggable', true)
    square.setAttribute('square-id', i)
    //square.classList.add('beige')
    const row =Math.floor((63-i)/8)+1 // Определение в каком ряде находимся
    if (row%2 ==0){
      square.classList.add(i %2 ==0 ? "beige" : "brown")
    }
    else{
      square.classList.add(i %2 ==0 ? "brown" : "beige")
    }
    if(i<= 15){
      square.firstChild.firstChild.classList.add('white')
    }
    if(i >= 48){
      square.firstChild.firstChild.classList.add('black')
    }
    gameBoard.append(square)
})
}
//const resetButton = document.getElementById('resetButton');
//resetButton.addEventListener('click', resetGame);

function resetGame() {
  // Clear the game board
  gameBoard.innerHTML = '';

  // Call the createBoard function to set up a new game
  createBoard();

  // Reattach event listeners to the new squares
  const allSquare = document.querySelectorAll("#gameboard .square");
  allSquare.forEach(square => {
    square.addEventListener('dragstart', dragStart);
    square.addEventListener('dragover', dragOver);
    square.addEventListener('drop', dragDrop);
  });

  // Reset any other game state variables if needed
  // For example, you might want to reset playerGo, infoDisplay, etc.
  // playerGo = 'white';
  // infoDisplay.textContent = '';
}

/* function resetGame() {
    // Clear the game board
    gameBoard.innerHTML = '';
  
    // Call the createBoard function to set up a new game
    
  
createBoard()

const allSquare = document.querySelectorAll("#gameboard .square")

allSquare.forEach(square => {
  square.addEventListener('dragstart', dragStart)
  square.addEventListener('dragover', dragOver)
  square.addEventListener('drop', dragDrop)
})} */

let startPositionId
let draggedElement
function dragStart(e) {

startPositionId = e.target.parentNode.getAttribute('square-id')
draggedElement = e.target
}

 function dragOver(e) {
e.preventDefault()
} 

function dragDrop(e) { // перетаскивание
  e.stopPropagation() 
  const correctGo = draggedElement.firstChild.classList.contains(playerGo)
  const taken = e.target.classList.contains('piece') 
  const valid = chechIfValid(e.target)
  const opponentGo = playerGo === 'white' ? 'black' : 'white'
  const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo)
   if(correctGo) {
   if(takenByOpponent && valid){
      e.target.parentNode.append(draggedElement)
      e.target.remove()
      cheackForWin()
      changePlayer()  
      return
    } 
    if(taken && !takenByOpponent){
      infoDisplay.textContent = "Сюда походить нелььзя"
      setTimeout(()=> infoDisplay.textContent = "", 2000)
      return
    }
      if(valid){
      e.target.append(draggedElement)
      cheackForWin()
      changePlayer()
      return
    } 
  } 
  //e.target.parentNode.append(draggedElement)
  //e.target.remove()
  //e.target.append(draggedElement)
} 

function chechIfValid(target) {
const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
const startId = Number(startPositionId)
const piece = draggedElement.id
console.log('targetId', targetId)
console.log('startId', startId)
console.log('piece', piece)

switch(piece) { // Номер квадрата на который перешёл
  case 'pawn':
    const starterRow = [8,9,10,11,12,13,14,15]
    if(starterRow.includes(startId) && startId + width *2 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild || startId + width === targetId  && !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
    startId + width - 1 === targetId && document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild ||
    startId + width + 1 === targetId && document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild)
    {
      return true
    }
    break;
    case 'knight':
      if(startId + width * 2 - 1 === targetId || startId + width * 2 - 1 === targetId || startId + width - 2 === targetId || startId + width + 2 === targetId ||
        startId - width * 2 - 1 === targetId || startId - width * 2 - 1 === targetId || startId - width - 2 === targetId || startId - width + 2 === targetId )
        {
          return true
        }
        break;
          case 'bishop':
          if(startId + width + 1 === targetId  ||
          startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild ||
          startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild &&  !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild || 
          startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild ||
          startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild ||
          startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild ||
          startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6 + 6}"]`).firstChild  ||
          
           startId - width - 1 === targetId || 
          startId - width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild ||
          startId - width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild &&  !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild || 
          startId - width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild ||
          startId - width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild ||
          startId - width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild ||
          startId - width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6 - 6}"]`).firstChild || 
          
          startId - width + 1 === targetId || 
          startId - width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild ||
          startId - width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild &&  !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild || 
          startId - width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild ||
          startId - width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild ||
          startId - width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstChild ||
          startId - width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6 + 6}"]`).firstChild  ||
          
          startId + width - 1 === targetId || 
          startId + width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild ||
          startId + width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild || 
          startId + width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild ||
          startId + width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild ||
          startId + width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstChild ||
          startId + width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6 - 6}"]`).firstChild )   
 
{
  return true
}
break;
case 'rook':
  if(startId + width === targetId || 
    startId + width * 2 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
    startId + width * 3 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild ||
    startId + width * 4 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild ||
    startId + width * 5 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild ||
    startId + width * 6 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild || 
    startId + width * 7 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6}"]`).firstChild ||
    
    startId - width === targetId || 
    startId - width * 2 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||
    startId - width * 3 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild ||
    startId - width * 4 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild ||
    startId - width * 5 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild ||
    startId - width * 6 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild || 
    startId - width * 7 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6}"]`).firstChild ||
    
    startId + 1 === targetId || 
    startId + 2 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild ||
    startId + 3 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild ||
    startId + 4 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild ||
    startId + 5 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild ||
    startId + 6 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild || 
    startId + 7 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + 6}"]`).firstChild ||
    
    startId - 1 === targetId || 
    startId - 2 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild ||
    startId - 3 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild ||
    startId - 4 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild ||
    startId - 5 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild ||
    startId - 6 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild || 
    startId - 7 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - 6}"]`).firstChild 
    )
        
{
return true
}
break;
case 'queen':
  if(startId + width + 1 === targetId  ||
    startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild ||
    startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild &&  !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild || 
    startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild ||
    startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild ||
    startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild ||
    startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6 + 6}"]`).firstChild  ||
    
     startId - width - 1 === targetId || 
    startId - width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild ||
    startId - width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild &&  !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild || 
    startId - width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild ||
    startId - width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild ||
    startId - width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild ||
    startId - width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6 - 6}"]`).firstChild || 
    
    startId - width + 1 === targetId || 
    startId - width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild ||
    startId - width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild &&  !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild || 
    startId - width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild ||
    startId - width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild ||
    startId - width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstChild ||
    startId - width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6 + 6}"]`).firstChild  ||
    
    startId + width - 1 === targetId || 
    startId + width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild ||
    startId + width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild || 
    startId + width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild ||
    startId + width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild ||
    startId + width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstChild ||
    startId + width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6 - 6}"]`).firstChild  ||
    
    startId + width === targetId || 
    startId + width * 2 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
    startId + width * 3 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild ||
    startId + width * 4 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild ||
    startId + width * 5 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild ||
    startId + width * 6 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild || 
    startId + width * 7 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6}"]`).firstChild ||
    
    startId - width === targetId || 
    startId - width * 2 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||
    startId - width * 3 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild ||
    startId - width * 4 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild ||
    startId - width * 5 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild ||
    startId - width * 6 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild || 
    startId - width * 7 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6}"]`).firstChild ||
    
    startId + 1 === targetId || 
    startId + 2 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild ||
    startId + 3 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild ||
    startId + 4 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild ||
    startId + 5 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild ||
    startId + 6 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild || 
    startId + 7 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + 6}"]`).firstChild ||
    
    startId - 1 === targetId || 
    startId - 2 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild ||
    startId - 3 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild ||
    startId - 4 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild ||
    startId - 5 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild ||
    startId - 6 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild || 
    startId - 7 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - 6}"]`).firstChild 
    )   
  {
    return true
  }
  break;
  case 'king':
    if(startId + 1 === targetId ||
      startId -1 === targetId ||
      startId + width === targetId ||
      startId - width === targetId ||
      startId + width - 1 === targetId ||
      startId + width + 1 === targetId ||
      startId - width - 1 === targetId ||
      startId - width + 1 === targetId)
      {
        return true
      }
      
}

}

function changePlayer() {  // переход хода
  if (playerGo == "white" ) {
    reverseIds()
    playerGo = "black"
    playerDispaly.textContent = 'black'
  }
  else {
    revertIds()
    playerGo = "white"
    playerDispaly.textContent = 'white'
  }
}


function reverseIds() { // реверс доски
  const allSquares = document.querySelectorAll(".square")
  allSquares.forEach((square, i) => square.setAttribute('square-id', (width * width-1)-i))
}


function revertIds() {
  const allSquares = document.querySelectorAll(".square")
  allSquares.forEach((square, i) => square.setAttribute('square-id', i))
}


function cheackForWin(){
  const kings = Array.from(document.querySelectorAll('#king'))
  console.log(kings)
  if(!kings.some(king => king.firstChild.classList.contains('white'))){
    infoDisplay.innerHTML = "Black players wins"
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach(square => square.firstChild?.setAttribute('draggable', false))
    var nick = prompt("Введите имя:  ")
  }
  if(!kings.some(king => king.firstChild.classList.contains('black'))){
    infoDisplay.innerHTML = "White players wins"
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach(square => square.firstChild?.setAttribute('draggable', false))
    const nick = prompt("Введите имя:  ")
    const time = 12 
    //addRecord(nick,time)
    addRecord("Игрок3", 150);

    // Выводим таблицу при загрузке страницы
    updateLeaderboard();
  }

  
}

 function toggleMenu() {
  var menu = document.getElementById('menu');
  menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'flex' : 'none';
}
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame);

/* function resetGame() {
  // Clear the game board
  gameBoard.innerHTML = '';

  // Call the createBoard function to set up a new game
  createBoard();

  // Reattach event listeners to the new squares
  const allSquare = document.querySelectorAll("#gameboard .square");
  allSquare.forEach(square => {
    square.addEventListener('dragstart', dragStart);
    square.addEventListener('dragover', dragOver);
    square.addEventListener('drop', dragDrop);
  });
} */

















































/*   // Получаем данные из локального хранилища
  const leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];

  // Функция для обновления таблицы
  function updateLeaderboard() {
      const leaderboardTable = document.getElementById("leaderboard").querySelector("tbody");

      // Очищаем текущие данные
      leaderboardTable.innerHTML = "";

      // Заполняем таблицу новыми данными
      leaderboardData.forEach((record, index) => {
          const row = leaderboardTable.insertRow();
          const cellIndex = row.insertCell(0);
          const cellPlayer = row.insertCell(1);
          const cellTime = row.insertCell(2);

          cellIndex.textContent = index + 1;
          cellPlayer.textContent = record.player;
          cellTime.textContent = record.time;
      });
  }*/

  // Функция для добавления нового результата
/*   function addRecord(player, time) {
      leaderboardData.push({ player, time });

      // Сортируем результаты по времени
      leaderboardData.sort((a, b) => a.time - b.time);

      // Ограничиваем таблицу только 10 лучшими результатами
      if (leaderboardData.length > 10) {
          leaderboardData.pop();
      }

      // Обновляем локальное хранилище
      localStorage.setItem("leaderboard", JSON.stringify(leaderboardData));

      // Обновляем таблицу
      updateLeaderboard();
  }
  */