// Define custom error classes
export class BoggleError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BoggleError";
  }
}

export class WordTooShortError extends BoggleError {
  constructor() {
    super("Word is too short. Must be at least 3 letters.");
    this.name = "WordTooShortError";
  }
}

export class InvalidWordError extends BoggleError {
  constructor() {
    super("Word is not valid.");
    this.name = "InvalidWordError";
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
  constructor() {
    super("Word has already been found in this game.");
    this.name = "WordAlreadyFoundError";
  }
}