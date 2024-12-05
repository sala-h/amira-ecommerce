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
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  ArrowLeftIcon
} from '@mui/material';
import {
  Send as SendIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const Message = ({ message, isBot, isLimited, isError }) => {
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
          opacity: isLimited ? 0.5 : 1,
          border: isError ? '1px solid red' : 'none',
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

const SuggestedTopics = () => {
  const theme = useTheme();
  
  const topics = [
    {
      title: "للمبتدئين",
      items: [
        "كيف أبدأ متجري الإلكتروني؟",
        "ما هي المتطلبات القانونية؟",
        "كيف أختار المنتجات المناسبة؟",
      ]
    },
    {
      title: "للمحترفين",
      items: [
        "تحسين سلسلة التوريد",
        "استراتيجيات التوسع",
        "تحليل البيانات المتقدم",
      ]
    },
    {
      title: "إدارة المالية",
      items: [
        "طرق الدفع المتاحة",
        "تحسين هامش الربح",
        "إدارة التدفق النقدي",
      ]
    },
    {
      title: "التسويق والمبيعات",
      items: [
        "استراتيجيات التسويق",
        "إدارة وسائل التواصل",
        "برامج ولاء العملاء",
      ]
    }
  ];

  const setInput = (item) => {
    // You need to implement this function to set the input value
  };

  return (
    <Box sx={{ mt: 2, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>
        مواضيع مقترحة
      </Typography>
      <Grid container spacing={2}>
        {topics.map((topic, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper 
              elevation={1}
              sx={{ 
                p: 2,
                backgroundColor: theme.palette.background.paper,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                }
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                {topic.title}
              </Typography>
              <List dense>
                {topic.items.map((item, idx) => (
                  <ListItem 
                    key={idx}
                    button
                    onClick={() => setInput(item)}
                    sx={{
                      borderRadius: 1,
                      '&:hover': {
                        backgroundColor: theme.palette.action.selected,
                      }
                    }}
                  >
                    <ListItemIcon>
                      <ArrowLeftIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        ))}
      </Grid>
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

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userMessage,
          context: messages.slice(-4) // Send last 4 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          text: data.response,
          isBot: true,
          isLimited: data.isLimited
        },
      ]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          text: 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.',
          isBot: true,
          isError: true
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
        مساعد التجارة الإلكترونية
      </Typography>
      
      {messages.length === 0 && <SuggestedTopics />}
      
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '60vh' }}>
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
            <Message key={index} message={message.text} isBot={message.isBot} isLimited={message.isLimited} isError={message.isError} />
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
    </Container>
  );
};

export default Chat;
