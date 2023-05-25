/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const topRef = useRef<View>(null);
  const addButtonRef = useRef<TouchableOpacity>(null);

  const top = useSharedValue(0);
  const left = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: top.value,
      left: left.value,
    };
  });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.middleTopContainer} ref={topRef}>
        <Text>Hello world</Text>
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        ref={addButtonRef}
        onPress={() => {
          if (topRef.current && addButtonRef.current) {
            addButtonRef.current.measure(
              (x, y, width, height, pageX, pageY) => {
                console.log(
                  `button x: ${x}, y: ${y}, width: ${width}, height: ${height}, pageX: ${pageX}, pageY: ${pageY}`,
                );
                left.value = pageX;
                top.value = pageY;
              },
            );
            topRef.current.measure((x, y, width, height, pageX, pageY) => {
              console.log(
                `top x: ${x}, y: ${y}, width: ${width}, height: ${height}, pageX: ${pageX}, pageY: ${pageY}`,
              );
              left.value = withSpring(pageX, {
                stiffness: 50,
                overshootClamping: true,
              });
              top.value = withSpring(pageY, {
                stiffness: 50,
                overshootClamping: true,
              });
            });
          }
        }}>
        <Text>Add me</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.icon, animatedStyle]} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  middleTopContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    width: 100,
    marginLeft: 200,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 50,
    width: 200,
  },
  icon: {
    position: 'absolute',
    backgroundColor: 'red',
    bottom: 50,
    left: 50,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export default App;
