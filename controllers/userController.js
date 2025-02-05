import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';
import {StatusCodes} from "http-status-codes";

export const getCurrentUser = async (req, res) => {
    const user = await User.findById(req.user.userId);

    res.status(StatusCodes.OK).json(user);
}

export const updateUser = async (req, res) => {
    const obj = {...req.body};
    delete obj.password;

    const updateUser = await User.findByIdAndUpdate(req.user.userId, req.body);

    res.status(StatusCodes.OK).json({msg: 'user updated'})
}

export const getApplicationStatus = async (req, res) => {
    res.status(StatusCodes.OK).json({msg: 'Application status'})
}
