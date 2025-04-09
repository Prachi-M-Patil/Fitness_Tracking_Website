import { Router } from 'express';
import { NutritionService } from '../services/nutritionService';
import { NutritionController } from '../controllers/nutritionController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const nutritionService = new NutritionService();
const nutritionController = new NutritionController(nutritionService);

router.post('/nutrition',authMiddleware(['admin', 'user']), (req, res) => nutritionController.addNutrition(req, res));
router.put('/nutrition/:id',authMiddleware(['admin']), (req, res) => nutritionController.updateNutrition(req, res));
router.delete('/nutrition/:id',authMiddleware(['admin']), (req, res) => nutritionController.deleteNutrition(req, res));
router.get('/nutrition/:id',authMiddleware(['admin', 'user']), (req, res) => nutritionController.getNutritionById(req, res));
router.get('/nutrition',authMiddleware(['admin', 'user']), (req, res) => nutritionController.getAllNutrition(req, res));
router.get('/nutrition/user/:userId',authMiddleware(['admin','user']), (req, res) => nutritionController.getUserNutrition(req, res));
router.get('/nutrition/user/:userId/daily',authMiddleware(['admin', 'user']), (req, res) => nutritionController.calculateUserDailyNutrition(req, res));

export default router;



// import { Router } from 'express';
// import { NutritionController } from '../controllers/nutritionController';
// import { NutritionService } from '../services/nutritionService';
// import { authMiddleware } from '../middlewares/authMiddleware';

// const router = Router();
// const nutritionService = new NutritionService();
// const nutritionController = new NutritionController(nutritionService);

// router.post('/',authMiddleware(['admin']), (req, res) => nutritionController.addNutrition(req, res));
// router.put('/:id',authMiddleware(['admin']), (req, res) => nutritionController.updateNutrition(req, res));
// router.delete('/:id',authMiddleware(['admin']), (req, res) => nutritionController.deleteNutrition(req, res));
// router.get('/:id',authMiddleware(['admin', 'user']), (req, res) => nutritionController.getNutritionById(req, res));
// router.get('/',authMiddleware(['admin', 'user']), (req, res) => nutritionController.getAllNutrition(req, res));
// router.get('/user/:userId',authMiddleware(['admin', 'user']), (req, res) => nutritionController.getUserNutrition(req, res));

// export default router;
