import {Router} from "express";
import {createJob, deleteJob, getAllJobs, getJob, updateJob} from "../controllers/jobController.js";
import {validateJobInput} from "../middleware/validationMiddleware.js";


const router = Router();

router.get('/', getAllJobs);
router.post('/', validateJobInput, createJob);
router.get('/:id', getJob);
router.put('/:id', validateJobInput, updateJob);
router.delete('/:id', deleteJob);


export default router;
