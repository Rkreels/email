// Types for the Gmail application

export type EmailAttachment = {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
};

export type Email = {
  id: string;
  from: {
    name: string;
    email: string;
    avatar?: string;
  };
  to: {
    name: string;
    email: string;
    avatar?: string;
  };
  subject: string;
  message: string;
  time: string;
  labels: string[];
  read: boolean;
  starred: boolean;
  important: boolean;
  attachments?: EmailAttachment[];
  thread?: Email[];
  folder?: string;
};

export type Folder = {
  id: string;
  name: string;
  icon: React.ElementType;
  count?: number;
};

export type EmailLabel = {
  id: string;
  name: string;
  color: string;
};

export type User = {
  name: string;
  email: string;
  avatar?: string;
};
