/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
} from 'react-native-reanimated';

export default function App(): JSX.Element {
  const progress = useSharedValue(1);
  const scale = useSharedValue(1);

  const handleRotation = (progress: Animated.SharedValue<number>) => {
    'worklet';
    return `${progress.value * 2 * Math.PI}rad`;
  };

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * 100) / 2,
      transform: [{scale: scale.value}, {rotate: handleRotation(progress)}],
    };
  }, []);

  // useEffect(() => {
  //   progress.value = withRepeat(withSpring(0.5), -1, true);
  //   scale.value = withRepeat(withSpring(2), -1, true);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Animated.View
        style={[
          {height: 100, width: 100, backgroundColor: 'blue'},
          reanimatedStyle,
        ]}
      />
      <TouchableOpacity
        onPress={() => {
          progress.value = withSpring(0.5);
          scale.value = withSpring(2);
        }}>
        <Text>Click me</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
