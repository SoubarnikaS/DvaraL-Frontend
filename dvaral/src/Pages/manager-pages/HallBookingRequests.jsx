import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import ManNavBar from './ManNavBar';
import ManagerSideBar from './ManagerSideBar';

const HallBookingRequests = () => {
    const [requests, setRequests] = useState([
      { id: 1, userName: "John Doe", hallName: "Grand Ballroom", date: "2024-08-15", time: "14:00", guests: 100, purpose: "Wedding", status: "pending", additionalInfo: "Need special lighting arrangement" },
      { id: 2, userName: "Jane Smith", hallName: "Conference Center", date: "2024-08-20", time: "09:00", guests: 50, purpose: "Corporate Meeting", status: "pending", additionalInfo: "Require projector and screen" },
      { id: 3, userName: "Bob Johnson", hallName: "Garden Pavilion", date: "2024-08-25", time: "18:00", guests: 75, purpose: "Birthday Party", status: "pending", additionalInfo: "Outdoor setup preferred" },
    ]);
  
    const [expandedRow, setExpandedRow] = useState(null);
  
    const handleRowClick = (id) => {
      setExpandedRow(expandedRow === id ? null : id);
    };
  
    const handleRequestAction = (id, action) => {
      setRequests(requests.map(request => 
        request.id === id ? { ...request, status: action } : request
      ));
    };
  
    const getStatusColor = (status) => {
      switch (status) {
        case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-300";
        case "approved": return "bg-green-100 text-green-800 border-green-300";
        case "rejected": return "bg-red-100 text-red-800 border-red-300";
        default: return "bg-gray-100 text-gray-800 border-gray-300";
      }
    };
  
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
        <ManNavBar />
        <div className="flex flex-grow overflow-hidden h-[90vh]">
          <ManagerSideBar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-6 py-8">
              <h1 className="text-3xl font-semibold text-gray-800 mb-6">Hall Booking Requests</h1>
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-200 text-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">User</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Hall</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {requests.map((request) => (
                        <React.Fragment key={request.id}>
                          <tr className={`hover:bg-gray-50 cursor-pointer transition duration-150 ease-in-out ${expandedRow === request.id ? 'bg-gray-50' : ''}`}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{request.userName}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{request.hallName}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{request.date}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(request.status)}`}>
                                {request.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                              {request.status === 'pending' && (
                                <div className="flex space-x-2">
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); handleRequestAction(request.id, 'approved'); }}
                                    className="flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition duration-150 ease-in-out"
                                  >
                                    <CheckCircleIcon className="w-4 h-4 mr-1" />
                                    Accept
                                  </button>
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); handleRequestAction(request.id, 'rejected'); }}
                                    className="flex items-center px-2 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition duration-150 ease-in-out"
                                  >
                                    <XCircleIcon className="w-4 h-4 mr-1" />
                                    Reject
                                  </button>
                                </div>
                              )}
                              <button 
                                onClick={() => handleRowClick(request.id)}
                                className="ml-2 p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none"
                              >
                                {expandedRow === request.id ? (
                                  <ChevronUpIcon className="w-5 h-5" />
                                ) : (
                                  <ChevronDownIcon className="w-5 h-5" />
                                )}
                              </button>
                            </td>
                          </tr>
                          {expandedRow === request.id && (
                            <tr>
                              <td colSpan="5" className="px-4 py-3">
                                <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-white p-3 rounded-md shadow">
                                      <p className="font-semibold text-gray-700">Time:</p>
                                      <p className="text-gray-600">{request.time}</p>
                                    </div>
                                    <div className="bg-white p-3 rounded-md shadow">
                                      <p className="font-semibold text-gray-700">Number of Guests:</p>
                                      <p className="text-gray-600">{request.guests}</p>
                                    </div>
                                    <div className="bg-white p-3 rounded-md shadow">
                                      <p className="font-semibold text-gray-700">Purpose:</p>
                                      <p className="text-gray-600">{request.purpose}</p>
                                    </div>
                                    <div className="bg-white p-3 rounded-md shadow">
                                      <p className="font-semibold text-gray-700">Additional Information:</p>
                                      <p className="text-gray-600">{request.additionalInfo}</p>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };
  
export default HallBookingRequests;