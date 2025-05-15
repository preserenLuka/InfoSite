import { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

interface Topic {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

const TopicsPage = () => {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    // Template data
    const templateData: Topic[] = [
      {
        id: 1,
        title: "Topic 1",
        description: "This is the first topic.",
        icon: "📘",
      },
      {
        id: 2,
        title: "Topic 2",
        description: "This is the second topic.",
        icon: "📗",
      },
      {
        id: 3,
        title: "Topic 3",
        description: "This is the third topic.",
        icon: "📙",
      },
      {
        id: 4,
        title: "Topic 4",
        description: "This is the fourth topic.",
      },
    ];

    setTopics(templateData);
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Topics
      </Typography>
      import Grid from '@mui/material/Grid';
      <Grid container spacing={2}>
        <Grid size={8}>
          <Box>size=8</Box>
        </Grid>
        <Grid size={4}>
          <Box>size=4</Box>
        </Grid>
        <Grid size={4}>
          <Box>size=4</Box>
        </Grid>
        <Grid size={8}>
          <Box>size=8</Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TopicsPage;
