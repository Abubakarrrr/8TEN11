// // const ChatRoom = require("../models/ChatRoom");
// // const ChatMessage = require("../models/ChatMessage");

// // Get existing or create new chat room for a course
// exports.getOrCreateRoom = async (req, res) => {
//   let room = await ChatRoom.findOne({ course: req.params.courseId });
//   if (!room) room = await ChatRoom.create({ course: req.params.courseId });
//   res.json(room);
// };

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
