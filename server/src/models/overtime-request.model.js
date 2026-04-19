const mongoose = require('mongoose');

const overtimeRequestSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        requestDate: {
            type: Date,
            required: true
        },
        hours: {
            type: Number,
            required: true,
            min: 0
        },
        reason: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'manager_approved', 'hr_approved', 'approved', 'rejected'],
            default: 'pending'
        },
        manager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        hr: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rejectionReason: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const OvertimeRequest = mongoose.model('OvertimeRequest', overtimeRequestSchema);
module.exports = OvertimeRequest;
