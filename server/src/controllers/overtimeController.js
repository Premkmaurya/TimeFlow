const { pool } = require('../config/db');

// Submit an overtime request
const createOvertimeRequest = async (req, res) => {
    const { request_date, hours, reason } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO overtime_requests (user_id, request_date, hours, reason) VALUES ($1, $2, $3, $4) RETURNING *',
            [req.user.id, request_date, hours, reason]
        );

        // Notify managers (simplified list simulation for MVP)
        const managers = await pool.query("SELECT id FROM users WHERE role = 'authority'");
        for (let manager of managers.rows) {
            await pool.query(
                'INSERT INTO notifications (user_id, message) VALUES ($1, $2)',
                [manager.id, `New overtime request from user ${req.user.id}`]
            );
        }

        res.status(201).json({ message: 'Overtime request submitted', request: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get requests for self (Employee)
const getMyRequests = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM overtime_requests WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id]);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get pending requests (Authority)
const getPendingRequests = async (req, res) => {
    try {
        // Based on Dual-Approval spec, a manager sees pending, HR sees manager_approved. 
        // For MVP, we simplify: authority sees all pending/manager_approved.
        const result = await pool.query(`
            SELECT ro.*, u.first_name, u.last_name, u.email 
            FROM overtime_requests ro 
            JOIN users u ON ro.user_id = u.id 
            WHERE ro.status IN ('pending', 'manager_approved')
            ORDER BY ro.created_at ASC
        `);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Approve/Reject Request
const processRequest = async (req, res) => {
    const { id } = req.params;
    const { action, rejection_reason } = req.body; // action: 'approve' or 'reject'
    
    try {
        const requestRes = await pool.query('SELECT * FROM overtime_requests WHERE id = $1', [id]);
        if (requestRes.rows.length === 0) return res.status(404).json({ message: 'Request not found' });
        
        const request = requestRes.rows[0];
        let newStatus = request.status;

        // Dual Approval Engine Logic Simulation
        if (action === 'approve') {
            if (request.status === 'pending') newStatus = 'manager_approved'; // Level 1
            else if (request.status === 'manager_approved') newStatus = 'approved'; // Level 2
        } else if (action === 'reject') {
            newStatus = 'rejected';
        }

        const updateRes = await pool.query(
            `UPDATE overtime_requests 
             SET status = $1, rejection_reason = $2, updated_at = CURRENT_TIMESTAMP
             WHERE id = $3 RETURNING *`,
            [newStatus, rejection_reason || null, id]
        );

        // Notify user
        await pool.query(
            'INSERT INTO notifications (user_id, message) VALUES ($1, $2)',
            [request.user_id, `Your overtime request from ${request.request_date} was ${newStatus}`]
        );

        res.status(200).json({ message: `Request ${newStatus}`, request: updateRes.rows[0] });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { createOvertimeRequest, getMyRequests, getPendingRequests, processRequest };
