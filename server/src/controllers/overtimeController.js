const OvertimeRequest = require("../models/overtime-request.model");
const User = require("../models/user.model");
const Notification = require("../models/notification.model");

// Submit an overtime request
const createOvertimeRequest = async (req, res) => {
  const { requestDate, hours, reason } = req.body;
  console.log("Creating overtime request with data:", {
    requestDate,
    hours,
    reason,
    user: req.user.id,
  });
  try {
    // Create overtime request
    const overtimeRequest = await OvertimeRequest.create({
      user: req.user.id,
      requestDate,
      hours,
      reason,
    });

    // Notify all managers/authority users
    const managers = await User.find({ role: "authority" });

    const notificationPromises = managers.map((manager) =>
      Notification.create({
        user: manager._id,
        message: `New overtime request from ${req.user.email} for ${hours} hours`,
      }),
    );

    await Promise.all(notificationPromises);

    res.status(201).json({
      message: "Overtime request submitted",
      request: overtimeRequest,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get requests for self (Employee)
const getMyRequests = async (req, res) => {
  try {
    const requests = await OvertimeRequest.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("manager", "firstName lastName")
      .populate("hr", "firstName lastName");

    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get pending requests (Authority)
const getPendingRequests = async (req, res) => {
  try {
    // Managers see requests not yet approved by them, even if HR has approved
    let filter = {};
    if (req.user.role === "authority" || req.user.role === "manager") {
      filter = {
        $or: [
          { status: "pending" },
          { status: "hr_approved"},
        ],
      };
    } else if (req.user.role === "hr") {
      // HR sees both pending and manager_approved (but only manager_approved if not already approved by this HR)
      filter = {
        $or: [
          { status: "pending" },
          { status: "manager_approved" },
        ],
      };
    }
    const requests = await OvertimeRequest.find(filter)
      .sort({ createdAt: 1 })
      .populate("user", "firstName lastName email")
      .populate("manager", "firstName lastName")
      .populate("hr", "firstName lastName");
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Approve/Reject Request
const processRequest = async (req, res) => {
  const { id } = req.params;
  const { action, rejectionReason } = req.body; // action: 'approve' or 'reject'

  try {
    const overtimeRequest = await OvertimeRequest.findById(id).populate("user");
    if (!overtimeRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    let newStatus = overtimeRequest.status;

    // Approval Logic
    if (action === "approve") {
      if (overtimeRequest.status === "pending") {
        req.user.role === "manager"
          ? (newStatus = "manager_approved")
          : (newStatus = "hr_approved");
        overtimeRequest.manager = req.user.id;
      } else if (
        (overtimeRequest.status === "manager_approved" ||
          overtimeRequest.status === "hr_approved") &&
        (req.user.role === "hr" || req.user.role === "manager")
      ) {
        newStatus = "approved"; // Only HR can set this
        overtimeRequest.hr = req.user.id;
      }
    } else if (action === "reject") {
      newStatus = "rejected";
    }

    overtimeRequest.status = newStatus;
    if (rejectionReason) {
      overtimeRequest.rejectionReason = rejectionReason;
    }

    const updatedRequest = await overtimeRequest.save();

    // Notify employee
    await Notification.create({
      user: overtimeRequest.user._id,
      message: `Your overtime request from ${overtimeRequest.requestDate.toDateString()} was ${newStatus}`,
    });

    res.status(200).json({
      message: `Request ${newStatus}`,
      request: updatedRequest,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Fetch all Employees with their overtime stats (for Authority)
const getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }).select("firstName lastName email");
    const employeeData = await Promise.all(
      employees.map(async (emp) => {
        const requests = await OvertimeRequest.find({ user: emp._id });
        const totalOvertimeHours = requests.reduce((sum, r) => sum + r.hours, 0);
        const hasNewRequest = requests.some(r => r.status === "pending");
        const status = requests.length > 0 ? requests[requests.length - 1].status : "none";
        return {
          id: emp._id,
          name: `${emp.firstName} ${emp.lastName}`,
          email: emp.email,
          totalOvertimeHours,
          hasNewRequest,
          status,
        };
      }),
    );
    res.status(200).json(employeeData);
  } catch (err)
  {    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createOvertimeRequest,
  getMyRequests,
  getPendingRequests,
  processRequest,
  getAllEmployees,
};
