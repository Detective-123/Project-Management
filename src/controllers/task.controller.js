import { User } from "../models/user.models.js";
import { Project } from "../models/project.model.js";
import { ProjectMember } from "../models/projmember.model.js";
import { Task } from "../models/task.model.js";
import { Subtask } from "../models/subtask.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";

/*
  FEATURES THAT CAN BE ADDED FURTHER
  1. List all subtask in a task
  2. 

*/

const getTasks = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const tasks = await Task.find({
    project: new mongoose.Types.ObjectId(projectId),
  }).populate("assignedTo", "avatar username fullname");

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
});

const createTask = asyncHandler(async (req, res) => {
  const { title, description, assignedTo, status } = req.body;
  const { projectId } = req.params;

  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const files = req.files || [];

  const attachement = files.map((file) => {
    return {
      url: `${process.env.SERVER_URL}/images/${file.originalName}`,
      mimetype: file.mimetype,
      size: file.size,
    };
  });

  const task = await Task.create({
    title,
    description,
    project: new mongoose.Types.ObjectId(projectId),
    assignedTo: assignedTo
      ? new mongoose.Types.ObjectId(assignedTo)
      : undefined,
    assignedBy: new mongoose.Types.ObjectId(req.user._id),
    status,
    attachement,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, task, "Task created successfully"));
});

const getTaskById = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(taskId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "assignedTo",
        foreignField: "_id",
        as: "assignedTo",
        pipeline: [
          {
            _id: 1,
            username: 1,
            fullname: 1,
            avatar: 1,
          },
        ],
      },
    },
    {
      $lookup: {
        from: "subtasks",
        localField: "_id",
        foreignField: "task",
        as: "subtasks",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "createdBy",
              foreignField: "_id",
              as: "createdBy",
              pipeline: [
                {
                  $project: {
                    _id: 1,
                    username: 1,
                    fullname: 1,
                    avatar: 1
                  }
                },
                {
                  $addFields: {
                    createdBy: {
                      $arrayElemAt: ["$createdBy", 0]
                    }
                  }
                }
              ]
            },
          },
        ],
      },
    },
    {
      $addFields: {
        assignedTo: {
          $arrayElemAt: ["$assignedTo", 0]
        }
      }
    }
  ]);

  if(!task || task.length === 0){
    throw new ApiError(404, "Task not found")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task fetched successfully"))
});

const updateTask = asyncHandler(async (req, res) => {});

const deleteTask = asyncHandler(async (req, res) => {});

const createSubTask = asyncHandler(async (req, res) => {});

const updateSubTask = asyncHandler(async (req, res) => {});

const deleteSubTask = asyncHandler(async (req, res) => {});

const test = asyncHandler(async (req, res) => {});

export {
  createSubTask,
  createTask,
  getTasks,
  getTaskById,
  updateSubTask,
  updateTask,
  deleteSubTask,
  deleteTask,
};
