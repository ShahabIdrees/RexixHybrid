// Search.js
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useAppColors} from '../../utils/colors';
import {useCommonStyles} from '../../common-styling/theme-styling';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'Product A',
    'Brand B',
  ]);
  const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState([]);
  const [filters, setFilters] = useState([
    {id: 'products', name: 'Products', selected: false},
    {id: 'brands', name: 'Brands', selected: false},
    {id: 'reviews', name: 'Reviews', selected: false},
    {id: 'people', name: 'People', selected: false},
    {id: 'local business', name: 'Local Business', selected: false},
  ]);
  const [selectedFilters, setSelectedFilters] = useState('');

  const commonStyles = useCommonStyles();
  const colors = useAppColors();

  // Handle search input and suggestions
  const handleSearchChange = query => {
    setSearchQuery(query);
    if (query.length > 0) {
      // Simulate fetching auto-complete suggestions
      setAutoCompleteSuggestions([`${query} 1`, `${query} 2`, `${query} 3`]);
    } else {
      setAutoCompleteSuggestions([]);
    }
  };

  // Handle filter selection
  const handleFilterSelect = filterId => {
    setFilters(prevFilters =>
      prevFilters.map(filter => ({
        ...filter,
        selected: filter.id === filterId,
      })),
    );
    setSelectedFilters(filterId);
  };

  // Handle search submission
  const handleSearchSubmit = () => {
    console.log('Searching for:', searchQuery, 'with filter:', selectedFilters);
    if (searchQuery && !recentSearches.includes(searchQuery)) {
      setRecentSearches([searchQuery, ...recentSearches]);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.primaryBG}]}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={[
            styles.searchBar,
            {
              borderColor: colors.borderColor,
              color: colors.primaryText,
              borderWidth: 1,
            },
            commonStyles.text,
          ]}
          placeholder="Search for products, brands, reviews..."
          placeholderTextColor={colors.placeholderColor}
          value={searchQuery}
          onChangeText={handleSearchChange}
          onSubmitEditing={handleSearchSubmit}
        />
      </View>

      {/* Filters - Visible only when search query exists */}
      {searchQuery.length > 0 && (
        <View style={styles.filtersWrapper}>
          <ScrollView
            style={styles.filtersContainer}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {filters.map(filter => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterButton,
                  filter.selected
                    ? {backgroundColor: colors.brandAccentColor}
                    : {backgroundColor: colors.secondaryBG},
                  {borderColor: colors.border},
                ]}
                onPress={() => handleFilterSelect(filter.id)}>
                <Text
                  style={[
                    styles.filterButtonText,
                    filter.selected
                      ? {color: colors.onAccent}
                      : {color: colors.primaryText},
                    commonStyles.text,
                  ]}>
                  {filter.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <ScrollView style={styles.resultsContainer}>
        {searchQuery.length === 0 ? (
          // Show recent searches
          <View style={styles.recentSearchesContainer}>
            <Text style={[styles.sectionTitle, commonStyles.heading]}>
              Recent Searches
            </Text>
            {recentSearches.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSearchQuery(item)}>
                <Text style={[styles.recentSearchItem, commonStyles.text]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          // Show auto-complete suggestions
          <View style={styles.autoCompleteContainer}>
            {autoCompleteSuggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSearchQuery(suggestion);
                  handleSearchSubmit();
                }}>
                <Text style={[styles.autoCompleteItem, commonStyles.text]}>
                  {suggestion}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  filtersWrapper: {
    height: 40, // Wrapper has a defined height just for the filter buttons
    marginTop: 8,
    paddingHorizontal: 16,
  },
  filtersContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    height: 30,
  },
  filterButtonText: {
    fontSize: 14,
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  recentSearchesContainer: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recentSearchItem: {
    paddingVertical: 8,
    fontSize: 14,
  },
  autoCompleteContainer: {
    marginTop: 16,
  },
  autoCompleteItem: {
    paddingVertical: 8,
    fontSize: 14,
  },
});

export default SearchScreen;
