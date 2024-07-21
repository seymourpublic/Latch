const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const { title, description, company, location, salary } = req.body;
    const newJob = new Job({ title, description, company, location, salary, postedBy: req.user._id });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'name');
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const { title, description, company, location, salary } = req.body;
    const job = await Job.findByIdAndUpdate(req.params.id, { title, description, company, location, salary }, { new: true });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    await job.remove();
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
