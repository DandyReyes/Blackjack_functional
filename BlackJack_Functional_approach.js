/** Blackjack as a functional approach
 * Goal: Outputs 4 cards, 2 to dealer and 2 to player
 */

// Get random index for the suit array
function randSuitIndex(randomSuit) {
  const indexSuit = Math.floor(Math.random() * randomSuit.length);
  return indexSuit;
}

// Get the random index for the weight array
function randWeightIndex(randomWeight) {
  const indexWeight = Math.floor(Math.random() * randomWeight.length);
  return indexWeight;
}

function getSuit() {
  const suit = ['♠️', '♣️', '♥️', '♦️'];
  const dealtSuit = suit[randSuitIndex(suit)];
  return dealtSuit;
}

function getWeight() {
  const weight = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const dealtWeight = weight[randWeightIndex(weight)];
  return dealtWeight;
}

// Add up the total from the weights
function getTotal(total) {
  const addUpWeight = total.reduce((acc, curr) => acc + curr);
  return addUpWeight;
}

// Show what cards you got!
function joinWeightAndSuit(joinedArr, suit, weight, i) {
  // add the suit to array
  suit.push(getSuit());
  // add the weight to the array
  weight.push(getWeight());
  // join arrays to get an output like ♥️9
  joinedArr[i] = suit[i] + weight[i];
}

// Figure this out
function getHand(joinedArr, suit, weight) {
  for (let i = 0; i < 2; i++) {
    joinWeightAndSuit(joinedArr, suit, weight, i);
  }
}

// Show message
function showHand(hand) {
  console.log(hand);
}

function getResults(playerTotal, dealerTotal) {
  if (playerTotal > dealerTotal) {
    console.log('Player Wins!');
  } else if (playerTotal < dealerTotal) {
    console.log('Dealer wins');
  } else {
    console.log('draw');
  }
}

function blackJack() {
  // For player card
  const playerWeight = [];
  const playerSuits = [];
  // For dealer card
  const dealerWeight = [];
  const dealerSuits = [];
  // Join arrays together
  const joinedDealer = [];
  const joinedPlayer = [];

  // Get and store the player's hand
  getHand(joinedPlayer, playerSuits, playerWeight);
  getHand(joinedDealer, dealerSuits, dealerWeight);
  // Store the player and dealer total
  const playerTotal = getTotal(playerWeight);
  const dealerTotal = getTotal(dealerWeight);
  // Show the cards
  showHand(joinedPlayer);
  showHand(joinedDealer);
  // Get the results of the game
  getResults(playerTotal, dealerTotal);
}

blackJack();
