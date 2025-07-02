import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Filter, Trash2 } from 'lucide-react-native';
import { useTheme } from '../../../hooks/useTheme';

interface FilterState {
  make: string;
  model: string;
  minBid: string;
  maxBid: string;
  favoritesOnly: boolean;
}

interface VehicleFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export const VehicleFilters: React.FC<VehicleFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const { colors, appStyles } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = (key: keyof FilterState, value: string | boolean) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      make: '',
      model: '',
      minBid: '',
      maxBid: '',
      favoritesOnly: false,
    });
  };

  const hasActiveFilters =
    filters.make ||
    filters.model ||
    filters.minBid ||
    filters.maxBid ||
    filters.favoritesOnly;

  return (
    <View style={styles.container}>
      {/* Filter Header */}
      <Pressable
        style={[styles.header, { backgroundColor: colors.background }]}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View style={styles.headerContent}>
          <Filter size={16} color={colors.text} />
          <Text style={[appStyles.body, { marginLeft: 8 }]}>Filters</Text>
          {hasActiveFilters && (
            <View
              style={[
                styles.activeIndicator,
                { backgroundColor: colors.buttonBackground },
              ]}
            />
          )}
        </View>
        {hasActiveFilters && (
          <Pressable onPress={clearFilters} style={styles.clearButton}>
            <Trash2 size={16} style={styles.trashIcon} />
            <Text style={appStyles.body}>Clear filters</Text>
          </Pressable>
        )}
      </Pressable>

      {/* Filter Content */}
      {isExpanded && (
        <View style={[styles.content, { backgroundColor: colors.background }]}>
          {/* Make Filter */}
          <View style={styles.filterGroup}>
            <Text style={[appStyles.body, { marginBottom: 8 }]}>Make</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.secondaryBackground,
                  color: colors.text,
                  borderColor: colors.secondaryText,
                },
              ]}
              value={filters.make}
              onChangeText={text => updateFilter('make', text)}
              placeholder="All makes"
              placeholderTextColor={colors.secondaryText}
            />
          </View>

          <View style={styles.filterGroup}>
            <Text style={[appStyles.body, { marginBottom: 8 }]}>Model</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.secondaryBackground,
                  color: colors.text,
                  borderColor: colors.secondaryText,
                },
              ]}
              value={filters.model}
              onChangeText={text => updateFilter('model', text)}
              placeholder="All models"
              placeholderTextColor={colors.secondaryText}
            />
          </View>

          <View style={styles.filterGroup}>
            <Text style={[appStyles.body, { marginBottom: 8 }]}>
              Starting Bid Range
            </Text>
            <View style={styles.bidRangeContainer}>
              <TextInput
                style={[
                  styles.bidInput,
                  {
                    backgroundColor: colors.secondaryBackground,
                    color: colors.text,
                    borderColor: colors.secondaryText,
                  },
                ]}
                value={filters.minBid}
                onChangeText={text => updateFilter('minBid', text)}
                placeholder="Min"
                placeholderTextColor={colors.secondaryText}
                keyboardType="numeric"
              />
              <Text
                style={[
                  appStyles.body,
                  { color: colors.secondaryText, marginHorizontal: 8 },
                ]}
              >
                to
              </Text>
              <TextInput
                style={[
                  styles.bidInput,
                  {
                    backgroundColor: colors.secondaryBackground,
                    color: colors.text,
                    borderColor: colors.secondaryText,
                  },
                ]}
                value={filters.maxBid}
                onChangeText={text => updateFilter('maxBid', text)}
                placeholder="Max"
                placeholderTextColor={colors.secondaryText}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.filterGroup}>
            <Pressable
              style={styles.favoritesToggle}
              onPress={() =>
                updateFilter('favoritesOnly', !filters.favoritesOnly)
              }
            >
              <View
                style={[
                  styles.checkbox,
                  {
                    backgroundColor: filters.favoritesOnly
                      ? colors.buttonBackground
                      : colors.secondaryBackground,
                    borderColor: colors.secondaryText,
                  },
                ]}
              />
              <Text style={[appStyles.body, { marginLeft: 12 }]}>
                Show favorites only
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  clearButton: {
    flexDirection: 'row',
    padding: 4,
  },
  content: {
    padding: 16,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterGroup: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  bidRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bidInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  favoritesToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
  },
  trashIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
});
