import Message from '../models/Message.js';

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const addMessage = async (req, res) => {
  const { sender, text } = req.body;
  try {
    const newMessage = new Message({ sender, text });
    await newMessage.save();
    res.status(201).json('Message sent');
  } catch (err) {
    res.status(500).json(err.message);
  }
};
