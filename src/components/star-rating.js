import React, {useMemo, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Star as StarIcon} from 'lucide-react-native';
import {useAppColors} from '../utils/colors';

const StarRating = ({
  rating,
  onRatingChange,
  center = false,
  showFeedback = false,
  labels,
}) => {
  const [starRating, setStarRating] = useState(rating);
  const colors = useAppColors();

  const feedbackLabels = useMemo(
    () =>
      labels || {
        1: 'Terrible experience',
        2: 'Bad',
        3: 'Could be better',
        4: 'Good',
        5: 'Excellent',
      },
    [labels],
  );

  const handleRating = value => {
    setStarRating(value);
    onRatingChange(value); // Pass selected rating to parent component
  };

  return (
    <View style={{alignItems: center ? 'center' : 'flex-start'}}>
      <View style={{flexDirection: 'row'}}>
        {[1, 2, 3, 4, 5].map(star => (
          <TouchableOpacity key={star} onPress={() => handleRating(star)}>
            <StarIcon
              size={28}
              color={colors.starColor || colors.brandAccentColor}
              fill={
                starRating >= star
                  ? colors.starColor || colors.brandAccentColor
                  : 'transparent'
              }
              style={{marginHorizontal: 6}}
            />
          </TouchableOpacity>
        ))}
      </View>
      {showFeedback ? (
        <Text style={{marginTop: 6, color: colors.secondaryText}}>
          {feedbackLabels[starRating] || ''}
        </Text>
      ) : null}
    </View>
  );
};

export default StarRating;
