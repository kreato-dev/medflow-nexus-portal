
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Search, Send, Paperclip, MoreVertical, Phone, Video } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const Messages = () => {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState<number | null>(1);
  const [messageInput, setMessageInput] = useState('');
  
  // Mock contacts data
  const contacts = [
    {
      id: 1,
      name: 'Dr. Jane Smith',
      role: 'Cardiologist',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=0D8ABC&color=fff',
      online: true,
      unread: 2,
      lastMessage: 'Please check your latest test results',
      lastMessageTime: '10:30 AM'
    },
    {
      id: 2,
      name: 'Dr. Michael Johnson',
      role: 'Neurologist',
      avatar: 'https://ui-avatars.com/api/?name=Michael+Johnson&background=0D8ABC&color=fff',
      online: false,
      unread: 0,
      lastMessage: 'Your appointment is confirmed for tomorrow',
      lastMessageTime: 'Yesterday'
    },
    {
      id: 3,
      name: 'Dr. Sarah Williams',
      role: 'Pediatrician',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Williams&background=0D8ABC&color=fff',
      online: true,
      unread: 0,
      lastMessage: 'How is your daughter feeling now?',
      lastMessageTime: 'Yesterday'
    },
    {
      id: 4,
      name: 'John Doe',
      role: 'Patient',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
      online: false,
      unread: 5,
      lastMessage: 'I have a question about my prescription',
      lastMessageTime: 'Monday'
    }
  ];
  
  // Mock messages for active chat
  const messages = [
    {
      id: 1,
      sender: 2,
      content: 'Hello, how are you feeling today?',
      timestamp: '10:00 AM',
      read: true
    },
    {
      id: 2,
      sender: 0, // Current user
      content: 'I\'m feeling much better, thank you for asking.',
      timestamp: '10:05 AM',
      read: true
    },
    {
      id: 3,
      sender: 2,
      content: 'That\'s great to hear! Have you been taking your medication regularly?',
      timestamp: '10:08 AM',
      read: true
    },
    {
      id: 4,
      sender: 0, // Current user
      content: 'Yes, I\'ve been following the prescription exactly as directed.',
      timestamp: '10:10 AM',
      read: true
    },
    {
      id: 5,
      sender: 2,
      content: 'Perfect. I\'ve reviewed your latest test results, and everything looks good. We should continue with the current treatment plan.',
      timestamp: '10:15 AM',
      read: true
    },
    {
      id: 6,
      sender: 0, // Current user
      content: 'That\'s a relief! When should I schedule my next checkup?',
      timestamp: '10:18 AM',
      read: true
    },
    {
      id: 7,
      sender: 2,
      content: 'Let\'s meet again in two weeks. You can book an appointment through the system.',
      timestamp: '10:20 AM',
      read: false
    },
    {
      id: 8,
      sender: 2,
      content: 'Also, please download the new diet plan I\'ve uploaded to your records.',
      timestamp: '10:22 AM',
      read: false
    }
  ];
  
  const activeContact = contacts.find(contact => contact.id === activeChat);
  
  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, this would send the message to the backend
      console.log(`Sending message to ${activeContact?.name}: ${messageInput}`);
      setMessageInput('');
    }
  };
  
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
      </div>
      
      <div className="flex h-[calc(100vh-12rem)] rounded-lg overflow-hidden border">
        {/* Contacts sidebar */}
        <div className="w-full max-w-xs border-r flex flex-col bg-card">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-8"
              />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="divide-y divide-border">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className={cn(
                    "p-3 cursor-pointer hover:bg-accent/50 transition-colors",
                    activeChat === contact.id && "bg-accent"
                  )}
                  onClick={() => setActiveChat(contact.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>{contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      {contact.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-background"></span>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium truncate">{contact.name}</h3>
                        <span className="text-xs text-muted-foreground">{contact.lastMessageTime}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{contact.role}</p>
                      <p className="text-sm truncate mt-1">{contact.lastMessage}</p>
                    </div>
                    
                    {contact.unread > 0 && (
                      <Badge variant="default" className="ml-1 h-5 min-w-5 px-1.5">
                        {contact.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        
        {/* Chat area */}
        {activeChat ? (
          <div className="flex-1 flex flex-col bg-background">
            {/* Chat header */}
            <div className="p-3 border-b flex items-center justify-between bg-card">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={activeContact?.avatar} alt={activeContact?.name} />
                  <AvatarFallback>{activeContact?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{activeContact?.name}</h3>
                  <div className="flex items-center gap-1">
                    <span className={cn(
                      "w-2 h-2 rounded-full",
                      activeContact?.online ? "bg-success" : "bg-muted-foreground"
                    )}></span>
                    <span className="text-xs text-muted-foreground">
                      {activeContact?.online ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.sender === 0 ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[70%] rounded-lg p-3",
                        message.sender === 0
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className={cn(
                        "text-xs mt-1 flex items-center gap-1",
                        message.sender === 0
                          ? "text-primary-foreground/70 justify-end"
                          : "text-muted-foreground"
                      )}>
                        {message.timestamp}
                        {message.sender === 0 && (
                          <span className={message.read ? "text-success" : ""}>
                            ✓✓
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {/* Message input */}
            <div className="p-3 border-t bg-card">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-background">
            <div className="text-center p-4">
              <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
              <p className="text-muted-foreground">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Messages;
