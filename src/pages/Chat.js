import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  Avatar,
  CircularProgress,
  useTheme,
  Card,
  CardContent,
} from '@mui/material';
import {
  Send as SendIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const Message = ({ message, isBot }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isBot ? 'flex-start' : 'flex-end',
        mb: 2,
      }}
    >
      {isBot && (
        <Avatar
          sx={{
            bgcolor: theme.palette.primary.main,
            mr: 2,
          }}
        >
          <BotIcon />
        </Avatar>
      )}
      <Card
        sx={{
          maxWidth: '70%',
          bgcolor: isBot ? 'background.paper' : theme.palette.primary.main,
          borderRadius: 2,
          boxShadow: theme.shadows[2],
        }}
      >
        <CardContent>
          <Typography
            variant="body1"
            sx={{
              color: isBot ? 'text.primary' : 'white',
              direction: 'rtl',
            }}
          >
            {message}
          </Typography>
        </CardContent>
      </Card>
      {!isBot && (
        <Avatar
          sx={{
            bgcolor: theme.palette.secondary.main,
            ml: 2,
          }}
        >
          <PersonIcon />
        </Avatar>
      )}
    </Box>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      text: 'مرحباً! أنا عميرة، مساعدك الشخصي للتجارة الإلكترونية. كيف يمكنني مساعدتك اليوم؟',
      isBot: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const theme = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: 'شكراً على رسالتك! سأقوم بمساعدتك في تحسين تجارتك الإلكترونية.',
          isBot: true,
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      {/* Chat Header */}
      <Paper
        elevation={2}
        sx={{
          p: 2,
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              mr: 2,
            }}
          >
            <BotIcon />
          </Avatar>
          <Box>
            <Typography variant="h6">عميرة</Typography>
            <Typography variant="body2" color="text.secondary">
              مساعد التجارة الإلكترونية الذكي
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Messages Area */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          p: 3,
          bgcolor: 'background.default',
        }}
      >
        {messages.map((message, index) => (
          <Message key={index} message={message.text} isBot={message.isBot} />
        ))}
        {isTyping && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2 }}>
            <Avatar
              sx={{
                bgcolor: theme.palette.primary.main,
                width: 32,
                height: 32,
              }}
            >
              <BotIcon sx={{ fontSize: 20 }} />
            </Avatar>
            <CircularProgress size={20} />
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          bgcolor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="اكتب رسالتك هنا..."
            sx={{ direction: 'rtl' }}
            InputProps={{
              sx: {
                bgcolor: 'background.default',
                '&:hover': {
                  bgcolor: 'background.default',
                },
              },
            }}
          />
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            sx={{
              bgcolor: theme.palette.primary.main,
              color: 'white',
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
              },
              '&.Mui-disabled': {
                bgcolor: theme.palette.action.disabledBackground,
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default Chat;
