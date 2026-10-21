import Package from '../models/Package.js';

export const getPackages = async (req, res, next) => {
  try {
    const packages = await Package.find().sort({ createdAt: 1 });
    res.json({ success: true, count: packages.length, data: packages });
  } catch (error) {
    next(error);
  }
};

export const createPackage = async (req, res, next) => {
  try {
    const { name, badge, price, period, description, deliverablesSummary, features, isPopular } = req.body;

    if (!name || !price) {
      return res.status(400).json({ success: false, message: 'Package name and price are required' });
    }

    const pkg = await Package.create({
      name,
      badge: badge || '',
      price,
      period: period || 'Full Event',
      description: description || '',
      deliverablesSummary: deliverablesSummary || '',
      features: Array.isArray(features) ? features : [],
      isPopular: !!isPopular,
    });

    res.status(201).json({ success: true, data: pkg });
  } catch (error) {
    next(error);
  }
};

export const updatePackage = async (req, res, next) => {
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }

    res.json({ success: true, data: pkg });
  } catch (error) {
    next(error);
  }
};

export const deletePackage = async (req, res, next) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }
    res.json({ success: true, message: 'Package deleted', data: { id: req.params.id } });
  } catch (error) {
    next(error);
  }
};
