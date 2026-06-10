import { User } from "../models/user.models.js";
import { Project } from "../models/project.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants";


/**
 NOTES controller
 basic CRUD
 getNotes
 role based access to encrypted notes
 */

const createNote = asyncHandler(async(req, res) => {

})

const getNotes = asyncHandler(async(req, res) => {
  
})

const updateNote = asyncHandler(async(req, res) => {
  
})

const deleteNote = asyncHandler(async(req, res) => {
  
})

const encryptNote = asyncHandler(async(req, res) => {
  
})

const getNotesByRole = asyncHandler(async(req, res) => {

})

