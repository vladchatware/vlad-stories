export type ChatMessageKind = 'system' | 'text' | 'reply' | 'image';

export interface ChatReplyPreview {
  author: string;
  text: string;
}

export interface ChatImageAttachment {
  title: string;
  subtitle?: string;
  symbol?: string;
  colors: [string, string];
}

export interface ChatMessageSeed {
  id: string;
  isUser: boolean;
  kind?: ChatMessageKind;
  text?: string;
  replyTo?: ChatReplyPreview;
  image?: ChatImageAttachment;
}

export const chatMessageSeeds: Record<string, ChatMessageSeed[]> = {
  '1': [
    { id: '1', kind: 'system', text: 'Tonight, 8:42 PM', isUser: false },
    {
      id: '2',
      kind: 'text',
      text: "Welcome to the story. The estate is quiet, but the lights in Vlad's study are still on.",
      isUser: false,
    },
    {
      id: '3',
      kind: 'image',
      text: 'A photo was left open on the desk.',
      image: {
        title: 'Winter Estate',
        subtitle: 'Study window facing the orchard',
        symbol: 'photo',
        colors: ['#394255', '#BDA38E'],
      },
      isUser: false,
    },
    {
      id: '4',
      kind: 'reply',
      text: "I can't wait to see what happens next.",
      replyTo: {
        author: 'Story',
        text: 'The lights in Vlad’s study are still on.',
      },
      isUser: true,
    },
  ],
  '2': [
    { id: '1', kind: 'system', text: 'Chapter 1: The Beginning', isUser: false },
    {
      id: '2',
      kind: 'text',
      text: 'The hallway smells like rain and cedar. Vlad stops at the locked door and waits for your answer.',
      isUser: false,
    },
    {
      id: '3',
      kind: 'reply',
      text: 'Tell him to open it. This is too interesting to back away now.',
      replyTo: {
        author: 'Story',
        text: 'Vlad stops at the locked door and waits for your answer.',
      },
      isUser: true,
    },
    {
      id: '4',
      kind: 'image',
      text: 'He sends you what he sees through the cracked glass.',
      image: {
        title: 'Behind the Door',
        subtitle: 'Dust, blue light, and a torn portrait',
        symbol: 'sparkles.tv',
        colors: ['#202C48', '#6F8FDB'],
      },
      isUser: false,
    },
  ],
  default: [
    { id: '1', kind: 'system', text: 'New conversation', isUser: false },
    { id: '2', kind: 'text', text: 'Welcome to this story.', isUser: false },
  ],
};

export const chatAutoReply = "That's a great response. Let's keep going.";
