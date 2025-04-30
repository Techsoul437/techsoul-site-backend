import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId: String,
  role: String,
  text: String,
  timestamp: Date
});

const Chat = mongoose.model("Chat", chatSchema);

export const saveChatMessage = async (userId, message) => {
  await Chat.create({ userId, ...message });
};

export const getChatHistory = async (userId) => {
  return await Chat.find({ userId }).sort({ timestamp: 1 });
};
