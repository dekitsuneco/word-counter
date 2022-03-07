// Caching DOM:
const textInput = document.querySelector('.counter__textarea');
const wordCount = document.querySelector('.word-count');
const letterCount = document.querySelector('.letter-count');
const spaceCount = document.querySelector('.space-count');

// Set of check functions:
/* We suppose that a word is:
 * - a combination of at least 2 letters
 * - a combination of letters which hasn't three or more the same consecutive letters
 */
const toLetters = (word) => word.match(/\w/gi) || [];
const hasProperLength = (word) => {
  const letters = toLetters(word);
  const singleLetterWords = ['I', 'a'];

  if (letters.length < 2) {
    // eslint-disable-next-line no-restricted-syntax
    for (const singleLetterWord of singleLetterWords) {
      if (letters.includes(singleLetterWord)) {
        return true;
      }
    }

    return false;
  }

  return true;
};

const hasThreeConsecutiveCharacters = (word) => {
  const { isValidWord } = Array.from(word).reduce(
    (acc, letter) => {
      if (letter === acc.prevletter) {
        acc.consecutiveOccurence++;

        if (acc.consecutiveOccurence >= 3) {
          acc.isValidWord = false;
        }
      } else {
        acc.prevletter = letter;
        acc.consecutiveOccurence = 1;
      }

      return acc;
    },
    { prevLetter: '', consecutiveOccurence: 1, isValidWord: true },
  );

  return isValidWord;
};

// Main logic:
const checks = [hasProperLength, hasThreeConsecutiveCharacters];

textInput.addEventListener('input', () => {
  const words = textInput.value.trim().split(/[\s-]/);

  letterCount.innerHTML = (textInput.value.match(/[a-z]/gi) || []).length;
  spaceCount.innerHTML = (textInput.value.match(/\s+/g) || []).length;

  let wc = 0;

  // eslint-disable-next-line no-restricted-syntax
  for (const word of words) {
    let hasPassedAll = true;
    // eslint-disable-next-line no-restricted-syntax
    for (const check of checks) {
      const hasPassed = check(word);

      if (!hasPassed) {
        hasPassedAll = false;
        break;
      }
    }

    if (hasPassedAll) {
      wc++;
    }
  }
  wordCount.innerHTML = wc;
});
