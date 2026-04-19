import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMyRequests, reset } from '../features/overtime/overtimeSlice';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Clock, Plus, CheckCircle, Clock3, XCircle } from 'lucide-react';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { requests, isLoading } = useSelector((state) => state.overtime);

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ request_date: '', hours: '', reason: '' });

    useEffect(() => {
        if (user) dispatch(getMyRequests());
        return () => { dispatch(reset()); };
    }, [user, dispatch]);

    const onChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('http://localhost:5000/api/overtime', formData, config);
            setShowForm(false);
            setFormData({ request_date: '', hours: '', reason: '' });
            dispatch(getMyRequests());
        } catch (err) {
            console.error(err);
            alert("Error submitting request");
        }
    };

    const getStatusIcon = (status) => {
        if (status === 'approved') return <CheckCircle className="w-5 h-5 text-green-500" />;
        if (status === 'rejected') return <XCircle className="w-5 h-5 text-red-500" />;
        return <Clock3 className="w-5 h-5 text-orange-400" />;
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Your Overtime Requests</h2>
                    <p className="text-slate-500">Track and submit your extra hours worked.</p>
                </div>
                <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-smooth shadow-md shadow-indigo-200">
                    <Plus className="w-5 h-5" />
                    New Request
                </button>
            </div>

            {showForm && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="glass p-6 rounded-2xl overflow-hidden">
                    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                            <input type="date" name="request_date" value={formData.request_date} onChange={onChange} required className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Hours</label>
                            <input type="number" step="0.5" min="0.5" name="hours" value={formData.hours} onChange={onChange} required className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                        <div className="md:col-span-3">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Reason / Justification</label>
                            <textarea name="reason" value={formData.reason} onChange={onChange} required rows="3" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
                        </div>
                        <div className="md:col-span-3 flex justify-end">
                            <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-smooth shadow-md">
                                Submit Request
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}

            <div className="glass rounded-2xl overflow-hidden">
                {isLoading ? (
                    <div className="p-8 text-center text-slate-500">Loading your requests...</div>
                ) : requests.length > 0 ? (
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/80 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Hours</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 hidden md:table-cell">Details</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white/50">
                            {requests.map((req) => (
                                <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-800">{new Date(req.request_date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-indigo-600">{req.hours}h</td>
                                    <td className="px-6 py-4 hidden md:table-cell text-slate-600 truncate max-w-xs">{req.reason}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(req.status)}
                                            <span className="capitalize text-sm font-medium text-slate-700">{req.status.replace('_', ' ')}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-12 text-center">
                        <Clock className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-700">No requests yet</h3>
                        <p className="text-slate-500">You haven't submitted any overtime requests.</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Dashboard;
