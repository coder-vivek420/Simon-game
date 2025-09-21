
const pads = document.querySelectorAll('.pad');
let sequence = [];
let playerIndex = 0;
let level = 0;
let highScore = 0;
let playingSequence = false;

// Sleep function
function sleep(ms){ return new Promise(resolve => setTimeout(resolve, ms)); }

// Flash pad animation
async function flashPad(i){
  pads[i].classList.add('active');
  await sleep(300);
  pads[i].classList.remove('active');
}

// Play the current sequence
async function playSequence(){
  playingSequence = true;
  for(const idx of sequence){
    await flashPad(idx);
    await sleep(200);
  }
  playingSequence = false;
  playerIndex = 0;
}

// Update the message display
function updateMessage(msg=''){
  document.getElementById('message').textContent = 
    `Level: ${level} | High Score: ${highScore} ${msg}`;
}

// Advance to next level
async function nextLevel(){
  level++;
  if(level > highScore) highScore = level;
  updateMessage();
  sequence.push(Math.floor(Math.random()*4));
  await playSequence();
}

// Handle user clicks
async function handleClick(i){
  if(playingSequence) return;
  await flashPad(i);

  if(sequence[playerIndex] === i){
    playerIndex++;
    if(playerIndex === sequence.length){
      await sleep(500);
      nextLevel();
    }
  } else {
    updateMessage(' - Wrong! Restarting...');
    sequence = [];
    level = 0;
    await sleep(1000);
    nextLevel();
  }
}

// Add click listeners
pads.forEach((pad, idx) => {
  pad.addEventListener('click', ()=> handleClick(idx));
});

// Start the game
nextLevel();
