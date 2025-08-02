export const convertErrorToErrorResponse = (error: Error): { message: string, name: string } => {
    return { message: error.message, name: error.name };
}

// Define custom error classes
export class BoggleError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BoggleError";
  }
}

export class WordTooShortError extends BoggleError {
  constructor(word?: string) {
    let message: string;
    // If a word is provided, include it in the error message
    if (word) {
      message = `"${word}" is too short. Must be at least 3 letters.`;
    } else {
      message = "Word is too short. Must be at least 3 letters.";
    }
    // Call the parent constructor with the message
    super(message);
    this.name = "WordTooShortError";
  }
}

export class InvalidWordError extends BoggleError {
  constructor(word?: string) {
    let message: string;
    // If a word is provided, include it in the error message
    if (word) {
      message = `"${word}" is not a valid word.`;
    }else {
      message = "Word is not valid.";
    }
    // Call the parent constructor with the message
    super(message);
    this.name = "InvalidWordError";
  }
}

export class GameExpiredError extends BoggleError {
  constructor(word?: string) {
    let message: string;
    // If a word is provided, include it in the error message
    if (word) {
      message = `"${word}" cannot be played because the game has expired.`;
    } else {
      message = "The game has expired.";
    }
    super(message);
    this.name = "GameExpiredError";
  }
}

export class MovesLengthMismatchError extends BoggleError {
  constructor() {
    super("Number of moves does not match word length.");
    this.name = "MovesLengthMismatchError";
  }
}

export class OutOfBoundsError extends BoggleError {
  constructor() {
    super("Move is out of bounds.");
    this.name = "OutOfBoundsError";
  }
}

export class WordMismatchError extends BoggleError {
  constructor() {
    super("Word does not match the letters in the moves.");
    this.name = "WordMismatchError";
  }
}

export class RepeatedLetterError extends BoggleError {
  constructor() {
    super("A letter position is repeated.");
    this.name = "RepeatedLetterError";
  }
}

export class NotAdjacentError extends BoggleError {
  constructor() {
    super("Each move must be adjacent to the previous move.");
    this.name = "NotAdjacentError";
  }
}

export class GameNotFoundError extends BoggleError {
  constructor() {
    super("Game not found.");
    this.name = "GameNotFoundError";
  }
}

export class WordAlreadyFoundError extends BoggleError {
  constructor(word?: string) {
        let message: string;
    // If a word is provided, include it in the error message
    if (word) {
      message = `"${word}" has already been found in this game.`;
    }else {
      message = "This word has already been found in this game.";
    }
    // Call the parent constructor with the message
    super(message);
    this.name = "WordAlreadyFoundError";
  }
}