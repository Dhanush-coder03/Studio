import Image from '../models/Image.js';

export const getImages = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = new RegExp(`^${category}$`, 'i');
    }

    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { caption: new RegExp(search, 'i') },
      ];
    }

    const images = await Image.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: images.length, data: images });
  } catch (error) {
    next(error);
  }
};

export const createImage = async (req, res, next) => {
  try {
    const { title, url, category, caption } = req.body;

    if (!title || !url) {
      return res.status(400).json({ success: false, message: 'Title and URL are required' });
    }

    const image = await Image.create({
      title,
      url,
      category: category || 'Showcase',
      caption: caption || '',
    });

    res.status(201).json({ success: true, data: image });
  } catch (error) {
    next(error);
  }
};

export const deleteImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const image = await Image.findByIdAndDelete(id);

    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    res.json({ success: true, message: 'Image deleted successfully', data: { id } });
  } catch (error) {
    next(error);
  }
};
