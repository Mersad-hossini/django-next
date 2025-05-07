import React, { useEffect, useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import swal from "sweetalert";

function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const res = await fetch("/api/user/getAll");
    const users = await res.json();
    setUsers(users.data);
  };

  const removeUser = async (id) => {
    const confirm = await swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    });

    if (confirm) {
      try {
        const res = await fetch(`/api/user/${id}`, {
          method: "DELETE",
        });

        const result = await res.json();

        if (res.ok) {
          swal("Deleted!", result.message, "success");
          getAllUsers();
        } else {
          swal("Error", result.message, "error");
        }
      } catch (err) {
        console.error(err);
        swal("Error", "Something went wrong!", "error");
      }
    }
  };

  return (
    <div className="overflow-x-auto m-3">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 whitespace-nowrap">
          <tr>
            <th className="p-4 text-left text-sm font-medium text-white">Id</th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Username
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Email
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Phone
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Role
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Joined At
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="whitespace-nowrap">
          {users?.map((user, index) => (
            <tr key={user._id} className="even:bg-blue-50">
              <td className="p-4 text-[15px] text-slate-600 font-medium">
                {index + 1}
              </td>
              <td className="p-4 text-[15px] text-slate-600 font-medium">
                {user.username}
              </td>

              <td className="p-4 text-[15px] text-slate-600 font-medium">
                {user.email}
              </td>
              <td className="p-4 text-[15px] text-slate-600 font-medium">
                {user.phone ? user.phone : "—"}
              </td>
              <td className="p-4 text-sm text-slate-600 font-medium">
                {user.role === "ADMIN" ? (
                  <>
                    <span className="bg-red-500 p-1 text-white rounded-sm">
                      {user.role}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="bg-green-600 p-1 text-white rounded-sm">
                      {user.role}
                    </span>
                  </>
                )}
              </td>
              <td className="p-4 text-[15px] text-slate-600 font-medium">
                {user.createdAt.substring(0, 10)}
              </td>
              <td className="p-4">
                <div className="flex items-center">
                  {user.role === "ADMIN" ? (
                    <NoSymbolIcon
                      className="size-6 cursor-not-allowed text-red-500"
                      onClick={() => removeUser(user._id)}
                    />
                  ) : (
                    <TrashIcon
                      className="size-6 cursor-pointer text-red-500"
                      onClick={() => removeUser(user._id)}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
