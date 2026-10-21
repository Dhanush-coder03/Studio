import GalleryItem from '../models/GalleryItem.js';

export const getGalleryItems = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = new RegExp(category, 'i');
    }

    if (featured === 'true') {
      filter.isFeatured = true;
    }

    const items = await GalleryItem.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
};

export const createGalleryItem = async (req, res, next) => {
  try {
    const { title, category, image, client, location, year, description, isFeatured } = req.body;

    if (!title || !image) {
      return res.status(400).json({ success: false, message: 'Title and image are required' });
    }

    const item = await GalleryItem.create({
      title,
      category: category || 'Pre-Wedding',
      image,
      client: client || '',
      location: location || '',
      year: year || new Date().getFullYear().toString(),
      description: description || '',
      isFeatured: isFeatured !== undefined ? !!isFeatured : true,
    });

    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const updateGalleryItem = async (req, res, next) => {
  try {
    const item = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const deleteGalleryItem = async (req, res, next) => {
  try {
    const item = await GalleryItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }
    res.json({ success: true, message: 'Gallery item deleted', data: { id: req.params.id } });
  } catch (error) {
    next(error);
  }
};
