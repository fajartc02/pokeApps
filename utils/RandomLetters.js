import { LettersConstant } from "../constants/LettersConstant";

export const RandomLetters = () => {
    const letters = LettersConstant;

    return letters[Math.floor(Math.random() * letters.length)];
}