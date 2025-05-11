import InfoBox from "@/components/modules/InfoBox/InfoBox";
import React, { useEffect, useState } from "react";

import { UserCircleIcon, ArchiveBoxIcon } from "@heroicons/react/24/outline";

function Index() {
  const [usersCount, setUsersCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const getStateCount = async () => {
      const res = await fetch(
        "https://api.mander.ir/admin-panel/dashboard/summary",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (res.ok) {
        const data = await res.json();
        setUsersCount(data.summary.total_users);
        setProductCount(data.summary.total_products);
      }
    };

    getStateCount();
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