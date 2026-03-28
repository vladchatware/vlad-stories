import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Host, Rectangle, ScrollView, VStack, ZStack } from '@expo/ui/swift-ui';
import { background, blur, frame, foregroundStyle, opacity, padding, scrollContentBackground } from '@expo/ui/swift-ui/modifiers';

import { ChatComposer } from '@/components/chat/chat-composer';
import { ChatMessageBubble } from '@/components/chat/chat-message-bubble';
import { StoryChatHeader } from '@/components/chat/story-chat-header';
import {
  CHAT_BOTTOM_SCRIM_HEIGHT,
  CHAT_DOCK_BOTTOM_GAP,
  CHAT_HEADER_TOP_INSET,
  CHAT_HEADER_SCROLL_OFFSET,
  CHAT_MESSAGE_STACK_SPACING,
  CHAT_SCREEN_HORIZONTAL_INSET,
  CHAT_SCROLL_BOTTOM_CLEARANCE,
  CHAT_TOP_SCRIM_HEIGHT,
} from '@/components/chat/chat-chrome';
import { ChatMessageSeed, chatAutoReply, chatMessageSeeds } from '@/constants/chat-data';
import { getStoryDetail } from '@/constants/story-details';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface Message extends ChatMessageSeed {
  timestamp: Date;
}

function buildMessages(itemId?: string): Message[] {
  const seeds = chatMessageSeeds[itemId || 'default'] || chatMessageSeeds.default;
  return seeds.map((message) => ({ ...message, timestamp: new Date() }));
}

export default function ChatScreen() {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const router = useRouter();
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const [messages, setMessages] = useState<Message[]>(() => buildMessages(itemId));
  const [inputText, setInputText] = useState('');
  const [inputKey, setInputKey] = useState(0);

  const colors = Colors[theme];
  const story = getStoryDetail(itemId);
  const accentColor = story?.accentColor ?? colors.tint;

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      isUser: true,
      kind: 'text',
      text: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
    setInputKey((prev) => prev + 1);

    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        isUser: false,
        kind: 'reply',
        text: chatAutoReply,
        replyTo: {
          author: 'You',
          text: trimmed,
        },
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, response]);
    }, 500);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.baseCanvas }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Host useViewportSizeMeasurement colorScheme={theme} style={styles.host}>
        <ZStack alignment="bottom" modifiers={[background(colors.baseCanvas)]}>
          <ZStack alignment="top" modifiers={[frame({ maxWidth: Infinity, maxHeight: Infinity, alignment: 'top' })]}>
            <Rectangle
              modifiers={[
                frame({ maxWidth: Infinity, height: CHAT_TOP_SCRIM_HEIGHT }),
                foregroundStyle(
                  theme === 'dark'
                    ? 'rgba(11,16,24,0.14)'
                    : 'rgba(255,255,255,0.20)'
                ),
                blur(44),
                opacity(0.96),
              ]}
            />
            <Rectangle
              modifiers={[
                frame({ maxWidth: Infinity, height: CHAT_TOP_SCRIM_HEIGHT }),
                foregroundStyle({
                  type: 'linearGradient',
                  colors:
                    theme === 'dark'
                      ? ['rgba(11,16,24,0.24)', 'rgba(11,16,24,0.10)', 'rgba(11,16,24,0.02)', 'rgba(11,16,24,0)']
                      : ['rgba(255,255,255,0.34)', 'rgba(255,255,255,0.14)', 'rgba(255,255,255,0.03)', 'rgba(255,255,255,0)'],
                  startPoint: { x: 0.5, y: 0 },
                  endPoint: { x: 0.5, y: 1 },
                }),
              ]}
            />
          </ZStack>

          <ZStack alignment="bottom" modifiers={[frame({ maxWidth: Infinity, maxHeight: Infinity, alignment: 'bottom' })]}>
            <Rectangle
              modifiers={[
                frame({ maxWidth: Infinity, height: CHAT_BOTTOM_SCRIM_HEIGHT }),
                foregroundStyle(
                  theme === 'dark'
                    ? 'rgba(11,16,24,0.16)'
                    : 'rgba(255,255,255,0.24)'
                ),
                blur(48),
                opacity(0.97),
              ]}
            />
            <Rectangle
              modifiers={[
                frame({ maxWidth: Infinity, height: CHAT_BOTTOM_SCRIM_HEIGHT }),
                foregroundStyle({
                  type: 'linearGradient',
                  colors:
                    theme === 'dark'
                      ? ['rgba(11,16,24,0)', 'rgba(11,16,24,0.03)', 'rgba(11,16,24,0.10)', 'rgba(11,16,24,0.20)']
                      : ['rgba(255,255,255,0)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.12)', 'rgba(255,255,255,0.24)'],
                  startPoint: { x: 0.5, y: 0 },
                  endPoint: { x: 0.5, y: 1 },
                }),
              ]}
            />
          </ZStack>

          <ScrollView
            showsIndicators={false}
            modifiers={[
              background('transparent'),
              scrollContentBackground('hidden'),
            ]}>
            <VStack
              spacing={0}
              alignment="leading"
              modifiers={[
                frame({ maxWidth: Infinity, alignment: 'leading' }),
                padding({
                  top: CHAT_HEADER_TOP_INSET + CHAT_HEADER_SCROLL_OFFSET,
                  bottom: CHAT_SCROLL_BOTTOM_CLEARANCE,
                  horizontal: CHAT_SCREEN_HORIZONTAL_INSET,
                }),
              ]}>
              <VStack spacing={CHAT_MESSAGE_STACK_SPACING} alignment="leading" modifiers={[frame({ maxWidth: Infinity, alignment: 'leading' })]}>
                {messages.map((message) => (
                  <ChatMessageBubble
                    key={message.id}
                    kind={message.kind ?? 'text'}
                    text={message.text}
                    isUser={message.isUser}
                    replyTo={message.replyTo}
                    image={message.image}
                    accentColor={accentColor}
                    colors={colors}
                  />
                ))}
              </VStack>
            </VStack>
          </ScrollView>

          <VStack
            spacing={0}
            alignment="leading"
            modifiers={[
              frame({ maxWidth: Infinity, maxHeight: Infinity, alignment: 'top' }),
              padding({
                top: CHAT_HEADER_TOP_INSET,
                horizontal: CHAT_SCREEN_HORIZONTAL_INSET,
              }),
            ]}>
            <StoryChatHeader
              colors={colors}
              onBack={() => router.back()}
            />
          </VStack>

          <VStack
            spacing={0}
            alignment="leading"
            modifiers={[
              frame({ maxWidth: Infinity, maxHeight: Infinity, alignment: 'bottom' }),
              padding({
                horizontal: CHAT_SCREEN_HORIZONTAL_INSET,
                bottom: CHAT_DOCK_BOTTOM_GAP,
              }),
            ]}>
            <ChatComposer
              accentColor={accentColor}
              colors={colors}
              inputKey={inputKey}
              hasInput={inputText.trim().length > 0}
              onChangeText={setInputText}
              onSend={handleSend}
            />
          </VStack>
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
