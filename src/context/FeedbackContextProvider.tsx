import { createContext, useEffect, useMemo, useState } from "react";
import { TFeedbackItem } from "../lib/types";

type FeedbackContextProviderProps = {
  children: React.ReactNode;
};

type TFeedbackContext = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errMsg: string;
  handleAddToList: (text: string) => void;
  handleSelectedCompany: (company: string) => void;
  displayedFeedback: TFeedbackItem[];
  companyList: string[];
};

export const FeedbackContext = createContext<TFeedbackContext | null>(null);

export default function FeedbackContextProvider({
  children,
}: FeedbackContextProviderProps) {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const displayedFeedback = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter(
            (feedback) => feedback.company.toLowerCase() === selectedCompany
          )
        : feedbackItems,
    [selectedCompany, feedbackItems]
  );

  const companyList = useMemo(
    () => feedbackItems.map((feedback) => feedback.company.toLowerCase()),
    [feedbackItems]
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

  const handleSelectedCompany = (company: string) => {
    setSelectedCompany(company);
  };

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
    <FeedbackContext.Provider
      value={{
        feedbackItems,
        isLoading,
        errMsg,
        companyList: [...new Set(companyList)],
        displayedFeedback,
        handleSelectedCompany,
        handleAddToList,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}
