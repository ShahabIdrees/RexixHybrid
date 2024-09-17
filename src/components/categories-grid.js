// CategoriesGrid.js
import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

const CategoriesGrid = ({categories, onCategorySelect}) => {
  return (
    <FlatList
      data={categories}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => onCategorySelect(item)}>
          <View style={styles.categoryItem}>
            <Text style={styles.categoryText}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id}
      numColumns={2}
      contentContainerStyle={styles.grid}
    />
  );
};

const styles = StyleSheet.create({
  grid: {
    padding: 15,
  },
  categoryItem: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 16,
  },
});

export default CategoriesGrid;
