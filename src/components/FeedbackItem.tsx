import { TriangleUpIcon } from "@radix-ui/react-icons";
import React from "react";

export default function FeedbackItem() {
  return (
    <li className="feedback">
      <button>
        <TriangleUpIcon />
        <span>593</span>
      </button>
      <div>
        <p>B</p>
      </div>
      <div>
        <p>ByteGrad</p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam sed
          assumenda quidem molestiae nesciunt similique.
        </p>
      </div>
      <p>4d</p>
    </li>
  );
}
