import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {generateDummyPosts} from '../../utils/helper-functions';
import ReviewPost from '../review-post';
import {useCommonStyles} from '../../common-styling/theme-styling';
import {useAppColors} from '../../utils/colors';

const reviews = generateDummyPosts(10);

const ReviewsTab = () => {
  const commonStyles = useCommonStyles();
  const colors = useAppColors();

  return (
    <ScrollView style={{backgroundColor: colors.primaryBG}}>
      <View style={styles.container}>
        {reviews.map(review => (
          <ReviewPost
            key={review.id} // Add a unique key for each item
            title={review.title}
            content={review.content}
            images={review.images} // Pass the images array
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ReviewsTab;
