
const express = require("express");
const router = express.Router();
const info = require("../data/db.json");

router.get("/questions", (req,res) => {
    const questions = info.questions;
    if (!questions) return res.status(400).send("soru yok");

    let count = Number(req.query.count) || 10;
    if (count < 1) count = 10;
    else if (count > questions.length) count = questions.length;

    let shuffled = [...questions];
    for (let i=shuffled.length-1; i>0; i--) {
        let j = Math.floor(Math.random() * (i+1));
        let temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    let picked = shuffled.slice(0,count);
    let newPicked = picked.map(item => {
        return {
            id: item.id,
            question: item.question,
            options: item.options
        }
    })
    res.json(newPicked);
})

router.post("/quiz/submit", (req,res) => {
    const answers = req.body;
    let score = 0;
    answers.forEach(a => {
        const id = a.id;
        const q = info.questions.find(q => q.id == id);
        if (!q) return;
        if (a.selected == q.answerIndex) score++;
    })
    res.json({ score });
})




module.exports = router;