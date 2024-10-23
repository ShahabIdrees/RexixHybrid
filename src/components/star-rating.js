import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StarRating = ({rating, onRatingChange}) => {
  const [starRating, setStarRating] = useState(rating);

  const handleRating = value => {
    setStarRating(value);
    onRatingChange(value); // Pass selected rating to parent component
  };

  return (
    <View style={{flexDirection: 'row'}}>
      {[1, 2, 3, 4, 5].map(star => (
        <TouchableOpacity key={star} onPress={() => handleRating(star)}>
          <Icon
            name={starRating >= star ? 'star' : 'star-o'}
            size={30}
            color={starRating >= star ? '#ffd700' : '#ccc'}
            style={{marginHorizontal: 5}}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default StarRating;
