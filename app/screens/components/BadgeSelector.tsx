import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface BadgeSelectorProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const BadgeSelector: React.FC<BadgeSelectorProps> = ({ selectedValue, onValueChange }) => {
  const options = [
    { label: 'All', value: '' },
    { label: 'Movie', value: 'movie' },
    { label: 'Series', value: 'series' },
    { label: 'Episode', value: 'episode' },
  ];

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[styles.badge, selectedValue === option.value && styles.selectedBadge]}
          onPress={() => onValueChange(option.value)}
        >
          <Text style={styles.badgeText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    gap: 15,
  },
  badge: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  selectedBadge: {
    backgroundColor: '#6200ee',
  },
  badgeText: {
    color: '#fff',
  },
});

export default BadgeSelector;