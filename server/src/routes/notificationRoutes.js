const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { getMyNotifications, markAsRead } = require('../controllers/notificationController');

const router = express.Router();

router.get('/', authenticateToken, getMyNotifications);
router.put('/:id/read', authenticateToken, markAsRead);

module.exports = router;
