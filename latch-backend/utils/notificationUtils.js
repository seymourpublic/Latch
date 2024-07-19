const Notification = require('../models/Notification');

exports.sendNotification = async (userId, type, message) => {
  try {
    const notification = new Notification({ userId, type, message });
    await notification.save();

    const io = require('../app').get('socketio');
    io.to(userId).emit('newNotification', notification);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};
