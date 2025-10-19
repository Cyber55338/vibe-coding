# 🚀 Vibe AI Game - Quick Start Guide

## Get Started in 60 Seconds

### Step 1: Start the Proxy (30 seconds)

```bash
cd demo
node api-proxy.js
```

You should see:
```
╔════════════════════════════════════════════════════════════╗
║              GROQ API PROXY SERVER RUNNING                 ║
╚════════════════════════════════════════════════════════════╝

🚀 Server listening on: http://localhost:3001
```

**If you see "API key not configured":**
```bash
export GROQ_API_KEY="your-key-here"
```

Get your free key at: https://console.groq.com/keys

---

### Step 2: Open the Game (10 seconds)

1. Open your browser
2. Navigate to: `demo/ai-game.html`
3. You'll see the Vibe game interface

---

### Step 3: Play! (20 seconds)

**Complete Lessons 1-5 (Traditional)**
- Multiple choice
- Drag & drop
- Context window
- Fill in the blank
- Best practices

**Try AI Lesson 6** (First AI challenge)
1. Read the instruction
2. Write a prompt in the textarea
3. Click "🤖 Test with AI"
4. Wait 2-3 seconds for AI response
5. See your evaluation results!

---

## Example First Prompt (Lesson 6)

**Task**: Create a Python prime number checker

**Try this prompt**:
```
Create a Python function called is_prime that takes an integer n
and returns True if it's prime, False otherwise. Handle edge cases
for numbers less than 2. Include a docstring.
```

Click "🤖 Test with AI" and watch the magic happen!

---

## What to Expect

### Traditional Lessons (1-5)
- Instant feedback
- Interactive challenges
- Learn prompt engineering basics

### AI Lessons (6-12)
- Real AI responses (1-2 seconds)
- Live code evaluation
- Progressive difficulty
- Helpful hints

---

## Scoring

- **50% or higher** = PASS ✅
- **Below 50%** = Try again with hints 💡

---

## Tips for Success

1. **Be specific** - Say exactly what you want
2. **Use hints** - Progressive hints guide you
3. **Iterate** - Try again with better prompts
4. **Learn** - Each attempt teaches you more

---

## Troubleshooting

### "Connection failed"
→ Make sure proxy is running: `node api-proxy.js`

### "API key not configured"
→ Set your Groq API key (see Step 1)

### "Request timed out"
→ Check internet connection, try again

### AI gives weird response
→ Use hints to improve your prompt!

---

## What You'll Learn

- How to write effective AI prompts
- What makes context engineering work
- How to iterate and improve
- Real-world prompt patterns

---

## File Locations

```
demo/
├── ai-game.html          ← OPEN THIS IN BROWSER
├── api-proxy.js          ← RUN THIS FIRST
├── AI_GAME_README.md     ← Full documentation
├── test-integration.sh   ← Test everything
└── QUICKSTART.md         ← You are here!
```

---

## Quick Test

**Verify everything works:**
```bash
cd demo
bash test-integration.sh
```

Should show: `ALL TESTS PASSED! ✅`

---

## Need Help?

1. Check `AI_GAME_README.md` for full docs
2. Review console for error messages
3. Try the example prompts from hints
4. Start with simpler prompts, then add details

---

## Progress Through the Game

1. **Lessons 1-5**: Learn the basics (5-10 minutes)
2. **Lesson 6**: First AI challenge - Function Generator
3. **Lesson 7**: Bug Detective - Find and fix bugs
4. **Lesson 8**: Code Explainer - Explain algorithms
5. **Lesson 9**: Refactoring - Improve code
6. **Lesson 10**: Test Generator - Create tests
7. **Lesson 11**: API Builder - Build endpoints
8. **Lesson 12**: Documentation - Write API docs

**Total time**: 30-45 minutes for all lessons

---

## Have Fun!

This is a **real AI learning experience**. Each prompt you write actually gets sent to an AI model, evaluated, and scored. You're not just clicking buttons - you're learning real prompt engineering skills!

**Ready? Let's go! 🎯**

1. `node demo/api-proxy.js` (in terminal)
2. Open `demo/ai-game.html` (in browser)
3. Start with Lesson 1!

---

**Questions?** Check `AI_GAME_README.md` for detailed docs.

**Found a bug?** Check console for errors, review troubleshooting section.

**Want more lessons?** The code is open - add your own in `ai-game.html`!

---

Good luck, and happy learning! 🚀
