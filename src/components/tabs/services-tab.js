import React from 'react';
import {StyleSheet, View, Text, Image, FlatList} from 'react-native';
import {getDummyProducts} from '../../utils/helper-functions'; // Assuming you can reuse this for services
import {useCommonStyles} from '../../common-styling/theme-styling';
import {useAppColors} from '../../utils/colors';

const services = getDummyProducts(10); // You can replace this with a `getDummyServices` if needed

const ServicesTab = () => {
  const commonStyles = useCommonStyles();
  const colors = useAppColors();

  // Render each service in the grid
  const renderServiceItem = ({item}) => (
    <View style={[styles.serviceItem, {backgroundColor: colors.secondary}]}>
      {/* Service Image */}
      <Image source={{uri: item.image}} style={styles.serviceImage} />

      {/* Service Info */}
      <View style={styles.serviceInfo}>
        <Text style={[commonStyles.largeLabel, styles.serviceName]}>
          {item.name}
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={[styles.serviceRating, commonStyles.boldLabel]}>
            Rating: {item.rating}
          </Text>
          <Text style={[styles.ratingCount, commonStyles.smallLabel]}>
            ({item.numberOfRatings} ratings)
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={services}
      renderItem={renderServiceItem}
      keyExtractor={item => item.id}
      numColumns={2} // Create a 2-column grid
      columnWrapperStyle={styles.columnWrapper} // Add space between columns
      contentContainerStyle={[
        styles.container,
        {backgroundColor: colors.primaryBG},
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  columnWrapper: {
    justifyContent: 'space-between', // Add space between columns
  },
  serviceItem: {
    flex: 1,
    marginBottom: 8, // Space between rows
    marginHorizontal: 4,
    borderRadius: 8, // Rounded corners
    overflow: 'hidden', // Prevent image overflow
    elevation: 3, // Shadow on Android
  },
  serviceImage: {
    width: '100%', // Full width
    height: 150, // Fixed height, adjust as necessary
    resizeMode: 'cover', // Ensure image covers the area
  },
  serviceInfo: {
    padding: 10, // Padding between text and the image
  },
  serviceName: {
    marginBottom: 4, // Space between name and rating
  },
  ratingContainer: {
    flexDirection: 'row', // Rating and count side by side
    alignItems: 'center',
  },
  serviceRating: {
    marginRight: 5,
  },
  ratingCount: {
    color: '#888', // Lighter color for rating count
  },
});

export default ServicesTab;
