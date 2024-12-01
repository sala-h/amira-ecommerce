import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  IconButton,
  Typography,
  TextField,
  Fab,
  Drawer,
  Avatar,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  Close as CloseIcon,
  Send as SendIcon,
  SmartToy as BotIcon,
  AccountCircle as UserIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

function AIChatbot() {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! I\'m your AI assistant powered by Gemini. How can I help you with your e-commerce business today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Send to backend API
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      
      // Add bot response
      setMessages(prev => [...prev, { type: 'bot', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Fab
        color="primary"
        aria-label="chat"
        onClick={() => setIsOpen(true)}
        sx={{
          position: 'fixed',
          right: 32,
          bottom: 32,
          width: 64,
          height: 64,
          boxShadow: theme.shadows[4],
        }}
      >
        <BotIcon sx={{ width: 28, height: 28 }} />
      </Fab>

      {/* Chat Window */}
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 400 },
            maxWidth: '100%',
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              backgroundColor: 'white',
              color: theme.palette.primary.main,
            }}
          >
            <BotIcon />
          </Avatar>
          <Box flex={1}>
            <Typography variant="h6" fontWeight={600}>
              AI Assistant
            </Typography>
            <Typography variant="body2">
              Powered by Gemini
            </Typography>
          </Box>
          <IconButton
            onClick={() => setIsOpen(false)}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Messages */}
        <Box
          sx={{
            flex: 1,
            p: 2,
            overflowY: 'auto',
            backgroundColor: theme.palette.grey[50],
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                gap: 1.5,
                alignItems: 'flex-start',
                flexDirection: message.type === 'user' ? 'row-reverse' : 'row',
              }}
            >
              <Avatar
                sx={{
                  bgcolor: message.type === 'user' 
                    ? theme.palette.primary.main 
                    : theme.palette.secondary.main,
                }}
              >
                {message.type === 'user' ? <UserIcon /> : <BotIcon />}
              </Avatar>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  maxWidth: '75%',
                  backgroundColor: message.type === 'user'
                    ? theme.palette.primary.main
                    : 'white',
                  color: message.type === 'user' ? 'white' : 'inherit',
                  borderRadius: 2,
                  border: message.type === 'user' ? 'none' : `1px solid ${theme.palette.grey[200]}`,
                }}
              >
                <Typography variant="body1">
                  {message.content}
                </Typography>
              </Paper>
            </Box>
          ))}
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <CircularProgress size={24} />
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* Input */}
        <Box
          sx={{
            p: 2,
            backgroundColor: 'white',
            borderTop: `1px solid ${theme.palette.grey[200]}`,
          }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              endAdornment: (
                <IconButton
                  color="primary"
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                >
                  <SendIcon />
                </IconButton>
              ),
              sx: {
                backgroundColor: theme.palette.grey[50],
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'transparent',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'transparent',
                },
              },
            }}
          />
        </Box>
      </Drawer>
    </>
  );
}

export default AIChatbot;
