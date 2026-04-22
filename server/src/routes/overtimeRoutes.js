const express = require("express");
const { authenticateToken, authorizeRoles } = require("../middleware/auth");
const {
  createOvertimeRequest,
  getMyRequests,
  getPendingRequests,
  processRequest,
  getAllEmployees,
} = require("../controllers/overtimeController");

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  authorizeRoles("employee"),
  createOvertimeRequest,
);
router.get(
  "/my-requests",
  authenticateToken,
  authorizeRoles("employee"),
  getMyRequests,
);
router.get(
  "/pending",
  authenticateToken,
  authorizeRoles("manager", "hr", "admin"),
  getPendingRequests,
);
router.put(
  "/:id/process",
  authenticateToken,
  authorizeRoles("manager", "hr", "admin"),
  processRequest,
);
router.get(
  "/employees",
  authenticateToken,
  authorizeRoles("manager", "hr", "admin"),
  getAllEmployees,
);

module.exports = router;
