import { useFeedbackContext } from "../../lib/hooks";
import HashtagItem from "./HashtagItem";

export default function HashtagList() {
  const { companyList, handleSelectedCompany } = useFeedbackContext();
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
