import { ReactNode } from 'react';
import { Button, GlassEffectContainer, HStack, Image } from '@expo/ui/swift-ui';
import { buttonStyle, frame, glassEffect, padding } from '@expo/ui/swift-ui/modifiers';

export const CHAT_CHROME_SIZE = 44;
export const CHAT_CHROME_ICON_SIZE = 16;
export const CHAT_CHROME_SPACING = 10;
export const CHAT_SCREEN_HORIZONTAL_INSET = 14;
export const CHAT_HEADER_TOP_INSET = 8;
export const CHAT_DOCK_BOTTOM_GAP = 8;
export const CHAT_MESSAGE_STACK_SPACING = 14;
export const CHAT_SECTION_SPACING = 22;
export const CHAT_HEADER_SCROLL_OFFSET = CHAT_CHROME_SIZE;
export const CHAT_TOP_SCRIM_HEIGHT = 92;
export const CHAT_BOTTOM_SCRIM_HEIGHT = 96;
export const CHAT_SCROLL_BOTTOM_CLEARANCE = 78;

export function ChatGlassCircleButton({
  icon,
  color,
  tint,
  onPress,
}: {
  icon: string;
  color: string;
  tint: string;
  onPress?: () => void;
}) {
  return (
    <GlassEffectContainer spacing={12}>
      <HStack
        spacing={0}
        alignment="center"
        modifiers={[
          frame({ width: CHAT_CHROME_SIZE, height: CHAT_CHROME_SIZE }),
          glassEffect({
            glass: {
              variant: 'regular',
              tint,
            },
            shape: 'circle',
          }),
        ]}>
        <Button
          onPress={onPress}
          modifiers={[
            buttonStyle('plain'),
            frame({ width: CHAT_CHROME_SIZE, height: CHAT_CHROME_SIZE }),
          ]}>
          <Image systemName={icon as never} size={CHAT_CHROME_ICON_SIZE} color={color} />
        </Button>
      </HStack>
    </GlassEffectContainer>
  );
}

export function ChatGlassCapsule({
  tint,
  children,
  horizontalPadding = 16,
  maxWidth,
}: {
  tint: string;
  children: ReactNode;
  horizontalPadding?: number;
  maxWidth?: number | 'infinity';
}) {
  return (
    <GlassEffectContainer spacing={12}>
      <HStack
        spacing={0}
        alignment="center"
        modifiers={[
          frame({
            maxWidth: maxWidth === 'infinity' ? Infinity : maxWidth,
            height: CHAT_CHROME_SIZE,
            alignment: 'center',
          }),
          padding({ horizontal: horizontalPadding, vertical: 0 }),
          glassEffect({
            glass: {
              variant: 'regular',
              tint,
            },
            shape: 'capsule',
          }),
        ]}>
        {children}
      </HStack>
    </GlassEffectContainer>
  );
}
