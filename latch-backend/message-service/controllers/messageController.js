const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;
    const newMessage = new Message({ sender, receiver, content });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessagesByUser = async (req, res) => {
  try {
    const messages = await Message.find({ 
      $or: [{ sender: req.params.userId }, { receiver: req.params.userId }] 
    }).populate('sender', 'name').populate('receiver', 'name');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id).populate('sender', 'name').populate('receiver', 'name');
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    await message.remove();
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
