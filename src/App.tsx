import Container from "./components/layout/Container";
import Footer from "./components/layout/Footer";
import HashtagList from "./components/hashtag/HashtagList";
import { useEffect } from "react";
import { useFeedbackStore } from "./stores/feedbackStore";

function App() {
  const fetchFeedback = useFeedbackStore((state) => state.fetchFeedbackItems);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  return (
    <div className="app">
      <Footer />

      <Container />
      <HashtagList />
    </div>
  );
}

export default App;
