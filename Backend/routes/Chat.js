import express from "express";
import { ThreadModel } from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";
const router = express.Router();

/* ================= TEST ================= */
router.post("/test", async (req, res) => {
  try {
    const thread = new ThreadModel({
      threadId: "abc",
      title: "Testing new thread2",
    });

    const response = await thread.save();
    res.send(response);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to save in db" });
  }
});

/* ================= GET ALL THREADS ================= */
router.get("/thread", async (req, res) => {
  try {
    const threads = await ThreadModel.find({}).sort({ updatedAt: -1 });
    // most recent threads first
    res.json(threads);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to fetch threads" });
  }
});

/* ================= GET SINGLE THREAD ================= */
router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    const thread = await ThreadModel.findOne({ threadId });

    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.json(thread.messages);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to fetch chat" });
  }
});

/* ================= DELETE THREAD ================= */
router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    const deletedThread = await ThreadModel.findOneAndDelete({ threadId });

    if (!deletedThread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.status(200).json({ success: "Thread deleted successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to delete thread" });
  }
});

/* ================= CHAT ================= */
router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({ error: "missing required fields" });
  }

  try {
    let thread = await ThreadModel.findOne({ threadId });

    if (!thread) {
      // create new thread
      thread = new ThreadModel({
        threadId,
        title: message,
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({ role: "user", content: message });
    }

    const assistantReply = await getOpenAIAPIResponse(message);

    thread.messages.push({
      role: "assistant",
      content: assistantReply,
    });

    thread.updatedAt = new Date();
    await thread.save();

    res.json({ reply: assistantReply });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "something went wrong" });
  }
});

export default router;
