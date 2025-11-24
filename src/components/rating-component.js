import React from 'react';
import {StyleSheet, View, Text, useColorScheme} from 'react-native';
import {Star} from 'lucide-react-native';
import {darkColors, lightColors} from '../utils/colors';

const RatingComponent = ({rating = 5}) => {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? darkColors : lightColors;
  
  return (
    <View style={styles.container}>
      <Star 
        size={16} 
        color={colors.starColor} 
        fill={colors.starColor}
      />
      <Text style={[styles.ratingText, {color: colors.primaryText}]}>
        {rating.toFixed(1)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    marginLeft: 4,
  },
});

export default RatingComponent;
