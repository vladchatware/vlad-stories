import { HStack, Spacer } from '@expo/ui/swift-ui';
import { frame } from '@expo/ui/swift-ui/modifiers';
import {
  CHAT_CHROME_SPACING,
  ChatGlassCircleButton,
} from '@/components/chat/chat-chrome';

interface StoryChatHeaderProps {
  colors: {
    text: string;
    glassTint: string;
  };
  onBack: () => void;
}

export function StoryChatHeader({ colors, onBack }: StoryChatHeaderProps) {
  return (
    <HStack spacing={CHAT_CHROME_SPACING} alignment="center" modifiers={[frame({ maxWidth: Infinity, alignment: 'leading' })]}>
      <ChatGlassCircleButton
        icon="chevron.left"
        color={colors.text}
        tint={colors.glassTint}
        onPress={onBack}
      />

      <Spacer />

      <ChatGlassCircleButton
        icon="ellipsis"
        color={colors.text}
        tint={colors.glassTint}
      />
    </HStack>
  );
}
