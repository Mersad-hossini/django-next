import InfoBox from "@/components/modules/InfoBox/InfoBox";
import React, { useEffect, useState } from "react";

import { UserCircleIcon, ArchiveBoxIcon } from "@heroicons/react/24/outline";

function Index() {
  const [usersCount, setUsersCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    fetch("/api/stats/stats-count")
      .then((res) => res.json())
      .then((data) => {
        setUsersCount(data.users);
        setProductCount(data.products);
      });
  }, []);

  return (
    <>
      <div className="flex items-center justify-center flex-wrap gap-10">
        <InfoBox
          title="Current Users"
          count={usersCount}
          icon={UserCircleIcon}
        />
        <InfoBox title="Products" count={productCount} icon={ArchiveBoxIcon} />
      </div>
    </>
  );
}

export default Index;
