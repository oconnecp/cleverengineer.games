import { registerFeatureHandler, unregisterFeatureHandler } from './FeatureService';
import React, { useEffect, useCallback } from "react";

interface FeatureFlagWrapperProps {
  featureId: string;
  children?: React.ReactNode;
}

export const FeatureFlagWrapper: React.FC<FeatureFlagWrapperProps> = ({ featureId, children }) => {
  const [featureValue, setFeatureValue] = React.useState<boolean>(false);

  const handleFeatureFlagUpdate = useCallback((featureState: boolean) => {
    setFeatureValue(featureState);
  }, [featureId]);

  useEffect(() => {
    try {
      registerFeatureHandler(featureId, handleFeatureFlagUpdate);
    } catch (error) {
      console.error(`Failed to register feature handler for ${featureId}:`, error);
    }
  
    return () => {
      try {
        unregisterFeatureHandler(featureId, handleFeatureFlagUpdate);
      } catch (error) {
        console.error(`Failed to unregister feature handler for ${featureId}:`, error);
      }
    };
  }, [featureId, handleFeatureFlagUpdate]);


  const renderedChildren = React.useMemo(() => {
    return featureValue ? children : null;
  }, [featureValue, children]);
  
  return <div>{renderedChildren}</div>;
}