/**
 * The app's tappable button: solid black by default, or a white outlined version
 * with an optional icon for secondary actions like "Sign in with Google".
 */

import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { buttonLabel, colors, opacity, radius, spacing } from '../theme';

/** Any icon name Ionicons knows, e.g. 'logo-google'. */
export type PrimaryButtonIconName = React.ComponentProps<typeof Ionicons>['name'];

/** The button's height, its label size and the icon that can sit beside the label. */
const BUTTON_HEIGHT = 56;
const LABEL_SIZE = 14;
const ICON_SIZE = 18;

/** The 1px outline drawn around the outline variant. */
const BORDER_WIDTH = 1;

type PrimaryButtonProps = {
  /** Button text. The theme uppercases it, so pass it in normal case. */
  label: string;
  onPress: () => void;
  /** 'primary' is the black call to action; 'outline' is white with a black border. */
  variant?: 'primary' | 'outline';
  /** Optional icon to the left of the label. */
  icon?: PrimaryButtonIconName;
  /** Greys the button out and stops it responding to taps. */
  disabled?: boolean;
  /** Layout only — e.g. flex: 1 when two buttons share a row. */
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({
  label,
  onPress,
  variant = 'primary',
  icon,
  disabled = false,
  style,
}: PrimaryButtonProps) {
  const isOutline = variant === 'outline';

  // Icon and label always match, so the icon's colour follows the text colour.
  const contentColor = isOutline ? colors.ink : colors.inkInverse;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isOutline ? styles.outline : styles.primary,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <View style={styles.content}>
        {!!icon && <Ionicons name={icon} size={ICON_SIZE} color={contentColor} />}
        <Text style={[styles.label, { color: contentColor }]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: BUTTON_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.button,
    paddingHorizontal: spacing.lg,
  },
  primary: {
    backgroundColor: colors.ink,
  },
  outline: {
    backgroundColor: colors.surface,
    borderWidth: BORDER_WIDTH,
    borderColor: colors.ink,
  },
  pressed: {
    opacity: opacity.overPhoto,
  },
  disabled: {
    opacity: opacity.inactive,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  label: {
    ...buttonLabel(LABEL_SIZE),
  },
});
