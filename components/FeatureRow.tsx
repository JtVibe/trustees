/**
 * One row of a feature list: a black circle with a white outline icon, then a bold
 * title and a muted description. Used by onboarding slides 2 and 3.
 */

import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { body, colors, heading, radius, spacing } from '../theme';

/** Any icon name Ionicons knows, e.g. 'sparkles-outline'. */
export type FeatureIconName = React.ComponentProps<typeof Ionicons>['name'];

/** The circle's diameter, and the icon sitting inside it. */
const CIRCLE_SIZE = 44;
const ICON_SIZE = 20;

/** Point sizes for this row's two lines of text. */
const TITLE_SIZE = 14;
const DESCRIPTION_SIZE = 12;

/** The hairline rule drawn between rows. */
const DIVIDER_WIDTH = 1;

type FeatureRowProps = {
  /** Outline icon shown in the black circle. */
  icon: FeatureIconName;
  /** Bold first line, e.g. 'Curated Collections'. */
  title: string;
  /** Muted second line, roughly two lines long. */
  description: string;
  /**
   * Draws the 1px rule above this row. The caller passes false for the first row
   * in a list, so the list is separated rather than boxed in.
   */
  showDivider?: boolean;
};

export function FeatureRow({ icon, title, description, showDivider = true }: FeatureRowProps) {
  return (
    <View style={[styles.row, showDivider && styles.rowDivided]}>
      <View style={styles.circle}>
        <Ionicons name={icon} size={ICON_SIZE} color={colors.inkInverse} />
      </View>

      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  rowDivided: {
    borderTopWidth: DIVIDER_WIDTH,
    borderTopColor: colors.border,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    // Takes the leftover width so long descriptions wrap instead of overflowing.
    flex: 1,
  },
  title: {
    ...heading(TITLE_SIZE),
  },
  description: {
    ...body(DESCRIPTION_SIZE),
    marginTop: spacing.xs,
  },
});
