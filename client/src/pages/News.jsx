import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Grid,
  Avatar,
  Divider,
  Chip
} from '@mui/material';
import { 
  OpenInNew, 
  AccessTime, 
  History, 
  Bolt 
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Sample data - replace with actual API data
const newsData = {
  realtime: [
    {
      id: 24918784,
      headline: "Corsair Reports Purchase Of Majority Ownership In iDisplay, No Terms Disclosed",
      summary: "Corsair Gaming, Inc. (NASDAQ:CRSR) (“Corsair”), a leading global provider and innovator of high-performance gear for gamers and content creators, today announced that it acquired a 51% stake in iDisplay",
      author: "Benzinga Newsdesk",
      content: "Corsair Gaming, Inc. (NASDAQ: CRSR), a leading global provider and innovator of high-performance gear for gamers and content creators, today announced that it acquired a 51% stake in iDisplay, a leading provider of digital signage solutions. The terms of the transaction were not disclosed.",
      url: "https://www.benzinga.com/m-a/22/01/24918784/corsair-reports-purchase-of-majority-ownership-in-idisplay-no-terms-disclosed",
      createdAt: "2022-01-05T22:00:37Z",
      symbols: ["CRSR"],
      source: "benzinga"
    },
    // Add more realtime news items here
  ],
  history: [
    {
      id: 24918785,
      headline: "Tech Giant Acquires AI Startup",
      summary: "Major tech company acquires AI startup to enhance its machine learning capabilities",
      author: "Tech News Network",
      content: "In a move to bolster its artificial intelligence capabilities, the tech giant announced the acquisition of a promising AI startup. The deal is valued at approximately $500 million.",
      url: "https://example.com/tech-ai-acquisition",
      createdAt: "2022-01-04T10:30:00Z",
      symbols: ["TECH"],
      source: "technews"
    },
    // Add more historical news items here
  ]
};

const News = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCardClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Market News
      </Typography>

      <Tabs 
        value={activeTab} 
        onChange={handleTabChange} 
        variant="fullWidth"
        sx={{ mb: 3 }}
      >
        <Tab 
          label="Realtime" 
          icon={<Bolt fontSize="small" />} 
          iconPosition="start" 
        />
        <Tab 
          label="History" 
          icon={<History fontSize="small" />} 
          iconPosition="start" 
        />
      </Tabs>

      <Grid container spacing={3}>
        {(activeTab === 0 ? newsData.realtime : newsData.history).map((newsItem) => (
          <Grid item xs={12} md={6} lg={4} key={newsItem.id}>
            <motion.div
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.3s',
                  '&:hover': {
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                  }
                }}
                onClick={() => handleCardClick(newsItem.url)}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      {newsItem.source.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {newsItem.source}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(newsItem.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="h6" gutterBottom>
                    {newsItem.headline}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {newsItem.summary}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="body2" paragraph>
                    {newsItem.content}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    {newsItem.symbols.map((symbol) => (
                      <Chip 
                        key={symbol}
                        label={symbol}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </CardContent>

                <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    By {newsItem.author}
                  </Typography>
                  <Button
                    size="small"
                    color="primary"
                    endIcon={<OpenInNew />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(newsItem.url);
                    }}
                  >
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default News;