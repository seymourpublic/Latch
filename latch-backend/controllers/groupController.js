const Group = require('../models/Group');
const Post = require('../models/Post');

exports.createGroup = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newGroup = new Group({ name, description });
    await newGroup.save();
    res.status(201).json({ message: 'Group created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.joinGroup = async (req, res) => {
  try {
    const { groupId, userId } = req.body;
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    group.members.push(userId);
    await group.save();
    res.status(200).json({ message: 'Joined group' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.leaveGroup = async (req, res) => {
  try {
    const { groupId, userId } = req.body;
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    group.members = group.members.filter(member => member.toString() !== userId);
    await group.save();
    res.status(200).json({ message: 'Left group' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { userId, content } = req.body;
    const { groupId } = req.params;
    const newPost = new Post({ groupId, userId, content });
    await newPost.save();
    res.status(201).json({ message: 'Post created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { groupId } = req.params;
    const posts = await Post.find({ groupId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
