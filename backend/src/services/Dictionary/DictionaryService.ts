import { AllWordDictionary } from "./AllWordDictionary";
import { PopularWordDictionary } from "./PopularWordDictionary";

export const getAllWordDictionary = (): string[] => {
  return AllWordDictionary;
};

export const getPopularWordDictionary = (): string[] => {
  return PopularWordDictionary;
};