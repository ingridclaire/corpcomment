import { useState } from "react";
import { MAX_CHARACTERS } from "../../lib/constants";

type FeedbackFormProps = {
  onAddToList: (text: string) => void;
};

export default function FeedbackForm({ onAddToList }: FeedbackFormProps) {
  const [text, setText] = useState("");
  const [showValid, setShowValid] = useState(false);
  const [showInvalid, setShowInvalid] = useState(false);

  const charCount = MAX_CHARACTERS - text.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length > MAX_CHARACTERS) return;
    setText(newText);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (text.trim() === "") return;
    if (!text.includes("#") || text.length < 5) {
      console.log("Invalid feedback");
      setShowInvalid(true);
      setTimeout(() => setShowInvalid(false), 3000);
    } else {
      onAddToList(text);
      setShowValid(true);
      setText("");
      setTimeout(() => setShowValid(false), 3000);
    }
  };

  return (
    <form
      className={`form ${showValid && "form--valid"} ${
        showInvalid && "form--invalid"
      }`}
      onSubmit={handleSubmit}
    >
      <textarea
        id="feedback-textarea"
        placeholder="placeholder"
        spellCheck={false}
        value={text}
        onChange={handleChange}
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company
      </label>
      <div>
        <p className="u-italic">{charCount}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
