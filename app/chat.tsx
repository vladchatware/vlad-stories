import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, FlatList, View, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { useState, useRef } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { chatAutoReply, chatMessageSeeds } from '@/constants/chat-data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

function buildMessages(itemId?: string): Message[] {
  const seeds = chatMessageSeeds[itemId || 'default'] || chatMessageSeeds.default;
  return seeds.map((message) => ({ ...message, timestamp: new Date() }));
}

export default function ChatScreen() {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const [messages, setMessages] = useState<Message[]>(() => buildMessages(itemId));
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  
  const colors = Colors[theme];

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: chatAutoReply,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, response]);
    }, 500);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageBubble,
        item.isUser ? styles.userMessage : styles.storyMessage,
        { backgroundColor: item.isUser ? colors.tint : colors.surface },
      ]}>
      <ThemedText style={{ color: item.isUser ? colors.tintContrast : colors.text }}>
        {item.text}
      </ThemedText>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <ThemedView style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
        />
        <View style={[styles.inputContainer, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
          <TextInput
            style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
            placeholder="Type your message..."
            placeholderTextColor={colors.secondaryText}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSend}
          />
          <ThemedText onPress={handleSend} style={[styles.sendButton, { color: colors.tint }]}>Send</ThemedText>
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageList: {
    padding: 16,
    gap: 12,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  storyMessage: {
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 20,
    fontSize: 16,
  },
  sendButton: {
    fontSize: 16,
    fontWeight: '600',
    padding: 8,
  },
});
