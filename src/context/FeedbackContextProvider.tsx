import { createContext, useMemo, useState } from "react";
import { TFeedbackItem } from "../lib/types";
import { useFeedbackItems } from "../lib/hooks";

type FeedbackContextProviderProps = {
  children: React.ReactNode;
};

type TFeedbackContext = {
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
  const { feedbackItems, isLoading, errMsg, setFeedbackItems, setErrMsg } =
    useFeedbackItems();

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
