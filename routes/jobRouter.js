import {Router} from "express";
import {createJob, deleteJob, getAllJobs, getJob, updateJob} from "../controllers/jobController.js";


const router = Router();

router.get('/', getAllJobs);
router.post('/', createJob);
router.get('/:id', getJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);


export default router;
