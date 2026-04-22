import { motion } from "framer-motion";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-600",
};

export default function EmployeeDetails({ employee, onApprove, onReject }) {
  if (!employee) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400">
        <span className="text-2xl font-semibold">Select an employee</span>
        <span className="text-sm mt-2">to view details</span>
      </div>
    );
  }

  const stats = employee.requests.reduce(
    (acc, req) => {
      acc[req.status] += req.hours;
      acc.count++;
      return acc;
    },
    { approved: 0, pending: 0, rejected: 0, count: 0 }
  );

  return (
    <motion.div
      key={employee.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      className="h-full flex flex-col gap-6"
    >
      {/* Profile Info */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-slate-100">
        <div className="text-xl font-bold text-slate-800">{employee.name}</div>
        <div className="text-sm text-slate-500">{employee.email}</div>
        <div className="flex gap-6 mt-2">
          <div>
            <div className="text-3xl font-bold text-blue-600">{employee.totalOvertimeHours}h</div>
            <div className="text-xs text-slate-400">Total Overtime</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-slate-700">{stats.count}</div>
            <div className="text-xs text-slate-400">Total Requests</div>
          </div>
        </div>
      </div>

      {/* Overtime Stats */}
      <div className="flex gap-4">
        <div className="flex-1 bg-green-50 rounded-lg p-4 text-center">
          <div className="text-lg font-bold text-green-700">{stats.approved}h</div>
          <div className="text-xs text-green-700">Approved</div>
        </div>
        <div className="flex-1 bg-yellow-50 rounded-lg p-4 text-center">
          <div className="text-lg font-bold text-yellow-700">{stats.pending}h</div>
          <div className="text-xs text-yellow-700">Pending</div>
        </div>
        <div className="flex-1 bg-red-50 rounded-lg p-4 text-center">
          <div className="text-lg font-bold text-red-600">{stats.rejected}h</div>
          <div className="text-xs text-red-600">Rejected</div>
        </div>
      </div>

      {/* Requests History */}
      <div className="bg-white rounded-xl shadow p-4 border border-slate-100">
        <div className="font-semibold text-slate-700 mb-2">Requests History</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-slate-500 text-xs">
                <th className="py-1 px-2 text-left">Date</th>
                <th className="py-1 px-2 text-left">Hours</th>
                <th className="py-1 px-2 text-left">Reason</th>
                <th className="py-1 px-2 text-left">Status</th>
                <th className="py-1 px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {employee.requests.map((req) => (
                <tr key={req.id} className="border-b last:border-none">
                  <td className="py-2 px-2 whitespace-nowrap">{new Date(req.date).toLocaleDateString()}</td>
                  <td className="py-2 px-2">{req.hours}h</td>
                  <td className="py-2 px-2 max-w-[180px] truncate">{req.reason}</td>
                  <td className="py-2 px-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[req.status]}`}>{req.status}</span>
                  </td>
                  <td className="py-2 px-2 text-center">
                    {req.status === "pending" && (
                      <div className="flex gap-2 justify-center">
                        <motion.button
                          whileTap={{ scale: 0.92 }}
                          className="px-2 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition"
                          onClick={() => onApprove(req.id)}
                        >
                          Approve
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.92 }}
                          className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
                          onClick={() => onReject(req.id)}
                        >
                          Reject
                        </motion.button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
