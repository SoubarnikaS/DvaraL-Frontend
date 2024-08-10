import React, { useState } from "react";
import ManNavBar from "./ManNavBar";
import ManagerSideBar from "./ManagerSideBar";
import Requests from "./Requests";

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState("pending");

  const renderRequestsCard = (title, count, color) => (
    <div className={`bg-white rounded-lg shadow-md p-6 border-t-4 ${color}`}>
      <h2 className="text-lg font-semibold mb-2 text-gray-700">{title}</h2>
      <p className={`text-3xl font-bold ${color.replace('border', 'text')}`}>{count}</p>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <ManNavBar />
      <div className="flex flex-grow overflow-hidden h-[90vh]">
        <ManagerSideBar />
        <main className="flex-1 overflow-y-auto p-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Hall Manager Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {renderRequestsCard("Pending Requests", 5, "border-yellow-500")}
            {renderRequestsCard("Approved Requests", 10, "border-green-500")}
            {renderRequestsCard("Rejected Requests", 2, "border-red-500")}
          </div>
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {["pending", "approved", "rejected"].map((tab) => (
                  <button
                    key={tab}
                    className={`py-4 px-1 text-center border-b-2 font-medium text-sm transition-colors duration-200 ease-in-out ${
                      activeTab === tab
                        ? `border-${tab === 'pending' ? 'yellow' : tab === 'approved' ? 'green' : 'red'}-500 text-${tab === 'pending' ? 'yellow' : tab === 'approved' ? 'green' : 'red'}-600`
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} Requests
                  </button>
                ))}
              </nav>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <Requests status={activeTab} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManagerDashboard;