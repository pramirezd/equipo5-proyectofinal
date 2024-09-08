import React from "react";
import AdminNavBar from "./AdminNavBar";
const AllUsers = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full flex justify-end mr-[220px]">
        <AdminNavBar />
      </div>
      <div>
        <h1 className="text-2xl font-semibold">Users List</h1>
      </div>
    </div>
  );
};

export default AllUsers;
