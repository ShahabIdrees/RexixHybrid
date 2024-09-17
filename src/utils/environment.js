import {Dimensions, PixelRatio, useColorScheme} from 'react-native';
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const HeightRatio = windowHeight / 826;
export const hp = height => {
  return PixelRatio.roundToNearestPixel(height * HeightRatio);
};
