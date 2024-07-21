const Mentorship = require('../models/Mentorship');

exports.createMentorship = async (req, res) => {
  try {
    const { mentor, mentee, startDate, endDate, goals } = req.body;
    const newMentorship = new Mentorship({ mentor, mentee, startDate, endDate, goals });
    await newMentorship.save();
    res.status(201).json(newMentorship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMentorships = async (req, res) => {
  try {
    const mentorships = await Mentorship.find().populate('mentor', 'name').populate('mentee', 'name');
    res.status(200).json(mentorships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMentorshipById = async (req, res) => {
  try {
    const mentorship = await Mentorship.findById(req.params.id).populate('mentor', 'name').populate('mentee', 'name');
    if (!mentorship) {
      return res.status(404).json({ message: 'Mentorship not found' });
    }
    res.status(200).json(mentorship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMentorship = async (req, res) => {
  try {
    const { startDate, endDate, goals, status } = req.body;
    const mentorship = await Mentorship.findByIdAndUpdate(req.params.id, { startDate, endDate, goals, status }, { new: true });
    if (!mentorship) {
      return res.status(404).json({ message: 'Mentorship not found' });
    }
    res.status(200).json(mentorship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMentorship = async (req, res) => {
  try {
    const mentorship = await Mentorship.findById(req.params.id);
    if (!mentorship) {
      return res.status(404).json({ message: 'Mentorship not found' });
    }
    await mentorship.remove();
    res.status(200).json({ message: 'Mentorship deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
