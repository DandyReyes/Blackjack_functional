/** Blackjack as a functional approach
 * Goal: Outputs 4 cards, 2 to dealer and 2 to player
 */

const readlinesync = require('readline-sync');
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
function joinWeightAndSuit(unjoinedArr, emptySuitArr, emptyWeightArr, index) {
  // add the suit to array
  emptySuitArr.push(getSuit());
  // add the weight to the array
  emptyWeightArr.push(getWeight());
  // join arrays to get an output like ♥️9
  unjoinedArr[index] = emptySuitArr[index] + emptyWeightArr[index];
}

function joinCard(joinedArr, suitArr, weightArr) {
  // add the suit to array
  suitArr.push(getSuit());
  // add the weight to the array
  weightArr.push(getWeight());
  // join arrays to get an output like ♥️9
  joinedArr.push(suitArr[suitArr.length - 1] + weightArr[weightArr.length - 1]);
}

// Figure this out
function getHand(unjoinedArr, emptySuitArr, emptyWeightArr) {
  for (let i = 0; i < 2; i++) {
    joinWeightAndSuit(unjoinedArr, emptySuitArr, emptyWeightArr, i);
  }
}

function getCard(joinedArr, SuitArr, WeightArr) {
  joinCard(joinedArr, SuitArr, WeightArr);
}

// Show message
function showHand(hand) {
  console.log(hand);
}

function getResults(playerTotal, dealerTotal) {
  if (playerTotal > dealerTotal && playerTotal <= 21) {
    console.log(`Player Wins! ${playerTotal} to ${dealerTotal}`);
  } else if (playerTotal < dealerTotal) {
    console.log(`Dealer wins ${dealerTotal} to ${playerTotal}`);
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

  console.log(
    '~~~~~~~~~~~~~~~~~~~~~~\n Welcome to BlackJack!\n~~~~~~~~~~~~~~~~~~~~~~\n'
  );
  // Get and store the player's hand
  getHand(joinedPlayer, playerSuits, playerWeight);
  getHand(joinedDealer, dealerSuits, dealerWeight);
  // Store the player and dealer total
  let playerTotal = getTotal(playerWeight);
  const dealerTotal = getTotal(dealerWeight);
  // Show the cards
  console.log(`Player: ${playerTotal}`);
  showHand(joinedPlayer);
  console.log(`Dealer: ${dealerTotal}`);
  showHand(joinedDealer);

  // To allow the player hit if they want
  let bool = playerTotal !== 21;
  while (bool) {
    if (playerTotal < 21) {
      // Get user input
      const hitMe = readlinesync.keyInYN('Would you like another card?');
      bool = hitMe;
      // If player decides to continue, get new result
      if (bool) {
        getCard(joinedPlayer, playerSuits, playerWeight);
        showHand(joinedPlayer);
        playerTotal = getTotal(playerWeight);
        console.log(`You have ${playerTotal}`);
        // Getting new results!
        if (playerTotal > 21) {
          console.log(`BUST! You lose  ${playerTotal}`);
          break;
        } else if (playerTotal === 21) {
          bool = false;
        }
      }
    }
  }

  // If while loop runs successfully and doesn't break
  // then get the results
  if (!bool) {
    getResults(playerTotal, dealerTotal);
  }
}

blackJack();
