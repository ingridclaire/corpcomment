import { useEffect, useState } from "react";
import Container from "./components/layout/Container";
import Footer from "./components/layout/Footer";
import HashtagList from "./components/hashtag/HashtagList";
import { TFeedbackItem } from "./lib/types";

function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const displayedFeedback = selectedCompany
    ? feedbackItems.filter(
        (feedback) => feedback.company.toLowerCase() === selectedCompany
      )
    : feedbackItems;

  const companyList = feedbackItems.map((feedback) =>
    feedback.company.toLowerCase()
  );

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setFeedbackItems(data.feedbacks);
      } catch (error) {
        console.error("Error:", error);
        setErrMsg("Error fetching feedbacks");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleAddToList = async (text: string) => {
    const companyName: string = text
      .split(" ")
      .find((word: string) => word.includes("#"))!
      .slice(1);
    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName[0].toUpperCase(),
    };

    setFeedbackItems([...feedbackItems, newItem]);

    try {
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(newItem),
        }
      );
      if (!response.ok) {
        throw new Error();
      }
    } catch (error) {
      setErrMsg("Error adding feedback");
    }
  };
  return (
    <div className="app">
      <Footer />
      <Container
        feedbackItems={displayedFeedback}
        isLoading={isLoading}
        errMsg={errMsg}
        handleAddToList={handleAddToList}
      />
      <HashtagList
        companyList={[...new Set(companyList)]}
        setSelectedCompany={setSelectedCompany}
      />
    </div>
  );
}

export default App;
