import {Router} from "express";
import {createJob, deleteJob, getAllJobs, getJob, updateJob} from "../controllers/jobController.js";
import {validateIdParam, validateJobInput} from "../middleware/validationMiddleware.js";


const router = Router();

router.get('/', getAllJobs);
router.post('/', validateJobInput, createJob);
router.get('/:id', getJob);
router.put('/:id', validateJobInput, validateIdParam, updateJob);
router.delete('/:id', validateIdParam, deleteJob);


export default router;
