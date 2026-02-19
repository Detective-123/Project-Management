import { Router } from "express";
import {
  getProject,
  getProjectById,
  getProjectMembers,
  addMembersToProject,
  updateMemberRoles,
  updateProject,
  createProject,
  deleteProject,
  deleteMember,
} from "../controllers/project.controller.js";
import { validator } from "../middlewares/validator.middleware.js";
import {
  verifyJWT,
  validateProjectPermission,
} from "../middlewares/auth.middleware.js";
import {
  createProjectValidator,
  addMembersToProjectValidator,
} from "../validators/index.js";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/")
  .get(getProject)
  .post(createProjectValidator(), validator, createProject);

router
  .route("/:projectId")
  .get(validateProjectPermission(AvailableUserRoles), getProjectById)
  .put(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    createProjectValidator(),
    validator,
    updateProject,
  )
  .delete(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    deleteProject
  )

router
  .route("/:projectId/members")
  .get(getProjectMembers)
  .post(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    addMembersToProjectValidator(),
    validator,
    addMembersToProject,
  )

router
  .route("/:projectId/members/:userId")
  .put(validateProjectPermission([UserRolesEnum.ADMIN]), updateMemberRoles)
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteMember)

export default router;