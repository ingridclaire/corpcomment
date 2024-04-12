import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { TFeedbackItem } from "../../lib/types";

type FeedbackListProps = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errMsg: string;
};

export default function FeedbackList({
  feedbackItems,
  isLoading,
  errMsg,
}: FeedbackListProps) {
  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errMsg && <ErrorMessage message={errMsg} />}
      {feedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
