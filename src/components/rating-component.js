import React from 'react';
import {StyleSheet, View, useColorScheme} from 'react-native';
import {
  StarDark,
  StarFilled,
  StarFilledGreen,
  StarLight,
} from '../assets/icons';

const RatingComponent = ({rating = 5}) => {
  const colorScheme = useColorScheme();
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <View key={i} style={styles.star}>
          {rating === 5 ? <StarFilledGreen /> : <StarFilled />}
        </View>,
      );
    } else {
      stars.push(
        <View key={i} style={styles.star}>
          {colorScheme === 'dark' ? <StarDark /> : <StarLight />}
        </View>,
      );
    }
  }

  return <View style={styles.container}>{stars}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  star: {
    marginHorizontal: 2,
  },
});

export default RatingComponent;
