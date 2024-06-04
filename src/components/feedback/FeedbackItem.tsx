import { TriangleUpIcon } from "@radix-ui/react-icons";
import { TFeedbackItem } from "../../lib/types";
import React, { useState } from "react";

type FeedbackItemProps = {
  feedbackItem: TFeedbackItem;
};

export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  const [open, setOpen] = useState(false);
  const [upVoteCount, setUpVoteCount] = useState(feedbackItem.upvoteCount);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setUpVoteCount((prev) => prev + 1);
  };

  return (
    <li
      onClick={() => setOpen((prev) => !prev)}
      className={`feedback ${open ? "feedback--expand" : ""}`}
    >
      <button onClick={handleClick}>
        <TriangleUpIcon />
        <span>{upVoteCount}</span>
      </button>
      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>
      <div>
        <p>{feedbackItem.company}</p>
        <p>{feedbackItem.text}</p>
      </div>
      <p>{feedbackItem.daysAgo === 0 ? "NEW" : feedbackItem.daysAgo + "d"}</p>
    </li>
  );
}
