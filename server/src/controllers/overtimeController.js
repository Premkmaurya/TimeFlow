const OvertimeRequest = require('../models/overtime-request.model');
const User = require('../models/user.model');
const Notification = require('../models/notification.model');

// Submit an overtime request
const createOvertimeRequest = async (req, res) => {
    const { requestDate, hours, reason } = req.body;
    console.log('Creating overtime request with data:', { requestDate, hours, reason, user: req.user.id });
    try {
        // Create overtime request
        const overtimeRequest = await OvertimeRequest.create({
            user: req.user.id,
            requestDate,
            hours,
            reason
        });

        // Notify all managers/authority users
        const managers = await User.find({ role: 'authority' });
        
        const notificationPromises = managers.map(manager =>
            Notification.create({
                user: manager._id,
                message: `New overtime request from ${req.user.email} for ${hours} hours`
            })
        );
        
        await Promise.all(notificationPromises);

        res.status(201).json({
            message: 'Overtime request submitted',
            request: overtimeRequest
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get requests for self (Employee)
const getMyRequests = async (req, res) => {
    try {
        const requests = await OvertimeRequest.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .populate('user', 'firstName lastName email')
            .populate('manager', 'firstName lastName')
            .populate('hr', 'firstName lastName');
        
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get pending requests (Authority)
const getPendingRequests = async (req, res) => {
    try {
        // Based on Dual-Approval spec, a manager sees pending, HR sees manager_approved
        const requests = await OvertimeRequest.find({
            status: { $in: ['pending', 'manager_approved', 'hr_approved'] }
        })
        .sort({ createdAt: 1 })
        .populate('user', 'firstName lastName email')
        .populate('manager', 'firstName lastName')
        .populate('hr', 'firstName lastName');
        
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Approve/Reject Request
const processRequest = async (req, res) => {
    const { id } = req.params;
    const { action, rejectionReason } = req.body; // action: 'approve' or 'reject'
    
    try {
        const overtimeRequest = await OvertimeRequest.findById(id).populate('user');
        if (!overtimeRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }

        let newStatus = overtimeRequest.status;

        // Dual Approval Engine Logic
        if (action === 'approve') {
            if (overtimeRequest.status === 'pending') {
                newStatus = 'manager_approved'; // Level 1 - Manager approval
                overtimeRequest.manager = req.user.id;
            } else if (overtimeRequest.status === 'manager_approved') {
                newStatus = 'hr_approved'; // Level 2 - HR approval
                overtimeRequest.hr = req.user.id;
            } else if (overtimeRequest.status === 'hr_approved') {
                newStatus = 'approved'; // Final approval
            }
        } else if (action === 'reject') {
            newStatus = 'rejected';
        }

        overtimeRequest.status = newStatus;
        if (rejectionReason) {
            overtimeRequest.rejectionReason = rejectionReason;
        }

        const updatedRequest = await overtimeRequest.save();

        // Notify employee
        await Notification.create({
            user: overtimeRequest.user._id,
            message: `Your overtime request from ${overtimeRequest.requestDate.toDateString()} was ${newStatus}`
        });

        res.status(200).json({
            message: `Request ${newStatus}`,
            request: updatedRequest
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { createOvertimeRequest, getMyRequests, getPendingRequests, processRequest };
