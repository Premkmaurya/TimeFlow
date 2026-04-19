const express = require('express');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { createOvertimeRequest, getMyRequests, getPendingRequests, processRequest } = require('../controllers/overtimeController');

const router = express.Router();

router.post('/', authenticateToken, authorizeRoles('employee'), createOvertimeRequest);
router.get('/my-requests', authenticateToken, authorizeRoles('employee'), getMyRequests);
router.get('/pending', authenticateToken, authorizeRoles('authority', 'admin'), getPendingRequests);
router.put('/:id/process', authenticateToken, authorizeRoles('authority', 'admin'), processRequest);

module.exports = router;
