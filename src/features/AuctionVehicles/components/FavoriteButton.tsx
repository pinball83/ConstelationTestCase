import { Heart } from 'lucide-react-native';
import { TouchableOpacity, StyleSheet, Pressable } from 'react-native';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const FavoriteButton = ({
  isFavorite,
  onToggleFavorite,
}: FavoriteButtonProps) => {
  return (
    <Pressable
      onPress={e => {
        e.preventDefault();
        onToggleFavorite();
      }}
      style={styles.button}
    >
      <Heart
        style={styles.heart}
        color={isFavorite ? '#EF4444' : '#4B5563'}
        fill={isFavorite ? '#EF4444' : 'none'}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 8,
    borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  heart: {
    width: 20,
    height: 20,
  },
});
