import Container from "./components/layout/Container";
import Footer from "./components/layout/Footer";
import HashtagList from "./components/hashtag/HashtagList";
import FeedbackContextProvider from "./context/FeedbackContextProvider";

function App() {
  return (
    <div className="app">
      <Footer />
      <FeedbackContextProvider>
        <Container />
        <HashtagList />
      </FeedbackContextProvider>
    </div>
  );
}

export default App;
