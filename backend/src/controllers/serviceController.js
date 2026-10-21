import Service from '../models/Service.js';

export const getServices = async (req, res, next) => {
  try {
    const { featured, category } = req.query;
    const filter = {};

    if (featured === 'true') {
      filter.isFeatured = true;
    }

    if (category && category !== 'All') {
      filter.category = new RegExp(category, 'i');
    }

    const services = await Service.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: services.length, data: services });
  } catch (error) {
    next(error);
  }
};

export const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

export const createService = async (req, res, next) => {
  try {
    const { title, category, image, priceStarting, description, detailedInfo, features, isFeatured } = req.body;

    if (!title || !image || !priceStarting || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, image, priceStarting, and description',
      });
    }

    const service = await Service.create({
      title,
      category: category || 'Wedding',
      image,
      priceStarting,
      description,
      detailedInfo: detailedInfo || '',
      features: Array.isArray(features) ? features : [],
      isFeatured: !!isFeatured,
    });

    res.status(201).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    res.json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, message: 'Service deleted successfully', data: { id: req.params.id } });
  } catch (error) {
    next(error);
  }
};
