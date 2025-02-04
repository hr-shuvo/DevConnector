import {body, param, validationResult} from "express-validator";
import {BadRequestError, NotFoundError, UnAuthorizedError} from "../errors/customError.js";
import {JOB_STATUS, JOB_TYPE} from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";


const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg);

                if(errorMessages[0].startsWith('not authorized')){
                    throw new UnAuthorizedError('not authorized to perform this action');
                }

                throw new BadRequestError(errorMessages)
            }
            next();
        }
    ];

};

export const validateTest = withValidationErrors([
    body('name')
        .notEmpty()
        .withMessage('name is required')
        .isLength({min: 3, max: 50})
        .withMessage('name must be at least 3 characters')
        .trim()
]);

export const validateIdParam = withValidationErrors([
    param('id').custom(async (value, {req}) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value);

        if (!isValidId) {
            throw new BadRequestError('invalid MongoDB id');
        }

        /// remove for another entity
        const job = await Job.findById(value);

        if (!job) {
            throw new NotFoundError(`job with id ${value} not found`);
        }

        const isAdmin = req.user.role === 'admin';
        const isOwner = job.createdBy.toString() === req.user.userId;

        if (!isAdmin && !isOwner) {
            throw new UnAuthorizedError('not authorized to perform this action');
        }
    })
]);

export const validateJobInput = withValidationErrors([
    body('company')
        .notEmpty()
        .withMessage('company is required')
        .isLength({min: 3, max: 100})
        .withMessage('company must be at least 3 characters')
        .trim(),
    body('position')
        .notEmpty()
        .withMessage('position is required')
        .isLength({min: 3, max: 100})
        .withMessage('position must be at least 3 characters')
        .trim(),
    body('jobLocation')
        .notEmpty()
        .withMessage('jobLocation is required')
        .isLength({min: 3, max: 100})
        .withMessage('jobLocation must be at least 3 characters')
        .trim(),
    body('jobStatus')
        .isIn(Object.values(JOB_STATUS))
        .withMessage('jobStatus is invalid'),
    body('jobType')
        .isIn(Object.values(JOB_TYPE))
        .withMessage('jobType is invalid')

]);


export const validateRegisterInput = withValidationErrors([
    body('name')
        .notEmpty()
        .withMessage('name is required')
        .isLength({min: 3, max: 50})
        .withMessage('name must be at least 3 characters')
        .trim(),
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('email is invalid')
        .custom(async (email) => {
            const user = await User.findOne({email});

            if (user) {
                throw new BadRequestError('email already exists');
            }
        }),
    body('password')
        .notEmpty()
        .withMessage('password is required')
        .isLength({min: 4})
        .withMessage('password must be at least 4 characters')
]);

export const validateLoginInput = withValidationErrors([
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('email is invalid'),
    body('password')
        .notEmpty()
        .withMessage('password is required')
]);