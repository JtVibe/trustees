/**
 * One outlined form input: an icon on the left, an optional show/hide eye on the
 * right for passwords, and a red error message underneath when validation fails.
 */

import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { body, colors, radius, spacing } from '../theme';

/** Any icon name Ionicons knows, e.g. 'person-outline'. */
export type TextFieldIconName = React.ComponentProps<typeof Ionicons>['name'];

/** The icons inside the field, and the height of the field itself. */
const ICON_SIZE = 20;
const FIELD_HEIGHT = 56;

/** Point sizes for the typed text and the error line below it. */
const INPUT_SIZE = 14;
const ERROR_SIZE = 12;

/** The 1px outline drawn around the field. */
const BORDER_WIDTH = 1;

/** Icon names for the two states of the password eye. */
const EYE_SHOWN: TextFieldIconName = 'eye-outline';
const EYE_HIDDEN: TextFieldIconName = 'eye-off-outline';

type TextFieldProps = TextInputProps & {
  /** Outline icon shown on the left, e.g. 'person-outline' or 'lock-closed-outline'. */
  icon: TextFieldIconName;
  /**
   * Hides the typed characters and adds the eye toggle on the right. Use this
   * instead of React Native's own secureTextEntry so the toggle comes with it.
   */
  secure?: boolean;
  /** Red message under the field. Leave undefined while the field is valid. */
  error?: string;
};

export function TextField({ icon, secure = false, error, style, ...inputProps }: TextFieldProps) {
  // Whether the password is currently masked. Starts hidden, and is irrelevant
  // for normal fields, which never render the eye.
  const [hidden, setHidden] = useState(true);

  // Highlights the outline while the user is typing in this field.
  const [focused, setFocused] = useState(false);

  return (
    <View>
      <View style={[styles.field, focused && styles.fieldFocused, !!error && styles.fieldError]}>
        <Ionicons name={icon} size={ICON_SIZE} color={colors.textMuted} />

        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={secure && hidden}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...inputProps}
        />

        {secure && (
          <Ionicons
            name={hidden ? EYE_HIDDEN : EYE_SHOWN}
            size={ICON_SIZE}
            color={colors.textMuted}
            // The icon itself is the tap target — no wrapper Pressable needed.
            onPress={() => setHidden((wasHidden) => !wasHidden)}
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Show password' : 'Hide password'}
          />
        )}
      </View>

      {/* Rendered only when there is something to say, so valid fields keep their spacing. */}
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    height: FIELD_HEIGHT,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.input,
    borderWidth: BORDER_WIDTH,
    borderColor: colors.border,
  },
  fieldFocused: {
    borderColor: colors.ink,
  },
  fieldError: {
    borderColor: colors.error,
  },
  input: {
    // Takes the width left over between the two icons.
    flex: 1,
    ...body(INPUT_SIZE),
    // Typed text is primary content, so it is ink rather than the muted body grey.
    color: colors.ink,
    // Android adds its own padding, which would fight the fixed field height.
    paddingVertical: 0,
  },
  error: {
    ...body(ERROR_SIZE),
    color: colors.error,
    marginTop: spacing.sm,
    marginLeft: spacing.xs,
  },
});
