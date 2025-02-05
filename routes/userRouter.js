import {Router} from "express";
import {getApplicationStatus, getCurrentUser, updateUser} from "../controllers/userController.js";
import {validateUpdateUserInput} from "../middleware/validationMiddleware.js";


const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/admin/app-status", getApplicationStatus);
router.put("/update-user", validateUpdateUserInput, updateUser);


export default router;