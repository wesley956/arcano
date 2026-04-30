import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Food } from '@/types/game';
import { elementColors } from '@/constants/colors';

export function FoodOffering({ food, onOffer }: { food: Food; onOffer: (food: Food) => void }) {
  return (
    <Pressable onPress={() => onOffer(food)} style={({ pressed }) => [styles.card, pressed && styles.pressed, { borderColor: elementColors[food.affinity] }] }>
      <View style={[styles.orb, { backgroundColor: elementColors[food.affinity] }]} />
      <Text style={styles.name}>{food.name}</Text>
      <Text style={styles.description}>{food.description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    minHeight: 162,
    borderRadius: 26,
    padding: 14,
    borderWidth: 1,
    backgroundColor: 'rgba(248,241,231,0.07)',
    marginBottom: 12
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.88
  },
  orb: {
    width: 38,
    height: 38,
    borderRadius: 24,
    marginBottom: 10,
    opacity: 0.88
  },
  name: {
    color: '#F8F1E7',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 6
  },
  description: {
    color: '#C8B8A0',
    fontSize: 12,
    lineHeight: 17
  }
});
