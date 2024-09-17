import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppColors} from '../utils/colors';
import {useCommonStyles} from '../common-styling/theme-styling';

const DummyScreen = () => {
  const commonStyles = useCommonStyles();
  const colors = useAppColors();
  return <View></View>;
};

const styles = StyleSheet.create({});

export default DummyScreen;
