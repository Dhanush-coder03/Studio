import express from 'express';
import {
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from '../controllers/galleryController.js';

const router = express.Router();

router.route('/')
  .get(getGalleryItems)
  .post(createGalleryItem);

router.route('/:id')
  .put(updateGalleryItem)
  .delete(deleteGalleryItem);

export default router;
