export type MentorMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

export type MentorConversation = {
  id: string;
  userId: string;
  title: string;
  messages: MentorMessage[];
  createdAt: string;
  updatedAt: string;
};

export type MentorConversationSummary = {
  id: string;
  title: string;
  preview: string;
  messageCount: number;
  updatedAt: string;
};
