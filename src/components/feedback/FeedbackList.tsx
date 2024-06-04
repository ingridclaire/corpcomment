import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { TFeedbackItem } from "../../lib/types";
import { useFeedbackContext } from "../../lib/hooks";

export default function FeedbackList() {
  const { displayedFeedback, isLoading, errMsg } = useFeedbackContext();
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
