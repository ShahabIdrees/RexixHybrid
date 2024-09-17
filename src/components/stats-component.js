import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useCommonStyles} from '../common-styling/theme-styling';
import {useAppColors} from '../utils/colors';

const StatsComponent = props => {
  const commonStyles = useCommonStyles();
  const colors = useAppColors();
  return (
    <View style={[styles.container, {backgroundColor: colors.secondary}]}>
      {props?.stats?.map((item, index) => {
        return (
          <View style={styles.item}>
            <Text style={[commonStyles.largeLabel]}>
              {props?.stats[index]?.count}
            </Text>
            <Text style={[commonStyles.label]}>
              {props?.stats[index]?.title}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 14,
    width: '100%',
    // marginBottom: 20,
    // backgroundColor: ,
    marginHorizontal: 16,
    borderRadius: 8,
    paddingVertical: 12,
  },
  item: {
    alignItems: 'center',
    flex: 1,
  },
});

export default StatsComponent;
