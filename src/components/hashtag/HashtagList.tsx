import { useFeedbackStore } from "../../stores/feedbackStore";
import HashtagItem from "./HashtagItem";

export default function HashtagList() {
  // const { companyList, handleSelectedCompany } = useFeedbackContext();
  const companyList = useFeedbackStore((state) => state.getCompanyList());
  const handleSelectedCompany = useFeedbackStore(
    (state) => state.handleSelectedCompany
  );

  return (
    <ul className="hashtags">
      {companyList.map((company: string) => (
        <HashtagItem
          key={company}
          company={company}
          onCompanyClick={handleSelectedCompany}
        />
      ))}
    </ul>
  );
}
