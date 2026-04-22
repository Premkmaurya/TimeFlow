const Notification = require('../models/notification.model');

const getMyNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .populate('user', 'firstName lastName email');
        
        res.status(200).json(notifications);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const markAsRead = async (req, res) => {
    const { id } = req.params;
    try {
        const notification = await Notification.findByIdAndUpdate(
            id,
            { isRead: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        // Verify ownership
        if (notification.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You do not have permission to update this notification' });
        }

        res.status(200).json({ message: 'Notification marked as read', notification });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { getMyNotifications, markAsRead };
