import { useParams, useNavigate } from 'react-router-dom';
import { Features, setFeature } from '../../tools/Features';
import React, { useEffect } from "react";

export const FeatureFlags: React.FC = () => {
  let { featureId } = useParams();
  const navigate = useNavigate();

  useEffect((): any  => {
    if (featureId) {
      featureId = featureId.toUpperCase();
      const featureWasSet = setFeature(featureId as keyof typeof Features, !Features[featureId as keyof typeof Features]);
      if(featureWasSet) {
      console.log(`Feature ${featureId} set to ${Features[featureId as keyof typeof Features]}`);
      }
      return navigate('/');
    }
  }, [featureId]);

  return (
    <div> Setting Feature Flag</div>
  )
}