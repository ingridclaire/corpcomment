import { create } from "zustand";
import { TFeedbackItem } from "../lib/types";

type Store = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errMsg: string;
  selectedCompany: string;
  getCompanyList: () => string[];
  getDisplayedFeedback: () => TFeedbackItem[];
  handleAddToList: (text: string) => Promise<void>;
  handleSelectedCompany: (company: string) => void;
  fetchFeedbackItems: () => Promise<void>;
};

export const useFeedbackStore = create<Store>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  errMsg: "",
  selectedCompany: "",
  getCompanyList: () => {
    return get()
      .feedbackItems.map((feedback: TFeedbackItem) =>
        feedback.company.toLowerCase()
      )
      .filter(
        (company: string, index: number, arr: string[]) =>
          arr.indexOf(company) === index
      );
  },
  getDisplayedFeedback: () => {
    const state = get();

    return state.selectedCompany
      ? state.feedbackItems.filter(
          (feedback: TFeedbackItem) =>
            feedback.company.toLowerCase() === state.selectedCompany
        )
      : state.feedbackItems;
  },
  handleAddToList: async (text: string) => {
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

    // setFeedbackItems([...feedbackItems, newItem]);
    set((state) => ({ feedbackItems: [...state.feedbackItems, newItem] }));

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
      // setErrMsg("Error adding feedback");
      set(() => ({ errMsg: "Error adding feedback" }));
    }
  },
  handleSelectedCompany: (company: string) => {
    set(() => ({ selectedCompany: company }));
  },
  fetchFeedbackItems: async () => {
    set(() => ({ isLoading: true }));
    try {
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      set(() => ({ feedbackItems: data.feedbacks }));
    } catch (error) {
      console.error("Error:", error);
      set(() => ({ errMsg: "Error fetching feedbacks" }));
    } finally {
      set(() => ({ isLoading: false }));
    }
  },
}));
