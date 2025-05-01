import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  Link as MuiLink,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { useState } from "react";

const mockTopics = [
  { id: 1, title: "React" },
  { id: 2, title: "JS" },
];

const mockContents = [
  { id: 1, title: "React Basics", topicId: 1 },
  { id: 2, title: "Closures", topicId: 2 },
  { id: 3, title: "React Hooks", topicId: 1 },
  { id: 4, title: "JavaScript Promises", topicId: 2 },
];
interface SidebarProps {
  onNavigate: () => void;
}
const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  const [expandedId, setExpandedId] = useState<number | false>(false);

  const accordionStyle = {
    backgroundColor: "#1565c0",
    color: "white",
  };

  const groupedContents = mockTopics.map((topic) => ({
    ...topic,
    contents: mockContents.filter((content) => content.topicId === topic.id),
  }));

  const handleAccordionToggle = (id: number) => {
    setExpandedId((prev) => (prev === id ? false : id));
  };

  return (
    <Box>
      {groupedContents.map((topic) => (
        <Accordion
          key={topic.id}
          expanded={expandedId === topic.id}
          onChange={() => handleAccordionToggle(topic.id)}
          sx={accordionStyle}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            aria-controls={`topic-${topic.id}-content`}
            id={`topic-${topic.id}-header`}
          >
            {/* Make topic title a clickable Link */}
            <MuiLink
              component={Link}
              to={`/topics/${topic.id}`}
              underline="hover"
              color="inherit"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate();
              }}
              sx={{ fontWeight: "bold" }}
            >
              {topic.title}
            </MuiLink>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {topic.contents.map((content) => (
                <ListItemButton
                  key={content.id}
                  component={Link}
                  to={`/topics/${content.topicId}/${content.id}`}
                  onClick={onNavigate}
                >
                  <ListItemText primary={content.title} />
                </ListItemButton>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Sidebar;
