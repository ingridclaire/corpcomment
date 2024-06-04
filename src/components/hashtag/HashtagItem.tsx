import React from "react";

type HashtagItemProps = {
  company: string;
  onCompanyClick: (company: string) => void;
};

export default function HashtagItem({
  company,
  onCompanyClick,
}: HashtagItemProps) {
  return (
    <li key={company}>
      <button onClick={() => onCompanyClick(company)}>#{company}</button>
    </li>
  );
}
