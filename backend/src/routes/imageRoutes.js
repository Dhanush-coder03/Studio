import express from 'express';
import { getImages, createImage, deleteImage } from '../controllers/imageController.js';

const router = express.Router();

router.route('/')
  .get(getImages)
  .post(createImage);

router.route('/:id')
  .delete(deleteImage);

export default router;
