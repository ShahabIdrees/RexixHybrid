import React from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';
import {useCommonStyles} from '../../common-styling/theme-styling';
import {useAppColors} from '../../utils/colors';
import {StatsComponent} from '../../components';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {windowHeight, windowWidth} from '../../utils/environment';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ProductTab, ReviewsTab, ServicesTab} from '../../components/tabs';
import {Tabs} from 'react-native-collapsible-tab-view';

const Tab = createMaterialTopTabNavigator();

const Brand = () => {
  const commonStyles = useCommonStyles();
  const colors = useAppColors();

  const dummyStats = [
    {id: '1', title: 'Customers', count: 688889},
    {id: '2', title: 'Reviews', count: 69999},
    {id: '3', title: 'Rating', count: 4.8},
  ];

  const dataTabOne = [
    {id: '1', title: 'Customer 1'},
    {id: '2', title: 'Customer 2'},
    {id: '3', title: 'Customer 3'},
    {id: '4', title: 'Customer 4'},
    {id: '5', title: 'Customer 5'},
    {id: '6', title: 'Customer 6'},
    {id: '7', title: 'Customer 7'},
    {id: '8', title: 'Customer 8'},
    {id: '9', title: 'Customer 9'},
    {id: '10', title: 'Customer 10'},
    {id: '11', title: 'Customer 11'},
    {id: '12', title: 'Customer 12'},
    {id: '13', title: 'Customer 13'},
    {id: '14', title: 'Customer 14'},
    {id: '15', title: 'Customer 15'},
    {id: '16', title: 'Customer 16'},
    {id: '17', title: 'Customer 17'},
    {id: '18', title: 'Customer 18'},
    {id: '19', title: 'Customer 19'},
    {id: '20', title: 'Customer 20'},
    // Add more data as required
  ];

  const dataTabTwo = [
    {id: '1', title: 'Review 1'},
    {id: '2', title: 'Review 2'},
    // Add more data as required
  ];

  const dataTabThree = [
    {id: '1', title: 'Rating 1'},
    {id: '2', title: 'Rating 2'},
    // Add more data as required
  ];

  // Screen components for each tab
  const TabOne = () => (
    <FlatList
      data={dataTabOne}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <Text style={[commonStyles.label, styles.listItem]}>{item.title}</Text>
      )}
    />
  );

  const TabTwo = () => (
    <FlatList
      data={dataTabTwo}
      keyExtractor={item => item.id}
      renderItem={({item}) => <Text style={styles.listItem}>{item.title}</Text>}
    />
  );

  const TabThree = () => (
    <FlatList
      data={dataTabThree}
      keyExtractor={item => item.id}
      renderItem={({item}) => <Text style={styles.listItem}>{item.title}</Text>}
    />
  );

  const Header = () => {
    return <View style={styles.header} />;
  };
  const renderItem = React.useCallback(({index}) => {
    return (
      <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
    );
  }, []);

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.primaryBG}]}
      contentContainerStyle={{alignItems: 'center'}}>
      <View style={styles.brandInfoContainer}>
        <Image style={styles.logo} />
        <View style={styles.infoContentContainer}>
          {/* Add brand information content here */}
          <View>
            <Text style={commonStyles.largeTitle}>Apple</Text>
            <Text style={commonStyles.smallLabel}>Cupertino, California</Text>
          </View>
          <View style={{marginTop: 4}}>
            <Text style={[commonStyles.smallLabel, {color: colors.linkColor}]}>
              Visit Website
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.contactDetails}>
        {/* Add contact details here */}
        <View style={styles.contactItem}>
          <Icon name="phone" color={colors.brandAccentColor} size={16} />
          <Text style={[{flex: 1, marginHorizontal: 8}, commonStyles.label]}>
            92 345 2789929
          </Text>
          <TouchableOpacity>
            <Icon name="copy" color={colors.linkColor} size={16} />
          </TouchableOpacity>
        </View>
        <View style={styles.contactItem}>
          <Icon name="address" color={colors.brandAccentColor} size={16} />
          <Text style={[commonStyles.label, {marginHorizontal: 8}]}>
            Apple Inc. 1 Apple Park Way. Cupertino, CA 95014. United States
          </Text>
        </View>
        <View style={styles.contactItem}>
          <Icon name="location" color={colors.brandAccentColor} size={16} />
          <TouchableOpacity>
            <Text
              style={[
                commonStyles.label,
                {color: colors.linkColor, marginHorizontal: 8},
              ]}>
              View Locations
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats component */}
      <View style={{paddingHorizontal: 16}}>
        <StatsComponent stats={dummyStats} />
      </View>

      {/* Tab Navigator below the stats */}
      <View style={styles.tabContainer}>
        <NavigationContainer independent={true}>
          <Tab.Navigator
            screenOptions={{
              tabBarLabelStyle: commonStyles.label,
              tabBarIndicatorStyle: {backgroundColor: colors.brandAccentColor},
              tabBarStyle: {backgroundColor: colors.secondary},
            }}
            // headerContainerStyle={{width: '100%', height: 250}}
          >
            <Tab.Screen name="Product" component={ProductTab} />
            <Tab.Screen name="Services" component={ServicesTab} />
            <Tab.Screen name="Reviews" component={ReviewsTab} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 16,
  },
  brandInfoContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  infoContentContainer: {
    flex: 1,
    marginHorizontal: 12,
    justifyContent: 'center',
  },
  contactDetails: {
    paddingHorizontal: 16,
  },
  logo: {
    height: 64,
    width: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'orange',
  },
  tabContainer: {
    // height: 400, // Define height to manage scrolling
    width: windowWidth,
    // borderWidth: 1,
    height: windowHeight,
    marginTop: 8,
  },
  listItem: {
    padding: 16,
    borderBottomWidth: 1,
    color: 'orange',
    borderColor: '#ccc',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Brand;
