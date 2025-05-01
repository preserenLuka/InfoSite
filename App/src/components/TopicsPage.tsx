import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Content, Topic } from "../utils/types";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const TopicsPage = () => {
  const { topicId } = useParams();
  const [topic, setTopic] = useState<Topic | null>(null);

  useEffect(() => {
    const fetchTopicData = async () => {
      const fakeData: Topic = {
        id: Number(topicId),
        title: `Topic #${topicId}`,
        contents: [
          { id: 1, title: "Intro to Topic" },
          { id: 2, title: "Deep Dive" },
        ],
      };
      setTopic(fakeData);
    };

    fetchTopicData();
  }, [topicId]);

  if (!topic) return null;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        {topic.title}
      </Typography>
      <List>
        {topic.contents.map((content) => (
          <ListItemButton
            key={content.id}
            component="a"
            href={`/topics/${topic.id}/${content.id}`}
            target="_blank"
          >
            <ListItemText primary={content.title} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default TopicsPage;
