import React from "react";
import Users from "../components/UsersRegistered";
import Bookings from "../components/Bookings";

export const AdminsLogin = () => {
  return (
    <div className="adminBackground">
      <Users />
      <Bookings />
    </div>
  );
};

export default AdminsLogin;
