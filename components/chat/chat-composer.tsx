import { Button, HStack, Image, TextField } from '@expo/ui/swift-ui';
import { background, buttonStyle, frame, padding, shapes } from '@expo/ui/swift-ui/modifiers';
import {
  CHAT_CHROME_ICON_SIZE,
  CHAT_CHROME_SIZE,
  CHAT_CHROME_SPACING,
  ChatGlassCapsule,
  ChatGlassCircleButton,
} from '@/components/chat/chat-chrome';

interface ChatComposerProps {
  accentColor: string;
  colors: {
    text: string;
    secondaryText: string;
    glassTint: string;
    overlay: string;
    tintContrast: string;
  };
  inputKey: number;
  hasInput: boolean;
  onChangeText: (value: string) => void;
  onSend: () => void;
}

export function ChatComposer({ accentColor, colors, inputKey, hasInput, onChangeText, onSend }: ChatComposerProps) {
  return (
    <HStack spacing={CHAT_CHROME_SPACING} alignment="center" modifiers={[frame({ maxWidth: Infinity, alignment: 'leading' })]}>
      <ChatGlassCircleButton
        icon="plus"
        color={colors.text}
        tint={colors.glassTint}
      />

      <ChatGlassCapsule tint={colors.glassTint} maxWidth="infinity" horizontalPadding={6}>
        <HStack
          spacing={8}
          alignment="center"
          modifiers={[
            frame({ maxWidth: Infinity, height: CHAT_CHROME_SIZE, alignment: 'leading' }),
          ]}>
          <TextField
            key={`chat-composer-${inputKey}`}
            placeholder="Ask anything"
            onSubmit={onSend}
            allowNewlines={false}
            onChangeText={onChangeText}
            modifiers={[
              frame({ maxWidth: Infinity, height: CHAT_CHROME_SIZE, alignment: 'leading' }),
              padding({ horizontal: 12, vertical: 0 }),
            ]}
          />

          <Button
            onPress={onSend}
            modifiers={[
              buttonStyle('plain'),
              frame({ width: CHAT_CHROME_SIZE, height: CHAT_CHROME_SIZE }),
              background(hasInput ? accentColor : colors.text, shapes.capsule()),
            ]}>
            <Image systemName="arrow.up" size={CHAT_CHROME_ICON_SIZE} color={colors.tintContrast} />
          </Button>
        </HStack>
      </ChatGlassCapsule>
    </HStack>
  );
}
