import FeedbackForm from "./FeedbackForm";
import Logo from "./Logo";
import Pattern from "./Pattern";
import PageHeading from "./PageHeading";

export default function Header() {
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm />
    </header>
  );
}
