import { getChatHistory, saveChatMessage } from "../model/ChatMessage.js";
import { getBotReply } from "../services/openRouterService.js";

export const chatWithBot = async (req, res) => {
  const { message } = req.body;
  const userId = req.headers["user-id"];
  if (!message || !userId)
    return res.status(400).json({ error: "Missing message or user ID" });

  const reply = await getBotReply(message);
  const timestamp = new Date();

  await saveChatMessage(userId, { role: "user", text: message, timestamp });
  await saveChatMessage(userId, { role: "bot", text: reply, timestamp });

  return res.status(200).json({
    response: 200,
    msg: "Ai Replied Succesfully",
    success: true,
    data: reply,
  });
};

export const getChatHistoryController = async (req, res) => {
  const userId = req.headers["user-id"];
  if (!userId) return res.status(400).json({ error: "Missing user ID" });

  const history = await getChatHistory(userId);
  return res.status(200).json({
    response: 200,
    msg: "Fetch History of Chat Successfully!",
    success: true,
    data: history,
  });
};
