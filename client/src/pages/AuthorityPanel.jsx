import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ShieldCheck, Loader2 } from "lucide-react";

const AuthorityPanel = () => {
  const { user } = useSelector((state) => state.auth);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingActions, setProcessingActions] = useState(new Set());

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/overtime/pending",
        {
          withCredentials: true,
        },
      );
      setPendingRequests(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchRequests();
  }, [user]);

  const handleAction = async (id, action) => {
    const key = `${id}-${action}`;
    setProcessingActions((prev) => new Set(prev).add(key));
    try {
      await axios.put(
        `http://localhost:5000/api/overtime/${id}/process`,
        { action },
        {
          withCredentials: true,
        },
      );
      // Remove the request from UI immediately after approval/rejection
      setPendingRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to process request");
    } finally {
      setProcessingActions((prev) => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <ShieldCheck className="w-10 h-10 text-indigo-600" />
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Authority Panel</h2>
          <p className="text-slate-500">
            Review and manage pending overtime requests.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center p-8 text-slate-500">
            Loading pending requests...
          </div>
        ) : pendingRequests.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {pendingRequests.map((req) => (
              <motion.div
                layout
                key={req._id}
                className="glass p-6 rounded-xl hover:-translate-y-1 transition-smooth"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">
                      {req.user.firstName} {req.user.lastName}
                    </h3>
                    <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md mt-1 inline-block capitalize">
                      Level: {req.status.replace("_", " ")}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-indigo-600 text-xl">
                      {req.hours}h
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(req.request_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-6 bg-white/50 p-3 rounded-lg border border-slate-100">
                  "{req.reason}"
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleAction(req._id, "reject")}
                    className="flex-1 flex items-center justify-center gap-1 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-smooth font-medium text-sm"
                  >
                    <X className="w-4 h-4" /> Reject
                  </button>
                  <button
                    onClick={() => handleAction(req._id, "approve")}
                    className="flex-1 flex items-center justify-center gap-1 py-2 text-white bg-green-500 hover:bg-green-600 shadow-md shadow-green-200 rounded-lg transition-smooth font-medium text-sm"
                  >
                    <Check className="w-4 h-4" /> Approve
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="col-span-full glass p-12 text-center rounded-2xl">
            <ShieldCheck className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-700">
              All caught up!
            </h3>
            <p className="text-slate-500">
              There are no pending requests to review right now.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AuthorityPanel;
