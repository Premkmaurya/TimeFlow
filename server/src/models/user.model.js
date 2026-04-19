const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            maxlength: 255
        },
        password: {
            type: String,
            required: true,
            maxlength: 255
        },
        role: {
            type: String,
            required: true,
            enum: ['employee', 'authority', 'admin'],
            default: 'employee'
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
