const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location, organizer } = req.body;
    const newEvent = new Event({ title, description, date, location, organizer });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'name').populate('attendees', 'name');
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizer', 'name').populate('attendees', 'name');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.rsvpEvent = async (req, res) => {
  try {
    const { eventId, userId } = req.body;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (!event.attendees.includes(userId)) {
      event.attendees.push(userId);
      await event.save();
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
