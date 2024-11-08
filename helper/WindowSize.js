// windowSize.js
import { useWindowDimensions } from 'react-native';

export const useWindowSize = () => {
  const { width: DeviceWidth, height: DeviceHeight } = useWindowDimensions();

  const wp = (percentage) => {
    return (percentage * DeviceWidth) / 100;
  };

  const hp = (percentage) => {
    return (percentage * DeviceHeight) / 100;
  };

  return { wp, hp, DeviceWidth, DeviceHeight };
};
