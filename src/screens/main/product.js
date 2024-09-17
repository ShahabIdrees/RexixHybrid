import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {useCommonStyles} from '../../common-styling/theme-styling';
import {ReviewPost, StatsComponent} from '../../components';
import {useAppColors} from '../../utils/colors';
import {generateDummyPosts} from '../../utils/helper-functions';
import {TouchableOpacity} from 'react-native';

// Get the window dimensions
const {width: windowWidth} = Dimensions.get('window');

const Product = ({navigation}) => {
  const [posts, setPosts] = useState(generateDummyPosts(8));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const commonStyles = useCommonStyles();
  const colors = useAppColors();
  const loadMorePosts = () => {
    const newPosts = generateDummyPosts(10);
    setPosts([...posts, ...newPosts]);
  };
  const dummyStats = [
    {id: '1', title: 'Customers', count: 69},
    {id: '2', title: 'Reviews', count: 69},
    {id: '3', title: 'Rating', count: 4.5},
  ];

  const images = [
    'https://via.placeholder.com/600x400.png?text=Image+1',
    'https://via.placeholder.com/600x400.png?text=Image+2',
    'https://via.placeholder.com/600x400.png?text=Image+3',
    'https://via.placeholder.com/600x400.png?text=Image+4',
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setPosts(generateDummyPosts(10)); // Refresh the list with new data
      setRefreshing(false);
    }, 2000);
  };

  const renderItem = ({item}) => (
    <ReviewPost
      title={item.title}
      content={item.content}
      images={item.images}
    />
  );
  const ListHeaderComponent = () => {
    return (
      <Text
        style={[commonStyles.subHeading, {marginTop: 8, marginHorizontal: 8}]}>
        Reviews
      </Text>
    );
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.primaryBG}]}
      contentContainerStyle={{alignItems: 'center'}}>
      <View
        style={{flexDirection: 'column', alignSelf: 'flex-start', padding: 16}}>
        <Text style={[commonStyles.heading, {}]}>iPhone 15 Pro Max</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Brand');
          }}>
          <Text style={[commonStyles.label, {color: colors.brandAccentColor}]}>
            by {'Apple'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 16}}>
        <StatsComponent stats={dummyStats} />
      </View>
      {images.length > 0 && (
        <View style={styles.carouselContainer}>
          <Carousel
            width={windowWidth}
            height={windowWidth}
            data={images}
            loop={false}
            autoPlay={false}
            scrollAnimationDuration={200}
            onSnapToItem={index => setCurrentIndex(index)}
            renderItem={({item}) => (
              <Image source={{uri: item}} style={styles.singleImage} />
            )}
          />
          {images.length > 1 && (
            <View style={styles.dotsContainer}>
              {images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    index === currentIndex
                      ? styles.dotHighlightedStyle
                      : styles.dotStyle,
                    {
                      backgroundColor:
                        index === currentIndex
                          ? colors.brandAccentColor
                          : 'gray',
                    },
                  ]}
                />
              ))}
            </View>
          )}
        </View>
      )}
      <View style={{width: '100%', paddingHorizontal: 8}}>
        <View style={[styles.specsTitleContainer]}>
          <Text style={commonStyles.title}>Specifications </Text>
          {/* <Text style={[commonStyles.label, {textDecorationLine: 'underline'}]}>
            View all specs
          </Text> */}
        </View>
        <Text style={commonStyles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
          purus nec nulla tincidunt. Nulla facilisi. Donec euismod, nisl vitae
          posuere ultricies, purus nunc ultricies nunc, nec ultricies elit
          libero non eros.
        </Text>
      </View>
      <View>
        <FlatList
          data={posts}
          renderItem={renderItem}
          key={item => item.id}
          ListHeaderComponent={ListHeaderComponent}
          keyExtractor={item => item.id}
          // onEndReached={loadMorePosts}
          // onEndReachedThreshold={0.9}
          // onScroll={handleScroll}
          scrollEventThrottle={8}
          initialNumToRender={5} // Adjust based on expected initial content size
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.list}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Change as per your theme
    // padding: 16,
    width: windowWidth,
    // alignItems: 'center', // Center the content horizontally
  },
  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    height: windowWidth + 16,
  },
  singleImage: {
    width: windowWidth,
    height: windowWidth,
    resizeMode: 'cover', // Ensures the image covers the container
    // borderRadius: 8,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dotStyle: {
    width: 4,
    height: 4,
    borderRadius: 3,
    marginHorizontal: 2,
    backgroundColor: 'gray',
  },
  dotHighlightedStyle: {
    width: 6,
    height: 6,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  specsTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Product;
