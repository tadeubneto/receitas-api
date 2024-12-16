import { Router } from "express";
import { recipeController } from "../controllers/RecipeController";

const router = Router()

router.post('/recipes', recipeController.create)
router.get('/recipes', recipeController.list)
router.get('/recipes/:id', recipeController.getById)

export default router