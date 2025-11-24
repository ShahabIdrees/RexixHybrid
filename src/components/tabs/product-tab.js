import React from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import {getDummyProducts} from '../../utils/helper-functions';
import {useCommonStyles} from '../../common-styling/theme-styling';
import {useAppColors} from '../../utils/colors';

const products = getDummyProducts(10);

const ProductTab = () => {
  const commonStyles = useCommonStyles();
  const colors = useAppColors();
  return (
    <ScrollView>
      <View style={[styles.container, {backgroundColor: colors.primaryBG}]}>
        {products.map(product => (
          <View
            key={product.id}
            style={[
              styles.productContainer,
              {backgroundColor: colors.secondary},
            ]}>
            {/* Product Image */}
            <Image
              source={
                typeof product.image === 'number'
                  ? product.image
                  : typeof product.image === 'string'
                  ? {uri: product.image}
                  : product.image?.uri
                  ? {uri: product.image.uri}
                  : null
              }
              style={styles.productImage}
            />

            {/* Product Info */}
            <View style={styles.productInfo}>
              <Text style={commonStyles.largeLabel}>{product.name}</Text>
              <Text style={[styles.productCategory, commonStyles.label]}>
                {product.category}
              </Text>
              <View style={styles.ratingContainer}>
                <Text style={[styles.productRating, commonStyles.boldLabel]}>
                  Rating: {product.rating}
                </Text>
                <Text style={[styles.ratingCount, commonStyles.smallLabel]}>
                  ({product.numberOfRatings} ratings)
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  productContainer: {
    flexDirection: 'row', // Align image and info side by side
    marginBottom: 8, // Space between product items
    backgroundColor: '#fff', // Optional: Add background color
    borderRadius: 8, // Optional: Rounded corners
    overflow: 'hidden', // Optional: Ensures image doesn't overflow
    elevation: 3, // Optional: Adds shadow on Android
  },
  productImage: {
    width: 100, // Square image
    height: '100%',
    // aspectRatio: 1,
  },
  productInfo: {
    flex: 1,
    padding: 10, // Padding between text and the image
    justifyContent: 'center', // Vertically center the text
  },
  productName: {
    // fontSize: 16,
    // fontWeight: 'bold',
  },
  productCategory: {
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row', // Rating and count side by side
    alignItems: 'center',
  },
  productRating: {
    marginRight: 5,
  },
  ratingCount: {
    // fontSize: 14,
    color: '#888', // Lighter color for rating count
  },
});

export default ProductTab;
