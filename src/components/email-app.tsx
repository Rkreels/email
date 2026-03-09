"use client";

import type * as React from "react";
import { useState, useMemo } from "react";
import {
  Archive,
  ArrowLeft,
  Bell,
  Check,
  ChevronDown,
  Command,
  File,
  FileText,
  Forward,
  Inbox,
  ListFilter,
  MailOpen,
  MailX,
  Paperclip,
  PenLine,
  Plus,
  Reply,
  Search,
  Send,
  Settings,
  ShoppingCart,
  Smile,
  Star,
  Tag,
  Trash2,
  User,
  Users,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  X,
  Menu,
  RefreshCw,
  Link2,
  ImageIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { initialEmails } from "./emails-data";

// Types
type Folder = {
  id: string;
  name: string;
  icon: React.ElementType;
  count?: number;
};

type EmailLabel = {
  id: string;
  name: string;
  color: string;
};

type EmailAttachment = {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
};

type Email = {
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

type User = {
  name: string;
  email: string;
  avatar?: string;
};

// Mock data
const currentUser: User = {
  name: "Alex Morgan",
  email: "alex@example.com",
  avatar: "/placeholder.svg?height=40&width=40",
};

const folders: Folder[] = [
  { id: "inbox", name: "Inbox", icon: Inbox, count: 50 },
  { id: "drafts", name: "Drafts", icon: File, count: 5 },
  { id: "sent", name: "Sent", icon: Send },
  { id: "starred", name: "Starred", icon: Star, count: 15 },
  { id: "trash", name: "Trash", icon: Trash2 },
  { id: "archive", name: "Archive", icon: Archive },
];

const categories: Folder[] = [
  { id: "social", name: "Social", icon: Users, count: 8 },
  { id: "updates", name: "Updates", icon: Bell, count: 12 },
  { id: "forums", name: "Forums", icon: Command, count: 5 },
  { id: "promotions", name: "Promotions", icon: Tag, count: 7 },
  { id: "shopping", name: "Shopping", icon: ShoppingCart, count: 3 },
];

const labels: EmailLabel[] = [
  { id: "work", name: "Work", color: "bg-blue-500" },
  { id: "personal", name: "Personal", color: "bg-green-500" },
  { id: "important", name: "Important", color: "bg-red-500" },
  { id: "travel", name: "Travel", color: "bg-amber-500" },
  { id: "meeting", name: "Meeting", color: "bg-purple-500" },
  { id: "finance", name: "Finance", color: "bg-emerald-500" },
  { id: "project", name: "Project", color: "bg-indigo-500" },
];

const attachments: EmailAttachment[] = [
  {
    id: "1",
    name: "Q4_Financial_Report.pdf",
    size: "2.4 MB",
    type: "pdf",
    url: "#",
  },
  {
    id: "2",
    name: "Project_Timeline.xlsx",
    size: "1.8 MB",
    type: "xlsx",
    url: "#",
  },
  {
    id: "3",
    name: "Team_Photo.jpg",
    size: "3.2 MB",
    type: "jpg",
    url: "#",
  },
  {
    id: "4",
    name: "Meeting_Notes.docx",
    size: "156 KB",
    type: "docx",
    url: "#",
  },
  {
    id: "5",
    name: "Budget_2024.xlsx",
    size: "890 KB",
    type: "xlsx",
    url: "#",
  },
];

// Utility functions
function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

function getFileIcon(type: string) {
  switch (type) {
    case "pdf":
      return FileText;
    case "xlsx":
    case "xls":
    case "csv":
      return FileText;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return FileText;
    default:
      return File;
  }
}

// LogOut icon component
function LogOutIcon(props: React.ComponentProps<typeof ArrowLeft>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

// Download icon component
function DownloadIcon(props: React.ComponentProps<typeof ArrowLeft>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

// Main component
export function GmailApp() {
  // State
  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const [selectedFolder, setSelectedFolder] = useState<string>("inbox");
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [composeData, setComposeData] = useState({
    to: "",
    cc: "",
    bcc: "",
    subject: "",
    message: "",
  });
  const [showCcBcc, setShowCcBcc] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Settings state
  const [settings, setSettings] = useState({
    theme: "light" as "light" | "dark" | "system",
    density: "comfortable" as "comfortable" | "compact",
    conversationView: true,
    autoExpand: true,
    desktopNotifications: false,
    signature: "Best,\nAlex",
  });

  // Filter emails based on selected folder and search query
  const filteredEmails = useMemo(() => {
    return emails.filter((email) => {
      const matchesSearch =
        searchQuery === "" ||
        email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.from.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.message.toLowerCase().includes(searchQuery.toLowerCase());

      const emailFolder = email.folder || "inbox";
      
      if (selectedFolder === "inbox") return emailFolder === "inbox" && matchesSearch;
      if (selectedFolder === "starred") return email.starred && matchesSearch;
      if (selectedFolder === "sent") return emailFolder === "sent" && matchesSearch;
      if (selectedFolder === "drafts") return emailFolder === "drafts" && matchesSearch;
      if (selectedFolder === "trash") return emailFolder === "trash" && matchesSearch;
      if (selectedFolder === "archive") return emailFolder === "archive" && matchesSearch;

      // Categories
      if (selectedFolder === "social")
        return email.labels.includes("personal") && matchesSearch;
      if (selectedFolder === "updates")
        return email.labels.includes("work") && matchesSearch;
      if (selectedFolder === "forums")
        return email.labels.includes("project") && matchesSearch;
      if (selectedFolder === "promotions")
        return email.labels.includes("finance") && matchesSearch;
      if (selectedFolder === "shopping")
        return email.labels.includes("travel") && matchesSearch;

      return matchesSearch;
    });
  }, [emails, selectedFolder, searchQuery]);

  // Find current email index and navigate
  const navigateEmail = (direction: "next" | "prev") => {
    if (!selectedEmail) return;
    
    const currentIndex = filteredEmails.findIndex(e => e.id === selectedEmail.id);
    if (currentIndex === -1) return;
    
    // next = newer email (lower index), prev = older email (higher index)
    let newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (newIndex >= 0 && newIndex < filteredEmails.length) {
      setSelectedEmail(filteredEmails[newIndex]);
    }
  };

  const handleSelectAllEmails = () => {
    if (selectedEmails.length === filteredEmails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(filteredEmails.map((email) => email.id));
    }
  };

  const handleSelectEmail = (emailId: string) => {
    if (selectedEmails.includes(emailId)) {
      setSelectedEmails(selectedEmails.filter((id) => id !== emailId));
    } else {
      setSelectedEmails([...selectedEmails, emailId]);
    }
  };

  const handleStarEmail = (emailId: string, event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === emailId ? { ...email, starred: !email.starred } : email
      )
    );
  };

  const handleDeleteEmails = (emailIds?: string[]) => {
    const idsToDelete = emailIds || selectedEmails;
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        idsToDelete.includes(email.id)
          ? { ...email, folder: "trash" }
          : email
      )
    );
    setSelectedEmails([]);
    if (selectedEmail && idsToDelete.includes(selectedEmail.id)) {
      setSelectedEmail(null);
    }
  };

  const handleArchiveEmails = (emailIds?: string[]) => {
    const idsToArchive = emailIds || selectedEmails;
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        idsToArchive.includes(email.id)
          ? { ...email, folder: "archive" }
          : email
      )
    );
    setSelectedEmails([]);
    if (selectedEmail && idsToArchive.includes(selectedEmail.id)) {
      setSelectedEmail(null);
    }
  };

  const handleMarkAsRead = (emailIds?: string[]) => {
    // If no emailIds provided, mark ALL filtered emails as read
    const idsToMark = emailIds || filteredEmails.map((email) => email.id);
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        idsToMark.includes(email.id) ? { ...email, read: true } : email
      )
    );
    setSelectedEmails([]);
  };

  const handleMarkAsUnread = (emailIds?: string[]) => {
    const idsToMark = emailIds || selectedEmails;
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        idsToMark.includes(email.id) ? { ...email, read: false } : email
      )
    );
    setSelectedEmails([]);
  };

  const handleReply = (email: Email) => {
    setComposeData({
      to: email.from.email,
      cc: "",
      bcc: "",
      subject: `Re: ${email.subject}`,
      message: `\n\n-------- Original Message --------\nFrom: ${email.from.name} <${email.from.email}>\nDate: ${email.time}\nSubject: ${email.subject}\n\n${email.message}`,
    });
    setIsComposeOpen(true);
  };

  const handleForward = (email: Email) => {
    setComposeData({
      to: "",
      cc: "",
      bcc: "",
      subject: `Fwd: ${email.subject}`,
      message: `\n\n-------- Forwarded Message --------\nFrom: ${email.from.name} <${email.from.email}>\nDate: ${email.time}\nSubject: ${email.subject}\n\n${email.message}`,
    });
    setIsComposeOpen(true);
  };

  const handleCompose = () => {
    setComposeData({
      to: "",
      cc: "",
      bcc: "",
      subject: "",
      message: "",
    });
    setShowCcBcc(false);
    setIsComposeOpen(true);
  };

  const handleSendEmail = () => {
    const newEmail: Email = {
      id: Date.now().toString(),
      from: {
        name: currentUser.name,
        email: currentUser.email,
        avatar: currentUser.avatar,
      },
      to: {
        name: composeData.to.split("<")[0].trim() || composeData.to,
        email: composeData.to.includes("<") 
          ? composeData.to.match(/<(.+)>/)?.[1] || composeData.to
          : composeData.to,
      },
      subject: composeData.subject,
      message: composeData.message,
      time: "Just now",
      labels: [],
      read: true,
      starred: false,
      important: false,
      folder: "sent",
    };
    
    setEmails((prevEmails) => [newEmail, ...prevEmails]);
    setIsComposeOpen(false);
    setComposeData({
      to: "",
      cc: "",
      bcc: "",
      subject: "",
      message: "",
    });
  };

  const handleSaveDraft = () => {
    const draftEmail: Email = {
      id: Date.now().toString(),
      from: {
        name: currentUser.name,
        email: currentUser.email,
        avatar: currentUser.avatar,
      },
      to: {
        name: composeData.to || "",
        email: composeData.to || "",
      },
      subject: composeData.subject || "(No subject)",
      message: composeData.message,
      time: "Just now",
      labels: [],
      read: true,
      starred: false,
      important: false,
      folder: "drafts",
    };
    
    setEmails((prevEmails) => [draftEmail, ...prevEmails]);
    setIsComposeOpen(false);
    setComposeData({
      to: "",
      cc: "",
      bcc: "",
      subject: "",
      message: "",
    });
  };

  // Mark email as read when opened
  const handleEmailClick = (email: Email) => {
    if (!email.read) {
      setEmails((prevEmails) =>
        prevEmails.map((e) =>
          e.id === email.id ? { ...e, read: true } : e
        )
      );
    }
    setSelectedEmail(email);
  };

  return (
    <TooltipProvider>
      <div className="flex h-screen w-full flex-col overflow-hidden bg-white">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full text-gray-500 hover:bg-gray-100 lg:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
            <div className="flex items-center">
              <svg
                viewBox="0 0 75 24"
                width="75"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-[24px] w-[75px]"
              >
                <g id="qaEJec">
                  <path
                    fill="#ea4335"
                    d="M67.954 16.303c-1.33 0-2.278-.608-2.886-1.804l7.967-3.3-.27-.68c-.495-1.33-2.008-3.79-5.102-3.79-3.068 0-5.622 2.41-5.622 5.96 0 3.34 2.53 5.96 5.92 5.96 2.73 0 4.31-1.67 4.97-2.64l-2.03-1.35c-.673.98-1.6 1.64-2.93 1.64zm-.203-7.27c1.04 0 1.92.52 2.21 1.264l-5.32 2.21c-.06-2.3 1.79-3.474 3.12-3.474z"
                  ></path>
                </g>
                <g id="YGlOvc">
                  <path
                    fill="#34a853"
                    d="M58.193.67h2.564v17.44h-2.564z"
                  ></path>
                </g>
                <g id="BWfIk">
                  <path
                    fill="#4285f4"
                    d="M54.152 8.066h-.088c-.588-.697-1.716-1.33-3.136-1.33-2.98 0-5.71 2.614-5.71 5.98 0 3.338 2.73 5.933 5.71 5.933 1.42 0 2.548-.64 3.136-1.36h.088v.86c0 2.28-1.217 3.5-3.183 3.5-1.61 0-2.6-1.15-3-2.12l-2.28.94c.65 1.58 2.39 3.52 5.28 3.52 3.06 0 5.66-1.807 5.66-6.206V7.21h-2.48v.858zm-3.006 8.237c-1.804 0-3.318-1.513-3.318-3.588 0-2.1 1.514-3.635 3.318-3.635 1.784 0 3.183 1.534 3.183 3.635 0 2.075-1.4 3.588-3.19 3.588z"
                  ></path>
                </g>
                <g id="e6m3fd">
                  <path
                    fill="#fbbc05"
                    d="M38.17 6.735c-3.28 0-5.953 2.506-5.953 5.96 0 3.432 2.673 5.96 5.954 5.96 3.29 0 5.96-2.528 5.96-5.96 0-3.46-2.67-5.96-5.95-5.96zm0 9.568c-1.798 0-3.348-1.487-3.348-3.61 0-2.14 1.55-3.608 3.35-3.608s3.348 1.467 3.348 3.61c0 2.116-1.55 3.608-3.35 3.608z"
                  ></path>
                </g>
                <g id="vbkDmc">
                  <path
                    fill="#ea4335"
                    d="M25.17 6.71c-3.28 0-5.954 2.505-5.954 5.958 0 3.433 2.673 5.96 5.954 5.96 3.282 0 5.955-2.527 5.955-5.96 0-3.453-2.673-5.96-5.955-5.96zm0 9.567c-1.8 0-3.35-1.487-3.35-3.61 0-2.14 1.55-3.608 3.35-3.608s3.35 1.46 3.35 3.6c0 2.12-1.55 3.61-3.35 3.61z"
                  ></path>
                </g>
                <g id="idEJde">
                  <path
                    fill="#4285f4"
                    d="M14.11 14.182c.722-.723 1.205-1.78 1.387-3.334H9.423V8.373h8.518c.09.452.16 1.07.16 1.664 0 1.903-.52 4.26-2.19 5.934-1.63 1.7-3.71 2.61-6.48 2.61-5.12 0-9.42-4.17-9.42-9.29C0 4.17 4.31 0 9.43 0c2.83 0 4.843 1.108 6.362 2.56L14 4.347c-1.087-1.02-2.56-1.81-4.577-1.81-3.74 0-6.662 3.01-6.662 6.75s2.93 6.75 6.67 6.75c2.43 0 3.81-.972 4.69-1.856z"
                  ></path>
                </g>
              </svg>
              <span className="ml-2 text-xl font-normal text-gray-600">
                Gmail
              </span>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative mx-4 flex-1 max-w-2xl">
            <div className="flex h-12 items-center rounded-lg bg-gray-100 px-4 hover:bg-white hover:shadow-md focus-within:bg-white focus-within:shadow-md">
              <Search className="mr-2 h-5 w-5 text-gray-500" />
              <Input
                placeholder="Search mail"
                className="h-full border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto h-8 w-8 text-gray-500"
              >
                <ListFilter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full text-gray-500 hover:bg-gray-100"
                  onClick={() => setIsSettingsOpen(true)}
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={currentUser.avatar || "/placeholder.svg"}
                      alt={currentUser.name}
                    />
                    <AvatarFallback>
                      {getInitials(currentUser.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={currentUser.avatar || "/placeholder.svg"}
                      alt={currentUser.name}
                    />
                    <AvatarFallback>
                      {getInitials(currentUser.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{currentUser.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {currentUser.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Manage your Google Account</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div
            className={cn(
              "flex w-64 flex-shrink-0 flex-col bg-white transition-all duration-300 ease-in-out",
              isCollapsed && "w-20"
            )}
          >
            {/* Compose button */}
            <div className="p-4">
              <Button
                onClick={handleCompose}
                className="flex h-14 w-full items-center justify-start gap-3 rounded-2xl bg-[#c2e7ff] px-6 py-4 text-gray-800 hover:bg-[#b4deff] hover:shadow-md"
              >
                <PenLine className="h-5 w-5" />
                {!isCollapsed && <span className="font-medium">Compose</span>}
              </Button>
            </div>

            <ScrollArea className="flex-1">
              <div className="px-2 py-1">
                <div className="space-y-1">
                  {folders.map((folder) => (
                    <Button
                      key={folder.id}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start rounded-r-full px-6 py-2 font-normal",
                        selectedFolder === folder.id
                          ? "bg-[#d3e3fd] font-medium text-[#041e49] hover:bg-[#d3e3fd]"
                          : "text-gray-700",
                        isCollapsed && "justify-center px-2"
                      )}
                      onClick={() => {
                        setSelectedFolder(folder.id);
                        setSelectedEmail(null);
                        setSelectedEmails([]);
                      }}
                    >
                      <folder.icon
                        className={cn(
                          "h-5 w-5",
                          selectedFolder === folder.id
                            ? "text-[#041e49]"
                            : "text-gray-700"
                        )}
                      />
                      {!isCollapsed && (
                        <>
                          <span className="ml-4">{folder.name}</span>
                          {folder.count !== undefined && folder.count > 0 && (
                            <span
                              className={cn(
                                "ml-auto text-sm",
                                selectedFolder === folder.id
                                  ? "text-[#041e49]"
                                  : "text-gray-500"
                              )}
                            >
                              {folder.count}
                            </span>
                          )}
                        </>
                      )}
                    </Button>
                  ))}
                </div>

                <Separator className="my-3 bg-gray-200" />

                <div className="space-y-1">
                  <h3
                    className={cn(
                      "mb-1 px-6 text-sm font-medium text-gray-500",
                      isCollapsed && "sr-only"
                    )}
                  >
                    Categories
                  </h3>
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start rounded-r-full px-6 py-2 font-normal",
                        selectedFolder === category.id
                          ? "bg-[#d3e3fd] font-medium text-[#041e49] hover:bg-[#d3e3fd]"
                          : "text-gray-700",
                        isCollapsed && "justify-center px-2"
                      )}
                      onClick={() => {
                        setSelectedFolder(category.id);
                        setSelectedEmail(null);
                        setSelectedEmails([]);
                      }}
                    >
                      <category.icon
                        className={cn(
                          "h-5 w-5",
                          selectedFolder === category.id
                            ? "text-[#041e49]"
                            : "text-gray-700"
                        )}
                      />
                      {!isCollapsed && (
                        <>
                          <span className="ml-4">{category.name}</span>
                          {category.count !== undefined && category.count > 0 && (
                            <span
                              className={cn(
                                "ml-auto text-sm",
                                selectedFolder === category.id
                                  ? "text-[#041e49]"
                                  : "text-gray-500"
                              )}
                            >
                              {category.count}
                            </span>
                          )}
                        </>
                      )}
                    </Button>
                  ))}
                </div>

                <Separator className="my-3 bg-gray-200" />

                <div className="space-y-1">
                  <div className="flex items-center justify-between px-6">
                    <h3
                      className={cn(
                        "text-sm font-medium text-gray-500",
                        isCollapsed && "sr-only"
                      )}
                    >
                      Labels
                    </h3>
                    {!isCollapsed && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 text-gray-500"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  {labels.map((label) => (
                    <Button
                      key={label.id}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start rounded-r-full px-6 py-2 font-normal text-gray-700",
                        isCollapsed && "justify-center px-2"
                      )}
                    >
                      <div className={`h-3 w-3 rounded-full ${label.color}`} />
                      {!isCollapsed && (
                        <span className="ml-4">{label.name}</span>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            </ScrollArea>

            <div className="p-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full text-gray-500"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? (
                  <ChevronRight className="h-5 w-5" />
                ) : (
                  <ChevronLeft className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Email list toolbar */}
            <div className="flex items-center border-b border-gray-200 px-4 py-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={
                    selectedEmails.length > 0 &&
                    selectedEmails.length === filteredEmails.length
                  }
                  onCheckedChange={handleSelectAllEmails}
                  className="h-4 w-4 rounded-sm border-gray-400"
                  aria-label="Select all"
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full text-gray-500"
                      onClick={() => {
                        // Refresh functionality - could trigger a refetch in a real app
                        setEmails([...emails]);
                      }}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Refresh</TooltipContent>
                </Tooltip>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full text-gray-500"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => handleMarkAsRead(filteredEmails.map(e => e.id))}>
                      <Check className="mr-2 h-4 w-4" />
                      <span>Mark all as read</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedEmails(filteredEmails.map(e => e.id))}>
                      <Check className="mr-2 h-4 w-4" />
                      <span>Select all</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Selection action toolbar */}
              {selectedEmails.length > 0 && (
                <div className="ml-4 flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-gray-500"
                        onClick={() => handleArchiveEmails()}
                      >
                        <Archive className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Archive</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-gray-500"
                        onClick={() => handleDeleteEmails()}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-gray-500"
                        onClick={() => handleMarkAsRead()}
                      >
                        <MailOpen className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Mark as read</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-gray-500"
                        onClick={() => handleMarkAsUnread()}
                      >
                        <MailX className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Mark as unread</TooltipContent>
                  </Tooltip>
                </div>
              )}
            </div>

            {/* Email list or Email view - conditional rendering without absolute positioning */}
            {!selectedEmail ? (
              /* Email list view */
              <ScrollArea className="flex-1">
                <div className="divide-y divide-gray-100">
                  {filteredEmails.length > 0 ? (
                    filteredEmails.map((email) => (
                      <ContextMenu key={email.id}>
                        <ContextMenuTrigger asChild>
                          <div
                            className={cn(
                              "flex cursor-pointer items-center gap-3 px-4 py-2 hover:shadow-md",
                              !email.read && "bg-[#f2f6fc]",
                              selectedEmails.includes(email.id) && "bg-[#c2dbff]"
                            )}
                            onClick={() => handleEmailClick(email)}
                          >
                            <div className="flex items-center gap-3">
                              <Checkbox
                                checked={selectedEmails.includes(email.id)}
                                onCheckedChange={() =>
                                  handleSelectEmail(email.id)
                                }
                                onClick={(e) => e.stopPropagation()}
                                className="h-4 w-4 rounded-sm border-gray-400"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className={cn(
                                  "h-6 w-6 rounded-full p-0",
                                  email.starred && "text-amber-500"
                                )}
                                onClick={(e) => handleStarEmail(email.id, e)}
                              >
                                <Star
                                  className={cn(
                                    "h-4 w-4",
                                    email.starred && "fill-amber-500"
                                  )}
                                />
                                <span className="sr-only">Star</span>
                              </Button>
                            </div>

                            <div className="flex flex-1 items-center gap-3 overflow-hidden py-1">
                              <div className="w-44 flex-shrink-0 truncate font-medium">
                                {email.from.name}
                              </div>
                              <div className="flex flex-1 items-center gap-2 overflow-hidden">
                                <span
                                  className={cn(
                                    "truncate",
                                    !email.read && "font-bold"
                                  )}
                                >
                                  {email.subject}
                                </span>
                                <span className="truncate text-sm text-gray-500">
                                  - {email.message.split("\n")[0]}
                                </span>
                              </div>
                              <div className="ml-auto flex items-center gap-2">
                                {email.labels.length > 0 && (
                                  <div className="flex gap-1">
                                    {email.labels.slice(0, 2).map((labelId) => {
                                      const label = labels.find(
                                        (l) => l.id === labelId
                                      );
                                      return (
                                        <div
                                          key={labelId}
                                          className={`h-2 w-2 rounded-full ${
                                            label?.color || "bg-gray-400"
                                          }`}
                                        />
                                      );
                                    })}
                                  </div>
                                )}
                                {email.attachments &&
                                  email.attachments.length > 0 && (
                                    <Paperclip className="h-4 w-4 text-gray-400" />
                                  )}
                                <span className="whitespace-nowrap text-xs text-gray-500">
                                  {email.time}
                                </span>
                              </div>
                            </div>
                          </div>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                          <ContextMenuItem onClick={() => handleEmailClick(email)}>
                            <MailOpen className="mr-2 h-4 w-4" />
                            <span>Open</span>
                          </ContextMenuItem>
                          <ContextMenuItem onClick={() => handleReply(email)}>
                            <Reply className="mr-2 h-4 w-4" />
                            <span>Reply</span>
                          </ContextMenuItem>
                          <ContextMenuItem onClick={() => handleForward(email)}>
                            <Forward className="mr-2 h-4 w-4" />
                            <span>Forward</span>
                          </ContextMenuItem>
                          <ContextMenuSeparator />
                          <ContextMenuItem onClick={() => handleStarEmail(email.id)}>
                            <Star className="mr-2 h-4 w-4" />
                            <span>{email.starred ? "Unstar" : "Star"}</span>
                          </ContextMenuItem>
                          <ContextMenuItem onClick={() => handleSelectEmail(email.id)}>
                            <Check className="mr-2 h-4 w-4" />
                            <span>
                              {selectedEmails.includes(email.id)
                                ? "Deselect"
                                : "Select"}
                            </span>
                          </ContextMenuItem>
                          <ContextMenuSeparator />
                          <ContextMenuItem
                            onClick={() => {
                              handleArchiveEmails([email.id]);
                            }}
                          >
                            <Archive className="mr-2 h-4 w-4" />
                            <span>Archive</span>
                          </ContextMenuItem>
                          <ContextMenuItem
                            onClick={() => {
                              handleDeleteEmails([email.id]);
                            }}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="rounded-full bg-gray-100 p-3">
                        <Inbox className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="mt-4 text-lg font-medium">
                        No emails found
                      </h3>
                      <p className="mt-2 text-center text-sm text-gray-500">
                        {searchQuery
                          ? "Try a different search term"
                          : "Your inbox is empty"}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            ) : (
              /* Email detail view */
              <div className="flex flex-1 flex-col overflow-hidden">
                {/* Email toolbar */}
                <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full text-gray-500"
                          onClick={() => setSelectedEmail(null)}
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Back</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full text-gray-500"
                          onClick={() => handleArchiveEmails([selectedEmail.id])}
                        >
                          <Archive className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Archive</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full text-gray-500"
                          onClick={() => handleDeleteEmails([selectedEmail.id])}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full text-gray-500"
                          onClick={() => handleMarkAsUnread([selectedEmail.id])}
                        >
                          <MailX className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Mark as unread</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={cn(
                            "h-8 w-8 rounded-full",
                            selectedEmail.starred && "text-amber-500"
                          )}
                          onClick={(e) =>
                            handleStarEmail(selectedEmail.id, e)
                          }
                        >
                          <Star
                            className={cn(
                              "h-4 w-4",
                              selectedEmail.starred && "fill-amber-500"
                            )}
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {selectedEmail.starred ? "Unstar" : "Star"}
                      </TooltipContent>
                    </Tooltip>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full text-gray-500"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={() => handleReply(selectedEmail)}>
                          <Reply className="mr-2 h-4 w-4" />
                          <span>Reply</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleForward(selectedEmail)}>
                          <Forward className="mr-2 h-4 w-4" />
                          <span>Forward</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-gray-500"
                      onClick={() => navigateEmail("next")}
                      disabled={!selectedEmail || filteredEmails.findIndex(e => e.id === selectedEmail.id) === 0}
                    >
                      <ChevronLeft className="mr-1 h-4 w-4" />
                      Newer
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-gray-500"
                      onClick={() => navigateEmail("prev")}
                      disabled={!selectedEmail || filteredEmails.findIndex(e => e.id === selectedEmail.id) === filteredEmails.length - 1}
                    >
                      Older
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Email content */}
                <ScrollArea className="flex-1">
                  <div className="p-6">
                    <div className="mb-6">
                      <h1 className="text-2xl font-normal text-gray-800">
                        {selectedEmail.subject}
                      </h1>
                      <div className="mt-4 flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={
                                selectedEmail.from.avatar || "/placeholder.svg"
                              }
                              alt={selectedEmail.from.name}
                            />
                            <AvatarFallback>
                              {getInitials(selectedEmail.from.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {selectedEmail.from.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                &lt;{selectedEmail.from.email}&gt;
                              </span>
                            </div>
                            <div className="mt-1 text-xs text-gray-500">
                              <span>to me</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {selectedEmail.time}
                        </div>
                      </div>
                    </div>
                    <div className="prose prose-sm max-w-none whitespace-pre-line">
                      {selectedEmail.message}
                    </div>
                    {selectedEmail.attachments &&
                      selectedEmail.attachments.length > 0 && (
                        <div className="mt-6 border-t border-gray-200 pt-4">
                          <h3 className="mb-2 text-sm font-medium">
                            Attachments
                          </h3>
                          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                            {selectedEmail.attachments.map((attachment) => {
                              const FileIcon = getFileIcon(attachment.type);
                              return (
                                <Card
                                  key={attachment.id}
                                  className="overflow-hidden border border-gray-200"
                                >
                                  <CardHeader className="flex flex-row items-center gap-2 space-y-0 p-3">
                                    <FileIcon className="h-4 w-4 text-gray-500" />
                                    <div className="flex-1 truncate text-sm font-medium">
                                      {attachment.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {attachment.size}
                                    </div>
                                  </CardHeader>
                                  <CardContent className="p-0">
                                    {attachment.type === "jpg" ||
                                    attachment.type === "jpeg" ||
                                    attachment.type === "png" ||
                                    attachment.type === "gif" ? (
                                      <div className="aspect-video bg-gray-100">
                                        <img
                                          src="/placeholder.svg?height=200&width=400"
                                          alt={attachment.name}
                                          className="h-full w-full object-cover"
                                        />
                                      </div>
                                    ) : null}
                                  </CardContent>
                                  <CardFooter className="p-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 w-full gap-1 text-xs"
                                    >
                                      <DownloadIcon className="h-3 w-3" />
                                      <span>Download</span>
                                    </Button>
                                  </CardFooter>
                                </Card>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    <div className="mt-6 flex gap-2">
                      <Button 
                        className="gap-2 bg-[#0b57d0] text-white hover:bg-[#0842a0]"
                        onClick={() => handleReply(selectedEmail)}
                      >
                        <Reply className="h-4 w-4" />
                        Reply
                      </Button>
                      <Button
                        variant="outline"
                        className="gap-2 border-gray-300 text-gray-700"
                        onClick={() => handleForward(selectedEmail)}
                      >
                        <Forward className="h-4 w-4" />
                        Forward
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </div>

        {/* Floating Compose Button */}
        <Button
          onClick={handleCompose}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#c2e7ff] p-4 text-gray-800 shadow-lg hover:bg-[#b4deff] hover:shadow-xl"
        >
          <PenLine className="h-6 w-6" />
          <span className="sr-only">Compose</span>
        </Button>

        {/* Compose Email Dialog */}
        <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
          <DialogContent className="max-w-[600px] !p-0 gap-0 bg-white">
            <DialogHeader className="flex flex-row items-center justify-between space-y-0 border-b border-gray-200 p-4">
              <DialogTitle className="text-sm font-medium text-gray-700">
                New Message
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col">
              <div className="border-b border-gray-100 px-4 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">From:</span>
                  <span className="text-sm">{currentUser.email}</span>
                </div>
              </div>
              <div className="border-b border-gray-100 px-4 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">To:</span>
                  <Input
                    placeholder="Recipient"
                    value={composeData.to}
                    onChange={(e) =>
                      setComposeData({ ...composeData, to: e.target.value })
                    }
                    className="h-6 border-0 p-0 text-sm focus-visible:ring-0"
                  />
                </div>
              </div>
              {showCcBcc && (
                <>
                  <div className="border-b border-gray-100 px-4 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Cc:</span>
                      <Input
                        placeholder="Cc recipients"
                        value={composeData.cc}
                        onChange={(e) =>
                          setComposeData({ ...composeData, cc: e.target.value })
                        }
                        className="h-6 border-0 p-0 text-sm focus-visible:ring-0"
                      />
                    </div>
                  </div>
                  <div className="border-b border-gray-100 px-4 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Bcc:</span>
                      <Input
                        placeholder="Bcc recipients"
                        value={composeData.bcc}
                        onChange={(e) =>
                          setComposeData({ ...composeData, bcc: e.target.value })
                        }
                        className="h-6 border-0 p-0 text-sm focus-visible:ring-0"
                      />
                    </div>
                  </div>
                </>
              )}
              {!showCcBcc && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
                  onClick={() => setShowCcBcc(true)}
                >
                  Cc/Bcc
                </Button>
              )}
              <div className="border-b border-gray-100 px-4 py-2">
                <Input
                  placeholder="Subject"
                  value={composeData.subject}
                  onChange={(e) =>
                    setComposeData({ ...composeData, subject: e.target.value })
                  }
                  className="h-6 border-0 p-0 text-sm font-medium focus-visible:ring-0"
                />
              </div>
              
              {/* Formatting toolbar - simplified */}
              <div className="flex items-center gap-1 border-b border-gray-100 px-4 py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-gray-500 hover:bg-gray-100"
                >
                  <Smile className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-gray-500 hover:bg-gray-100"
                >
                  <Link2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-gray-500 hover:bg-gray-100"
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </div>

              <Textarea
                placeholder="Write your message..."
                value={composeData.message}
                onChange={(e) =>
                  setComposeData({ ...composeData, message: e.target.value })
                }
                className="flex-1 resize-none border-0 p-4 focus-visible:ring-0"
                rows={10}
              />
            </div>
            <DialogFooter className="flex items-center justify-between border-t border-gray-200 p-4">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSaveDraft}
                  className="text-gray-500"
                >
                  Save draft
                </Button>
                <Button
                  onClick={handleSendEmail}
                  className="gap-2 bg-[#0b57d0] text-white hover:bg-[#0842a0]"
                  disabled={!composeData.to}
                >
                  <Send className="h-4 w-4" />
                  Send
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Settings Sheet */}
        <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <SheetContent side="right" className="w-96">
            <SheetHeader>
              <SheetTitle>Settings</SheetTitle>
              <SheetDescription>
                Customize your Gmail experience
              </SheetDescription>
            </SheetHeader>
            
            <div className="mt-6 space-y-6">
              {/* Theme */}
              <div>
                <h3 className="mb-3 text-sm font-medium">Theme</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={settings.theme === "light" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSettings({ ...settings, theme: "light" })}
                    className="h-20 flex-col gap-2"
                  >
                    <div className="h-10 w-full rounded bg-white border border-gray-200" />
                    <span className="text-xs">Light</span>
                  </Button>
                  <Button
                    variant={settings.theme === "dark" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSettings({ ...settings, theme: "dark" })}
                    className="h-20 flex-col gap-2"
                  >
                    <div className="h-10 w-full rounded bg-gray-900" />
                    <span className="text-xs">Dark</span>
                  </Button>
                  <Button
                    variant={settings.theme === "system" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSettings({ ...settings, theme: "system" })}
                    className="h-20 flex-col gap-2"
                  >
                    <div className="h-10 w-full rounded bg-gradient-to-r from-white to-gray-900" />
                    <span className="text-xs">System</span>
                  </Button>
                </div>
              </div>

              {/* Density */}
              <div>
                <h3 className="mb-3 text-sm font-medium">Density</h3>
                <div className="flex gap-2">
                  <Button
                    variant={settings.density === "comfortable" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSettings({ ...settings, density: "comfortable" })}
                    className="flex-1"
                  >
                    Comfortable
                  </Button>
                  <Button
                    variant={settings.density === "compact" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSettings({ ...settings, density: "compact" })}
                    className="flex-1"
                  >
                    Compact
                  </Button>
                </div>
              </div>

              {/* Signature */}
              <div>
                <h3 className="mb-3 text-sm font-medium">Signature</h3>
                <Textarea
                  placeholder="Your email signature..."
                  value={settings.signature}
                  onChange={(e) => setSettings({ ...settings, signature: e.target.value })}
                  className="resize-none"
                  rows={4}
                />
              </div>
            </div>

            <SheetFooter>
              <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsSettingsOpen(false)}>
                Save Changes
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </TooltipProvider>
  );
}
