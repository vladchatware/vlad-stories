export interface ChatMessageSeed {
  id: string;
  text: string;
  isUser: boolean;
}

export const chatMessageSeeds: Record<string, ChatMessageSeed[]> = {
  '1': [
    { id: '1', text: "Welcome to the story! Let's begin our adventure...", isUser: false },
    { id: '2', text: "I can't wait to see what happens next!", isUser: true },
  ],
  '2': [
    { id: '1', text: 'Chapter 1: The Beginning', isUser: false },
    { id: '2', text: 'This is so interesting!', isUser: true },
  ],
  default: [{ id: '1', text: 'Welcome to this story!', isUser: false }],
};

export const chatAutoReply = "That's a great response! Let's continue the story...";
