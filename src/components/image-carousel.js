import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {windowWidth} from '../utils/environment';
import {useAppColors} from '../utils/colors';

const ImageCarousel = ({images}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const colors = useAppColors();

  // Check if the images array is valid and has length
  if (!images || images.length === 0) {
    return null; // Return null if there are no images to display
  }

  console.log('Total images: ' + images.length);

  return (
    <View>
      <Carousel
        width={windowWidth}
        height={windowWidth}
        data={images}
        style={{alignSelf: 'center'}}
        loop={false}
        scrollAnimationDuration={500} // Adjusted duration for smoother scrolling
        autoPlay={false}
        onSnapToItem={index => setCurrentIndex(index)}
        renderItem={({item}) => (
          <Image
            source={{uri: item}}
            style={styles.singleImage}
            resizeMode="cover" // Adjust resizeMode to better fit images within container
          />
        )}
      />
      {images.length > 1 && (
        <View style={{alignItems: 'center', marginVertical: 4}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  index === currentIndex
                    ? styles.dotHighlightedStyle
                    : styles.dotStyle,
                  {
                    backgroundColor:
                      index === currentIndex ? colors.brandAccentColor : 'gray',
                  },
                ]}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  singleImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8, // Optional: Add some rounding to images for better visuals
  },
  dotStyle: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 2,
    backgroundColor: 'gray',
  },
  dotHighlightedStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 2,
  },
});

export default ImageCarousel;
