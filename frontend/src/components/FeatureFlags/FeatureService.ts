import { set } from "lodash";

export const Features = {
  LOGIN: false,
};


const handlers: Record<string, ((featureState:boolean) => void)[]> = {};

export const registerFeatureHandler = (featureId:string, callback: (featureState:boolean) => void) =>{ 
  if(handlers[featureId] === undefined) {
    handlers[featureId] = [];
  }

  handlers[featureId].push(callback);
  return callback;
}

export const unregisterFeatureHandler = (featureId: string, callback: (featureState:boolean) => void) => {
  if(handlers[featureId] === undefined) {
    return;
  }
  const featureHandlers = handlers[featureId];
  
  const index = featureHandlers.indexOf(callback);
  if (index !== -1) {
    featureHandlers.splice(index, 1);
  }
}

const LastSet = Object.keys(Features).reduce((acc, key) => {
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

// returns true or false whether the feature was set or not
export const setFeature = (feature: keyof typeof Features, value: boolean): boolean => {

  // Check if the feature exists and if it was set in the last 5 seconds
    if (!LastSet[feature] || !dateSetInTheLastFiveSeconds(LastSet[feature])) {
      set(Features, feature, value);
      set(LastSet, feature, new Date().toISOString());
      // Notify all handlers for this feature
      if (handlers[feature]) {
        handlers[feature].forEach(handler => handler(value));
      }
      console.log(`Feature ${feature} set to ${value}`);
      // Return true to indicate the feature was set
      return true;
    } 
    if (dateSetInTheLastFiveSeconds(LastSet[feature])) {
      console.warn(`Feature ${feature} was set in the last 5 seconds.`);
    }

    return false;
}

