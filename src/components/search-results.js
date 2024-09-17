// SearchResults.js
import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

const SearchResults = ({results}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        renderItem={({item}) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultText}>{item.name}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  resultItem: {
    marginBottom: 15,
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  resultText: {
    fontSize: 16,
  },
});

export default SearchResults;
