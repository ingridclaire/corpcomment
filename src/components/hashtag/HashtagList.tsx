import HashtagItem from "./HashtagItem";

type HashTagListProps = {
  companyList: string[];
  setSelectedCompany: (company: string) => void;
};

export default function HashtagList({
  companyList,
  setSelectedCompany,
}: HashTagListProps) {
  return (
    <ul className="hashtags">
      {companyList.map((company: string) => (
        <HashtagItem
          key={company}
          company={company}
          onCompanyClick={setSelectedCompany}
        />
      ))}
    </ul>
  );
}
