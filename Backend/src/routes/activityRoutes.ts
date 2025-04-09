import { Router } from 'express';
import { ActivityService } from '../services/activityService';
import { ActivityController } from '../controllers/activityController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const activityService = new ActivityService();
const activityController = new ActivityController(activityService);

router.post('/',authMiddleware(['admin']), (req, res) => activityController.addActivity(req, res));
router.put('/:id',authMiddleware(['admin']), (req, res) => activityController.updateActivity(req, res));
router.delete('/:id',authMiddleware(['admin']), (req, res) => activityController.deleteActivity(req, res));
router.get('/:id',authMiddleware(['admin', 'user']), (req, res) => activityController.getActivityById(req, res));
router.get('/',authMiddleware(['admin', 'user']), (req, res) => activityController.getAllActivities(req, res));
router.get('/user/:userId',authMiddleware(['admin', 'user']), (req, res) => activityController.getUserActivities(req, res));

export default router;
