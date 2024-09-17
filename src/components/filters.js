// Filters.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
// import CustomPicker from './CustomPicker';
import CustomPicker from './custom-picker';

const Filters = ({filters, selectedFilters, onFilterChange}) => {
  return (
    <View style={styles.container}>
      {filters.map(filter => (
        <View key={filter.id} style={styles.filter}>
          <Text style={styles.filterLabel}>{filter.name}</Text>
          <CustomPicker
            label={`Select ${filter.name}`}
            options={filter.options}
            selectedValue={selectedFilters[filter.id]}
            onValueChange={value => onFilterChange(filter.id, value)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  filter: {
    marginBottom: 15,
  },
  filterLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Filters;
