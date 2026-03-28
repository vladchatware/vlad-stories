import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type GlassVariant = 'thin' | 'regular' | 'strong';

interface GlassSurfaceProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  variant?: GlassVariant;
  radius?: number;
  highlight?: boolean;
}

export function GlassSurface({
  children,
  style,
  contentStyle,
  variant = 'regular',
  radius = 24,
  highlight = true,
}: GlassSurfaceProps) {
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[theme];

  const backgroundColor =
    variant === 'thin'
      ? colors.glassThin
      : variant === 'strong'
        ? colors.glassStrong
        : colors.glassRegular;

  return (
    <View
      style={[
        styles.surface,
        {
          borderRadius: radius,
          backgroundColor,
          borderColor: colors.glassStroke,
          shadowColor: colors.depthShadow,
        },
        style,
      ]}>
      {highlight ? (
        <View
          pointerEvents="none"
          style={[
            styles.highlight,
            {
              borderTopLeftRadius: radius,
              borderTopRightRadius: radius,
              backgroundColor: colors.specularHighlight,
              opacity: variant === 'thin' ? 0.18 : 0.26,
            },
          ]}
        />
      ) : null}
      <View style={contentStyle}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    overflow: 'hidden',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 1,
    shadowRadius: 32,
    elevation: 10,
  },
  highlight: {
    ...StyleSheet.absoluteFillObject,
    bottom: '54%',
  },
});
