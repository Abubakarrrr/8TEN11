// const ChatMessage = require("../models/ChatMessage");

// // Get messages for a chat room
// exports.getMessages = async (req, res) => {
//   const messages = await ChatMessage.find({ room: req.params.roomId }).populate(
//     "sender",
//     "name"
//   );
//   res.json(messages);
// };

// // Send a new message
// exports.sendMessage = async (req, res) => {
//   try {
//     const { roomId, message } = req.body;
//     const msgDoc = await ChatMessage.create({
//       room: roomId,
//       sender: req.user.id,
//       message,
//     });
//     // Optionally emit via socket.io here or in socket handler
//     res.status(201).json(msgDoc);
//   } catch (err) {
//     res.status(500).json({ msg: "Message send failed" });
//   }
// };
