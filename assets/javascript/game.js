$(document).ready(function() {

    var playerNames = ["jeff bagwell", "mike trout", "bryce harper", "nolan ryan", "jose altuve", "javier baez", "barry bonds", 
                            "cody bellinger", "christian yelich", "derek jeter", "craig biggio", "roger clemens", "cal ripken jr", "david ortiz",
                            "justin verlander", "gerrit cole", "clayton kershaw", "aaron judge", "mike piazza", "sammy sosa",
                            "xander bogaerts", "blake snell", "kris bryant", "manny machado", "alex bregman"]

    const maxGuess = 8
    var pauseGame = false

    var guessedLetters = []
    var guessingWord = []
    var wordToMatch
    var numGuess
    var wins = 0

    resetGame()

    // Begin when first key is pressed
    document.onkeypress = function(event) {
        // Only responds to letter keys that are pressed
        if (isAlpha(event.key) && !pauseGame) {
            checkForLetter(event.key.toUpperCase())
        }
    }

    // Game Functions
    // Check if letter is in word & process
    function checkForLetter(letter) {
        var foundLetter = false

        


        // Search the player name string to see if letter is present
        for (var i=0, j= wordToMatch.length; i<j; i++) {
            if (letter === wordToMatch[i]) {
                guessingWord[i] = letter
                foundLetter = true
                
                // If guessing word matches random word
                if (guessingWord.join("") === wordToMatch) {
                    // Increment # of wins
                    wins++
                    pauseGame = true
                    updateDisplay()
                    setTimeout(resetGame,5000)
                    alert("You knocked it out of the park!!!");
                }
            }
        }

        if (!foundLetter) {
            
            // Making sure the incorrect letter has not already been pressed
            if (!guessedLetters.includes(letter)) {
                // Adding the incorrect letter to the list of guessed letters
                guessedLetters.push(letter)
                // Decreases the number of guesses remaining
                numGuess--
            }
            if (numGuess === 0) {
                // Shows the correct name before reseting
                guessingWord = wordToMatch.split()
                pauseGame = true
                setTimeout(resetGame, 5000)
            }
        }

        updateDisplay()

    }
    // Check in keypressed is between A-Z or a-z
    function isAlpha (ch){
        return /^[A-Z]$/i.test(ch);
    }

    function resetGame() {
        numGuess = maxGuess
        pauseGame = false

        // Resets a new name
        wordToMatch = playerNames[Math.floor(Math.random() * playerNames.length)].toUpperCase()
        console.log(wordToMatch)

        // Reset word arrays
        guessedLetters = []
        guessingWord = []

        // Reset the guessed word
        for (var i=0, j=wordToMatch.length; i < j; i++){
            // Adds a space between first and last name
            if (wordToMatch[i] === " ") {
                guessingWord.push(" ")
            } else {
                guessingWord.push("_")
            }
        }

        // Update the Display
        updateDisplay()
    }

    function updateDisplay () {
        document.getElementById("totalWins").innerText = wins
        document.getElementById("currentName").innerText = guessingWord.join("")
        document.getElementById("remainingGuesses").innerText = numGuess
        document.getElementById("guessedLetters").innerText =  guessedLetters.join(" ")
    }
})