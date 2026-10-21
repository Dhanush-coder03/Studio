import express from 'express';
import {
  getContactInfo,
  updateContactInfo,
  getInquiries,
  createInquiry,
  updateInquiryStatus,
  deleteInquiry,
} from '../controllers/contactController.js';

const router = express.Router();

// Studio contact info
router.route('/info')
  .get(getContactInfo)
  .put(updateContactInfo);

// Client inquiries & leads
router.route('/inquiries')
  .get(getInquiries)
  .post(createInquiry);

router.route('/inquiries/:id')
  .delete(deleteInquiry);

router.route('/inquiries/:id/status')
  .put(updateInquiryStatus);

export default router;
