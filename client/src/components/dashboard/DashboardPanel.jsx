import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import EmployeeList from "./EmployeeList";
import EmployeeDetails from "./EmployeeDetails";
import {
  fetchRequest,
  selectEmployees,
  selectLoading,
  approveRequest,
  rejectRequest,
} from "../../features/overtime/overtimeSlice";

export default function DashboardPanel() {
  const dispatch = useDispatch();
  const employees = useSelector(selectEmployees);
  const loading = useSelector(selectLoading);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(fetchRequest());
  }, [dispatch]);

  const selectedEmployee = employees.find((e) => e.id === selectedId);
  

  const handleSelect = (id) => {
    
  };

  const handleApprove = (reqId) => {
    dispatch(approveRequest(reqId));
  };
  const handleReject = (reqId) => {
    dispatch(rejectRequest(reqId));
  };

  return (
    <motion.div
      className="flex h-[calc(100vh-100px)] bg-slate-50 rounded-2xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
    >
      {/* Employee List Panel */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-white border-r border-slate-100 p-4 overflow-y-auto">
        <div className="font-bold text-lg text-slate-700 mb-4">Employees</div>
        <EmployeeList
          employees={employees}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
      </div>
      {/* Employee Details Panel */}
      <div className="flex-1 p-6">
        <EmployeeDetails
          employee={selectedEmployee}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </motion.div>
  );
}
