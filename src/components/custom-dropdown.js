import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useCommonStyles} from '../common-styling/theme-styling';
import {useAppColors} from '../utils/colors';
import {Dropdown} from 'react-native-element-dropdown';

const CustomDropdown = ({data, maxHeight = 250, value, onChange}) => {
  const commonStyles = useCommonStyles();
  const colors = useAppColors();
  return (
    <Dropdown
      style={[commonStyles.dropdown, {marginVertical: 8}]}
      placeholderStyle={commonStyles.label}
      selectedTextStyle={commonStyles.label}
      inputSearchStyle={[
        commonStyles.label,
        {
          backgroundColor: colors.primaryBG,
          borderRadius: 4,
          borderWidth: 0,
          overflow: 'hidden',
          width: '100%',
          alignSelf: 'center',
        },
      ]}
      itemTextStyle={[commonStyles.label, {backgroundColor: colors.primaryBG}]}
      containerStyle={[commonStyles.dropdown, {marginTop: 2}]}
      dropdownContainerStyle={{backgroundColor: 'red'}}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={maxHeight}
      labelField="label"
      valueField="value"
      placeholder="Select item"
      searchPlaceholder="Search..."
      value={value}
      onChange={item => {
        onChange(item.value);
      }}
      // itemContainerStyle={{
      //   borderBottomWidth: 0.3,
      //   borderRadius: 4,
      // }}
      itemContainerStyle={{backgroundColor: 'red'}}
      renderItem={(item, selected) => (
        <View
          style={{
            backgroundColor: colors.primaryBG, // Background color should work here
            borderBottomWidth: 0.3,
            borderColor: colors.borderColor,
            borderBottomColor: colors.borderColor,
            padding: 8,
            paddingVertical: 12,
            borderRadius: 4,
            marginTop: 1,
          }}>
          <Text style={commonStyles.label}>{item.label}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default CustomDropdown;
