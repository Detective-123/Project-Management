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

const getAccessibleProject = asyncHandler(async (projectId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(projectId)) return null;

  const project = await Project.findOne({
    _id: projectId,
    $or: [{ owner: userId }, { members: userId }],
  });
});

const createNote = asyncHandler(async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, content } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const project = await getAccessibleProject(projectId, req.user._id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const note = await Note.create({
      project: projectId,
      author: req.user._id,
      title,
      content,
    });

    res.status(201).json({ note });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

const getNotes = asyncHandler(async (req, res) => {});

const updateNote = asyncHandler(async (req, res) => {});

const deleteNote = asyncHandler(async (req, res) => {});

const encryptNote = asyncHandler(async (req, res) => {});

const getNotesByRole = asyncHandler(async (req, res) => {});
