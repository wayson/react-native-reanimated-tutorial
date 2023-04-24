/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {Page} from './components/Page';

const WORDS = ['What', 'a', 'wonderful', 'world'];

function App(): JSX.Element {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event: any) => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      pagingEnabled
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      style={styles.container}
      horizontal>
      {WORDS.map((word, index) => {
        return (
          <Page
            key={index + ''}
            title={word}
            index={index}
            translateX={translateX}
          />
        );
      })}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
