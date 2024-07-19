const MentorshipRequest = require('../models/MentorshipRequest');
const { sendNotification } = require('../utils/notificationUtils');

exports.requestMentorship = async (req, res) => {
  try {
    const { mentorId, menteeId, message } = req.body;
    const newRequest = new MentorshipRequest({ mentorId, menteeId, message, status: 'pending' });
    await newRequest.save();

    await sendNotification(mentorId, 'mentorship_request', 'You have a new mentorship request');

    res.status(201).json({ message: 'Mentorship request sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.respondMentorshipRequest = async (req, res) => {
  try {
    const { requestId, response } = req.body;
    const request = await MentorshipRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    request.status = response;
    await request.save();

    await sendNotification(request.menteeId, 'mentorship_response', `Your mentorship request was ${response}`);

    res.status(200).json({ message: 'Response sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
