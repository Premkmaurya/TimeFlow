import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { getMyRequests, reset } from "../features/overtime/overtimeSlice";
import axios from "axios";
import { motion } from "framer-motion";
import { Clock, Plus, CheckCircle, Clock3, XCircle, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { requests, isLoading } = useSelector((state) => state.overtime);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate total approved overtime hours
  const totalApprovedOvertime = requests
    ? requests.filter((req) => req.status === "approved").reduce((sum, req) => sum + Number(req.hours), 0)
    : 0;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm({
    defaultValues: {
      requestDate: "",
      hours: "",
      reason: "",
    },
  });

  useEffect(() => {
    if (user) dispatch(getMyRequests());
    return () => {
      dispatch(reset());
    };
  }, [user, dispatch]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    console.log(data)
    try {
      await axios.post("http://localhost:5000/api/overtime", data, {
        withCredentials: true,
      });
      setShowForm(false);
      resetForm();
      dispatch(getMyRequests());
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error submitting request");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status) => {
    if (status === "approved")
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (status === "rejected")
      return <XCircle className="w-5 h-5 text-red-500" />;
    return <Clock3 className="w-5 h-5 text-orange-400" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Your Overtime Requests
          </h2>
          <p className="text-slate-500">
            Track and submit your extra hours worked.
          </p>
          <div className="mt-2 text-indigo-700 font-semibold text-lg">
            Total Approved Overtime: {totalApprovedOvertime}h
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-smooth shadow-md shadow-indigo-200"
        >
          <Plus className="w-5 h-5" />
          New Request
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="glass p-6 rounded-2xl overflow-hidden"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Date
              </label>
              <input
                type="date"
                {...register("requestDate", {
                  required: "Date is required",
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-colors ${
                  errors.requestDate
                    ? "border-red-300 bg-red-50"
                    : "border-slate-200"
                }`}
              />
              {errors.requestDate && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.requestDate.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Hours
              </label>
              <input
                type="number"
                step="0.5"
                {...register("hours", {
                  required: "Hours is required",
                  min: { value: 0.5, message: "Minimum 0.5 hours" },
                  pattern: {
                    value: /^[0-9]+\.?[0-9]*$/,
                    message: "Enter a valid number",
                  },
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-colors ${
                  errors.hours
                    ? "border-red-300 bg-red-50"
                    : "border-slate-200"
                }`}
              />
              {errors.hours && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.hours.message}
                </p>
              )}
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Reason / Justification
              </label>
              <textarea
                rows="3"
                {...register("reason", {
                  required: "Reason is required",
                  minLength: {
                    value: 10,
                    message: "Reason must be at least 10 characters",
                  },
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition-colors ${
                  errors.reason
                    ? "border-red-300 bg-red-50"
                    : "border-slate-200"
                }`}
              />
              {errors.reason && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.reason.message}
                </p>
              )}
            </div>
            <div className="md:col-span-3 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="px-6 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Request"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="glass rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-500">
            Loading your requests...
          </div>
        ) : requests.length > 0 ? (
          <table className="w-full text-left">
            <thead className="bg-slate-50/80 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
                <th className="px-6 py-4 font-semibold text-slate-700">
                  Hours
                </th>
                <th className="px-6 py-4 font-semibold text-slate-700 hidden md:table-cell">
                  Details
                </th>
                <th className="px-6 py-4 font-semibold text-slate-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white/50">
              {requests.map((req) => (
                <tr
                  key={req.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-slate-800">
                    {new Date(req.requestDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-indigo-600">
                    {req.hours}h
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell text-slate-600 truncate max-w-xs">
                    {req.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(req.status)}
                      <span className="capitalize text-sm font-medium text-slate-700">
                        {req.status.replace("_", " ")}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center">
            <Clock className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-700">
              No requests yet
            </h3>
            <p className="text-slate-500">
              You haven't submitted any overtime requests.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;
