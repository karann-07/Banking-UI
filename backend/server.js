require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.OPENROUTER_API_KEY;

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
        model: "openrouter/auto",
        messages: [
                   {
              role: "system",
              content: `
              You are Bankmate AI, the official assistant of KVB Banking Web Application.

              About KVB Banking:
              - It offers Savings Accounts, Current Accounts, and Fixed Deposits.
              - Provides Home Loan, Car Loan, and Personal Loan.
              - Offers Internet Banking and Online Account Opening.
              - Users can locate branches and ATMs.
              - Provides card management and secure banking services.

              Rules:
              - Reply in maximum 2 short sentences.
              - Keep answers simple and easy.
              - Only answer related to banking and KVB services.
              - If question is unrelated, politely say you assist only with KVB banking services.
              `
            },
            { role: "user", content: userMessage }
        ]
    },
    {
       headers: {
    "Authorization": `Bearer ${API_KEY}`,
    "Content-Type": "application/json"
}
    }
);

        const aiReply = response.data.choices[0].message.content;

        res.json({ reply: aiReply });

    } catch (error) {
        console.log("ERROR:", error.response?.data || error.message);
        res.json({ reply: "AI is not responding. Check backend terminal." });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));