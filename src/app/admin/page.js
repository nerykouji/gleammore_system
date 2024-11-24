'use client'
import MainContent from "@/components/admin/main.content.comp";
import Sidebar from "@/components/admin/sidebar.comp";
import TopBar from "@/components/admin/topbar.comp";
import { useCurrentUser } from "@/db.supa.backend/utils";
import { useState } from "react";


const Admin = () => {
  const [visible, setVisible] = useState(true);
  const [activeItem, setActiveItem] = useState("Dashboard");

  useCurrentUser();

  return (
    <div className="flex h-screen">
      {visible ? <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} /> : ""}
      <div className="flex flex-col flex-grow">
        <TopBar visible={visible} setVisible={setVisible} />
        <MainContent activeItem={activeItem} />
      </div>
    </div>
  );
}


export default Admin;
