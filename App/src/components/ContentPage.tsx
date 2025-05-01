import { useParams } from "react-router-dom";

const ContentPage = () => {
  const { topicId, contentId } = useParams();

  return (
    <div>
      Content Page - Topic ID: {topicId}, Content ID: {contentId}
    </div>
  );
};

export default ContentPage;
