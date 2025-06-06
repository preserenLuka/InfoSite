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
      {
        id: 5,
        title: "Topic 5",
        description: "This is the fifth topic.",
      },
      {
        id: 6,
        title: "Topic 6",
        description: "This is the sixth topic.",
      },
      {
        id: 7,
        title: "Topic 7",
        description: "This is the seventh topic.",
      },
    ];

    setTopics(templateData);
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Topics
      </Typography>
      <Grid container spacing={2}>
        {topics.map((topic) => (
          <Card>
            <CardContent>
              <Typography variant="h5">{topic.title}</Typography>
              <Typography variant="body2">{topic.description}</Typography>
              {topic.icon && <Box>{topic.icon}</Box>}
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Box>
  );
};

export default TopicsPage;
