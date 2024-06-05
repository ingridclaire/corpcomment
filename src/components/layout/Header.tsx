import FeedbackForm from "../feedback/FeedbackForm";
import Logo from "../Logo";
import Pattern from "../Pattern";
import PageHeading from "../PageHeading";
import { useFeedbackStore } from "../../stores/feedbackStore";

export default function Header() {
  const handleAddToList = useFeedbackStore((state) => state.handleAddToList);

  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onAddToList={handleAddToList} />
    </header>
  );
}
