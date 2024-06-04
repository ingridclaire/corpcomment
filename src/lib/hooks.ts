import { useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContextProvider";

export function useFeedbackContext() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error(
      "useFeedbackContext must be used within FeedbackContextProvider"
    );
  }
  return context;
}
