import express from 'express';
import {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
} from '../controllers/packageController.js';

const router = express.Router();

router.route('/')
  .get(getPackages)
  .post(createPackage);

router.route('/:id')
  .put(updatePackage)
  .delete(deletePackage);

export default router;
