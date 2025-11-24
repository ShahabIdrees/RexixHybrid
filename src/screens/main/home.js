import React, {useState, useRef, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {ReviewPost} from '../../components';
import {generateDummyPosts} from '../../utils/helper-functions';
import {Mail, UserCircle2} from 'lucide-react-native';
import {useTheme} from '../../contexts/ThemeContext';

// Persistent counter for generating unique IDs

// Function to generate dummy data with unique keys

const Home = ({navigation}) => {
  const [posts, setPosts] = useState(generateDummyPosts(10));
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [lastOffset, setLastOffset] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const {colors, actualTheme} = useTheme();
  const loadMorePosts = useCallback(() => {
    const newPosts = generateDummyPosts(10);
    setPosts(prevPosts => [...prevPosts, ...newPosts]);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setPosts(generateDummyPosts(10)); // Refresh the list with new data
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderItem = useCallback(
    ({item}) => (
      <ReviewPost
        title={item.title}
        content={item.content}
        images={item.images}
        rating={item.rating}
        postId={item.id}
      />
    ),
    [],
  );

  const keyExtractor = useCallback(item => item.id, []);

  const ListHeaderComponent = () => (
    <Animated.View
      style={[
        styles.header,
        {
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -70], // Translate up to hide completely
                extrapolate: 'clamp',
              }),
            },
          ],
          opacity: scrollY.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 0.5, 0], // Smooth fade out
            extrapolate: 'clamp',
          }),
        },
        {
          backgroundColor: colors.primaryBG,
        },
      ]}>
      <Text
        style={[
          styles.headerText,
          {color: actualTheme === 'dark' ? '#B00814' : '#3A0050'},
        ]}>
        Rexix
      </Text>
      <View style={styles.headerActions}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            navigation.navigate('Messages');
          }}>
          <Mail
            size={24}
            color={actualTheme === 'dark' ? '#B00814' : '#3A0050'}
            strokeWidth={2}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <UserCircle2
            size={24}
            color={actualTheme === 'dark' ? '#B00814' : '#3A0050'}
            strokeWidth={2}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const handleScroll = event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const diff = currentOffset - lastOffset;

    // Only hide/show header if scrolled enough and not at the top
    if (Math.abs(diff) > 5 && currentOffset > 50) {
      const shouldHide = diff > 0; // Scrolling down

      if (shouldHide !== !headerVisible) {
        setHeaderVisible(!shouldHide);

        Animated.timing(scrollY, {
          toValue: shouldHide ? 1 : 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    } else if (currentOffset <= 50 && !headerVisible) {
      // Always show header when near the top
      setHeaderVisible(true);
      Animated.timing(scrollY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    setLastOffset(currentOffset);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.primaryBG,
        },
      ]}>
      {ListHeaderComponent()}
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={50}
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerButton: {
    padding: 4,
  },
  list: {
    paddingTop: 66,
    paddingBottom: 100,
    paddingHorizontal: 0,
  },
});

export default Home;
