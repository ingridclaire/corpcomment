import { useState } from "react";
import FeedbackItem from "./FeedbackItem";

export default function FeedbackList() {
  const [feedbackItems, setFeedbackItems] = useState([
    {
      upvoteCount: 593,
      companyName: "Starbucks",
      badgeLetter: "S",
      text: "blah blah blah",
      daysAgo: 3,
    },
    {
      upvoteCount: 681,
      companyName: "Bytegrad",
      badgeLetter: "B",
      text: "lovely courses!",
      daysAgo: 5,
    },
  ]);

  return (
    <ol className="feedback-list">
      {feedbackItems.map((feedbackItem) => (
        <FeedbackItem feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
