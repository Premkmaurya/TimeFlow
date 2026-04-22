import { motion, AnimatePresence } from "framer-motion";

const statusColors = {
  new: "bg-blue-100 text-blue-600",
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-600",
};

export default function EmployeeList({ employees, selectedId, onSelect }) {
  return (
    <div className="h-full overflow-y-auto pr-2">
      <AnimatePresence>
        {employees.map((emp) => (
          <motion.div
            key={emp.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.03, boxShadow: "0 4px 24px #e0e7ef55" }}
            className={`flex items-center gap-4 bg-white rounded-xl shadow-sm mb-3 p-4 cursor-pointer border border-slate-100 transition-all duration-200 ${selectedId === emp.id ? "ring-2 ring-blue-200" : ""}`}
            onClick={() => onSelect(emp.id)}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-800 truncate">{emp.name}</span>
                {emp.hasNewRequest && (
                  <motion.span
                    className="ml-1 px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-600 flex items-center gap-1 animate-pulse"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  >
                    NEW
                    <span className="w-2 h-2 bg-blue-500 rounded-full inline-block ml-1" />
                  </motion.span>
                )}
              </div>
              <div className="text-xs text-slate-500 truncate">{emp.email}</div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-50 text-blue-700 mb-1">
                {emp.totalOvertimeHours}h
              </span>
              <span className={`w-3 h-3 rounded-full ${emp.hasNewRequest ? "bg-blue-500" : emp.status === "pending" ? "bg-yellow-400" : emp.status === "approved" ? "bg-green-500" : "bg-red-400"}`}></span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
