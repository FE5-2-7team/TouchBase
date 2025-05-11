export interface MessageType {
  userId: string;
  title: string;
  date: string;
}

export interface Sender {
  _id: string;
  fullName: string;
}

export type MessageMode = "write" | "received" | "sent" | "reply";

export interface MessageProps extends Sender {
  mode: MessageMode;
  sender?: Sender;
  receiver?: string;
  seen?: false;
  createdAt?: string;
  content?: string;
  message?: string;
}
