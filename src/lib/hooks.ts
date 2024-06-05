import { useContext, useEffect, useState } from "react";
import { FeedbackContext } from "../context/FeedbackContextProvider";
import { TFeedbackItem } from "./types";

export function useFeedbackContext() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error(
      "useFeedbackContext must be used within FeedbackContextProvider"
    );
  }
  return context;
}

export const useFeedbackItems = () => {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

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

  return {
    feedbackItems,
    isLoading,
    errMsg,
    setFeedbackItems,
    setErrMsg,
  };
};
