// TrendingSection.js
import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

const TrendingSection = ({trendingItems, onItemSelect}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trending</Text>
      <FlatList
        data={trendingItems}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => onItemSelect(item)}>
            <View style={styles.trendingItem}>
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  trendingItem: {
    marginRight: 15,
    padding: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    borderRadius: 10,
  },
  itemText: {
    fontSize: 16,
  },
});

export default TrendingSection;
