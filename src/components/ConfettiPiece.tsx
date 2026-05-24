import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming,
  Easing, runOnJS,
} from 'react-native-reanimated';
import { ConfettiItem } from '../hooks/useGameState';

interface Props {
  item: ConfettiItem;
  screenHeight: number;
}

export function ConfettiPiece({ item, screenHeight }: Props) {
  const translateY = useSharedValue(-60);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  useEffect(() => {
    const drift = (Math.random() - 0.5) * 120;
    const duration = 2100 + Math.random() * 1100;

    translateY.value = withTiming(screenHeight + 80, { duration, easing: Easing.in(Easing.quad) });
    translateX.value = withTiming(drift, { duration });
    opacity.value = withTiming(0, { duration: duration * 0.9 });
    scale.value = withTiming(0.2, { duration });
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, { left: `${item.x}%` }, style]}>
      <Text style={styles.emoji}>{item.emoji}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -30,
    zIndex: 999,
    pointerEvents: 'none',
  } as any,
  emoji: {
    fontSize: 28,
  },
});
