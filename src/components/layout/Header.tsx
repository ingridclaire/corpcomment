import FeedbackForm from "../feedback/FeedbackForm";
import Logo from "../Logo";
import Pattern from "../Pattern";
import PageHeading from "../PageHeading";
import { useFeedbackContext } from "../../lib/hooks";

export default function Header() {
  const { handleAddToList } = useFeedbackContext();

  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onAddToList={handleAddToList} />
    </header>
  );
}
