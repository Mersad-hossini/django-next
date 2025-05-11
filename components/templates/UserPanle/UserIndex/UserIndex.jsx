import React from "react";
import {
  CreditCardIcon,
  QuestionMarkCircleIcon,
  PresentationChartLineIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import InfoBox from "@/components/modules/InfoBox/InfoBox";

function UserIndex() {
  return (
    <>
      <div className="flex items-center justify-center flex-wrap gap-10">
        <InfoBox title="Wallet Balance" count="0 $" icon={CreditCardIcon} />
        <InfoBox
          title="Questions And Answers"
          count=" 1 question"
          icon={QuestionMarkCircleIcon}
        />
        <InfoBox
          title="My Total Tickets"
          count=" 2 tickets"
          icon={PresentationChartLineIcon}
        />
        <InfoBox
          title="Courses Being Learned"
          count=" 31 courses"
          icon={BookOpenIcon}
        />
      </div>
    </>
  );
}

export default UserIndex;