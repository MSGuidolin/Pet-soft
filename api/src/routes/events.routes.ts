import { Router } from 'express';
import {
    getEventsByRole,
    getCalendarEventsByDay,
    cancelEvent,
    removeAlert,
    giveReview,
} from '../controllers/getEvents';

const router = Router();

router.post('/calendar', getCalendarEventsByDay);
router.get('/:role/:id', getEventsByRole);
router.post('/review', giveReview);
router.post('/alert', removeAlert);
router.post('/cancel/:role', cancelEvent);

export default router;