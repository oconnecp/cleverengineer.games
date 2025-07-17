import { set } from "lodash";

export const Features = {
  LOGIN: false,
};

export const LastSet = Object.keys(Features).reduce((acc, key) => {
  return set(acc, key, null);
}, {} as Record<keyof typeof Features, string | null>);

const dateSetInTheLastFiveSeconds = (date: string | null): boolean => {
  if(typeof date === null) {
    return false
  }
  const now = new Date();
  const lastSetDate = new Date(date as string);
  const diffInSeconds = (now.getTime() - lastSetDate.getTime()) / 1000;
  return diffInSeconds < 5;
}

export const setFeature = (feature: keyof typeof Features, value: boolean): boolean => {

  // Check if the feature exists and if it was set in the last 5 seconds
  //if (Features.hasOwnProperty(feature)) {
    if (!LastSet[feature] || !dateSetInTheLastFiveSeconds(LastSet[feature])) {
      set(Features, feature, value);
      set(LastSet, feature, new Date().toISOString());
      return true;
    } 
    if (dateSetInTheLastFiveSeconds(LastSet[feature])) {
      console.warn(`Feature ${feature} was set in the last 5 seconds.`);
    }

    return false;

  //}
}