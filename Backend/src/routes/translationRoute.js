import express from 'express';
import {addTranslation, searchTranslations, updateTranslation} from "../controllers/translationController.js";


const router = express.Router();

router.post("/add" , addTranslation);
router.get ("/search" , searchTranslations);
router.put("/update/:id", updateTranslation);

export default router;