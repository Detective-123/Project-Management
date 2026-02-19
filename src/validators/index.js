import { body } from "express-validator";
import { AvailableUserRoles } from "../utils/constants.js";


const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is Required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("Username must be in lowercase")
      .isLength({ min: 3 })
      .withMessage("Username must be atleast 3 characters long"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 4 })
      .withMessage("Password must be of atleast 4 characters"),
    body("fullname").trim().optional(),
  ];
};

const userLoginValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

const userChangePasswordValidator = () => {
  return [
    body("oldPassword").notEmpty().withMessage("Old password is required"),
    body("newPassword").notEmpty().withMessage("Old password is required"),
  ];
};

const userForgotPasswordValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
  ];
};

const userResetForgotPasswordValidator = () => {
  return [body("newPassword").notEmpty().withMessage("Password is required")];
};

const createProjectValidator = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").optional(),
  ];
};

const addMembersToProjectValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("role")
      .notEmpty()
      .withMessage("Role is required")
      .isIn(AvailableUserRoles)
      .withMessage("Role is invalid")

  ]
}

export {
  userRegisterValidator,
  userLoginValidator,
  userChangePasswordValidator,
  userForgotPasswordValidator,
  userResetForgotPasswordValidator,
  createProjectValidator,
  addMembersToProjectValidator
};
