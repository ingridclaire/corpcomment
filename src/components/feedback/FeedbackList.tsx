import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { TFeedbackItem } from "../../lib/types";
import { useFeedbackStore } from "../../stores/feedbackStore";

export default function FeedbackList() {
  // const { displayedFeedback, isLoading, errMsg } = useFeedbackContext();
  const isLoading = useFeedbackStore((state) => state.isLoading);
  const errMsg = useFeedbackStore((state) => state.errMsg);
  const displayedFeedback = useFeedbackStore((state) =>
    state.getDisplayedFeedback()
  );
  console.log(displayedFeedback);
  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errMsg && <ErrorMessage message={errMsg} />}
      {displayedFeedback.map((feedbackItem: TFeedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
