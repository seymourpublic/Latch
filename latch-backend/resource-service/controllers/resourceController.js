const Resource = require('../models/Resource');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

exports.uploadResource = [
  upload.single('file'),
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const fileUrl = path.join('uploads', req.file.filename);
      const isImage = req.file.mimetype.startsWith('image/');
      const newResource = new Resource({ title, description, fileUrl, isImage, uploader: req.user._id });
      await newResource.save();
      res.status(201).json(newResource);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find().populate('uploader', 'name');
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id).populate('uploader', 'name');
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    fs.unlinkSync(resource.fileUrl);
    await resource.remove();
    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
