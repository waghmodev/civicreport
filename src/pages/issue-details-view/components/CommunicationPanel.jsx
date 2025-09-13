import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const CommunicationPanel = ({ communications, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  const handleSendMessage = async () => {
    if (!newMessage?.trim()) return;
    
    setIsLoading(true);
    try {
      await onSendMessage(newMessage?.trim());
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
        <Icon name="MessageSquare" size={20} className="text-primary" />
        Communication History
      </h2>
      {/* Messages List */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {communications?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="MessageCircle" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No messages yet</p>
            <p className="text-sm text-muted-foreground">Start a conversation with the municipal staff</p>
          </div>
        ) : (
          communications?.map((message) => (
            <div
              key={message?.id}
              className={`flex gap-3 ${message?.sender === 'citizen' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                {message?.sender === 'citizen' ? (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={14} className="text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <Icon name="Shield" size={14} className="text-white" />
                  </div>
                )}
              </div>

              {/* Message Content */}
              <div className={`flex-1 max-w-xs lg:max-w-md ${message?.sender === 'citizen' ? 'text-right' : 'text-left'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-foreground">
                    {message?.sender === 'citizen' ? 'You' : message?.senderName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(message?.timestamp)}
                  </span>
                </div>
                
                <div
                  className={`
                    rounded-lg px-3 py-2 text-sm
                    ${message?.sender === 'citizen' ?'bg-primary text-white' :'bg-muted text-foreground'
                    }
                  `}
                >
                  <p>{message?.content}</p>
                  
                  {/* Attachments */}
                  {message?.attachments && message?.attachments?.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {message?.attachments?.map((attachment, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {attachment?.type === 'image' ? (
                            <div className="relative">
                              <Image
                                src={attachment?.url}
                                alt="Attachment"
                                className="w-32 h-24 object-cover rounded border"
                              />
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 p-2 bg-black/10 rounded">
                              <Icon name="Paperclip" size={12} />
                              <span className="text-xs">{attachment?.name}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Message Status */}
                {message?.sender === 'citizen' && (
                  <div className="flex justify-end mt-1">
                    <Icon 
                      name={message?.read ? "CheckCheck" : "Check"} 
                      size={12} 
                      className={message?.read ? "text-primary" : "text-muted-foreground"} 
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {/* Message Input */}
      <div className="border-t border-border pt-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e?.target?.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
          </div>
          <Button
            variant="default"
            size="default"
            iconName="Send"
            iconSize={16}
            onClick={handleSendMessage}
            loading={isLoading}
            disabled={!newMessage?.trim() || isLoading}
          >
            Send
          </Button>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              iconName="Paperclip"
              iconSize={14}
            >
              Attach
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Camera"
              iconSize={14}
            >
              Photo
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunicationPanel;