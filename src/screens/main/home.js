import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  useColorScheme,
  RefreshControl,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ReviewPost} from '../../components';
import {darkColors, lightColors} from '../../utils/colors';
import {generateDummyPosts} from '../../utils/helper-functions';

// Persistent counter for generating unique IDs

// Function to generate dummy data with unique keys

const Home = ({navigation}) => {
  const [posts, setPosts] = useState(generateDummyPosts(10));
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [lastOffset, setLastOffset] = useState(0);
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? darkColors : lightColors;
  const loadMorePosts = () => {
    const newPosts = generateDummyPosts(10);
    setPosts([...posts, ...newPosts]);
  };

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

  const ListHeaderComponent = () => (
    <Animated.View
      style={[
        styles.header,
        {
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -60], // Translate up to hide
                extrapolate: 'clamp',
              }),
            },
          ],
          opacity: scrollY.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0], // Fade out as it translates up
            extrapolate: 'clamp',
          }),
        },
        {
          backgroundColor:
            colorScheme === 'dark'
              ? darkColors.primaryBG
              : lightColors.primaryBG,
        },
      ]}>
      <Text
        style={[
          styles.headerText,
          {color: colorScheme === 'dark' ? '#B00814' : '#3A0050'},
        ]}>
        Rexix
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile');
        }}>
        <Image
          source={{uri: 'sk'}}
          style={{
            borderColor: colors.borderColor,
            borderWidth: 0.1,
            height: 24,
            aspectRatio: 1,
            borderRadius: 24,
          }}
        />
      </TouchableOpacity>
    </Animated.View>
  );

  const handleScroll = event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = currentOffset > lastOffset ? 'down' : 'up';
    const offsetValue = direction === 'down' ? 1 : 0;
    Animated.timing(scrollY, {
      toValue: offsetValue,
      duration: 30,
      useNativeDriver: true, // Use native driver for better performance
    }).start();
    setLastOffset(currentOffset);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            colorScheme === 'dark'
              ? darkColors.primaryBG
              : lightColors.primaryBG,
        },
      ]}>
      {ListHeaderComponent()}
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.9}
        onScroll={handleScroll}
        scrollEventThrottle={8}
        initialNumToRender={5} // Adjust based on expected initial content size
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // backgroundColor: '#f8f8f8',
    alignItems: 'center',
    // borderWidth: 2,
    borderColor: 'white',
    paddingHorizontal: 20,
    flexDirection: 'row',
    zIndex: 1000,
    justifyContent: 'space-between',
    overflow: 'hidden',
    height: 60, // Fixed height for the header
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    // textAlign: 'left',
    // alignSelf: 'flex-start',
  },
  list: {
    paddingTop: 60,
    paddingBottom: 20,
  },
});

export default Home;
