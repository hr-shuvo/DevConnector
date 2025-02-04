import {body, validationResult} from "express-validator";
import {BadRequestError} from "../errors/customError.js";
import {JOB_STATUS, JOB_TYPE} from "../utils/constants.js";


const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg);

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
        .isLength({min: 3, max:50})
        .withMessage('name must be at least 3 characters')
        .trim()
]);

export const validateJobInput = withValidationErrors([
    body('company')
        .notEmpty()
        .withMessage('company is required')
        .isLength({min: 3, max:100})
        .withMessage('company must be at least 3 characters')
        .trim(),
    body('position')
        .notEmpty()
        .withMessage('position is required')
        .isLength({min: 3, max:100})
        .withMessage('position must be at least 3 characters')
        .trim(),
    body('jobLocation')
        .notEmpty()
        .withMessage('jobLocation is required')
        .isLength({min: 3, max:100})
        .withMessage('jobLocation must be at least 3 characters')
        .trim(),
    body('jobStatus')
        .isIn(Object.values(JOB_STATUS))
        .withMessage('jobStatus is invalid'),
    body('jobType')
        .isIn(Object.values(JOB_TYPE))
        .withMessage('jobType is invalid')

]);