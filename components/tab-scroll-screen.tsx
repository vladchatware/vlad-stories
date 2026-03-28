import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Host, ScrollView, VStack, ZStack } from '@expo/ui/swift-ui';
import { background, frame, padding, scrollContentBackground } from '@expo/ui/swift-ui/modifiers';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface TabScrollScreenProps {
  children: ReactNode;
  backgroundColor?: string;
  backgroundDecorations?: ReactNode;
  contentSpacing?: number;
  horizontalPadding?: number;
  topPadding?: number;
  bottomPadding?: number;
}

export function TabScrollScreen({
  children,
  backgroundColor,
  backgroundDecorations,
  contentSpacing = 16,
  horizontalPadding = 16,
  topPadding = 0,
  bottomPadding = 0,
}: TabScrollScreenProps) {
  const insets = useSafeAreaInsets();
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[theme];
  const canvasColor = backgroundColor ?? colors.background;

  return (
    <View style={[styles.container, { backgroundColor: canvasColor }]}>
      <Host useViewportSizeMeasurement colorScheme={theme} style={styles.host}>
        <ZStack alignment="topLeading" modifiers={[background(canvasColor)]}>
          {backgroundDecorations}

          <ScrollView
            showsIndicators={false}
            modifiers={[
              background(backgroundDecorations ? 'transparent' : canvasColor),
              scrollContentBackground('hidden'),
            ]}>
            <VStack
              spacing={contentSpacing}
              alignment="leading"
              modifiers={[
                frame({ maxWidth: Infinity, alignment: 'leading' }),
                padding({
                  top: insets.top + topPadding,
                  bottom: insets.bottom + bottomPadding,
                  horizontal: horizontalPadding,
                }),
              ]}>
              {children}
            </VStack>
          </ScrollView>
        </ZStack>
      </Host>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  host: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
