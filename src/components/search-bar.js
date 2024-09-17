// SearchBar.js
import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

const SearchBar = ({recentSearches, autoCompleteSuggestions, onSearch}) => {
  const [query, setQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleSearch = text => {
    setQuery(text);
    if (text.length > 0) {
      const filtered = autoCompleteSuggestions.filter(item =>
        item.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSelection = item => {
    setQuery(item);
    onSearch(item);
  };

  return (
    <View style={styles.container}>
      <Autocomplete
        data={
          filteredSuggestions.length === 0 && query.length === 0
            ? recentSearches
            : filteredSuggestions
        }
        defaultValue={query}
        onChangeText={text => handleSearch(text)}
        placeholder="Search products..."
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleSelection(item)}>
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        )}
        flatListProps={{
          keyExtractor: (_, idx) => idx.toString(),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  itemText: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default SearchBar;
