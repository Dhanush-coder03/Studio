import ContactInfo from '../models/ContactInfo.js';
import Inquiry from '../models/Inquiry.js';
import { initialContactInfo } from '../data/initialData.js';

// ==========================================
// Studio Contact Info
// ==========================================
export const getContactInfo = async (req, res, next) => {
  try {
    let info = await ContactInfo.findOne();
    if (!info) {
      info = await ContactInfo.create(initialContactInfo);
    }
    res.json({ success: true, data: info });
  } catch (error) {
    next(error);
  }
};

export const updateContactInfo = async (req, res, next) => {
  try {
    let info = await ContactInfo.findOne();
    if (!info) {
      info = await ContactInfo.create({ ...initialContactInfo, ...req.body });
    } else {
      Object.assign(info, req.body);
      await info.save();
    }
    res.json({ success: true, message: 'Studio contact info updated', data: info });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Inquiries & Leads
// ==========================================
export const getInquiries = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status && status !== 'All') {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { phone: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { eventType: new RegExp(search, 'i') },
      ];
    }

    const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    next(error);
  }
};

export const createInquiry = async (req, res, next) => {
  try {
    const { name, phone, email, weddingDate, eventType, packageInterested, location, message, status } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Client name and phone number are required' });
    }

    const inquiry = await Inquiry.create({
      name,
      phone,
      email: email || '',
      weddingDate: weddingDate || '',
      eventType: eventType || 'Traditional Tamil Wedding',
      packageInterested: packageInterested || '',
      location: location || '',
      message: message || '',
      status: status || 'New',
      dateReceived: new Date().toLocaleString(),
    });

    res.status(201).json({ success: true, message: 'Inquiry submitted successfully', data: inquiry });
  } catch (error) {
    next(error);
  }
};

export const updateInquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const inquiry = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    res.json({ success: true, message: `Status updated to ${status}`, data: inquiry });
  } catch (error) {
    next(error);
  }
};

export const deleteInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findByIdAndDelete(id);

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    res.json({ success: true, message: 'Inquiry removed', data: { id } });
  } catch (error) {
    next(error);
  }
};
