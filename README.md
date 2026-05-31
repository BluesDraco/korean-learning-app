# 韩语学习日记 (Korean Learning Diary)

A comprehensive Korean language learning app featuring interactive lessons, SRS-based vocabulary review, AI-powered conversation practice, and more — all fronted by 토리 (Tori), your rabbit mascot study buddy.

## Features

- **每日学习** — Structured learning units with vocabulary, grammar, dictation, listening, and quizzes
- **SRS 间隔复习** — Spaced repetition system with forgetting curve tracking and memory health scoring
- **AI 情景对话** — Scenario-based conversation practice powered by DeepSeek
- **AI 语音对话** — Voice conversation with pronunciation feedback
- **视频跟读** — Shadow Korean YouTube videos with transcripts
- **绘本学习** — Picture book reading for beginner learners
- **单词本** — Personal vocabulary collection with word books and flashcard mode
- **学习统计** — XP/Level system, streaks, achievements, and learning analytics
- **KPOP 资讯** — Real-time K-pop news from Bilibili and Weibo
- **学习搭子** — Buddy matching system to find study partners
- **听写练习** — Dictation exercises with virtual Korean keyboard
- **手写识别** — AI-powered handwriting analysis
- **TOPIK 备考** — TOPIK test preparation materials
- **托里表情包** — Downloadable Tori sticker packs

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with CSS custom properties (light/dark mode)
- **Database:** Turso (libsql) with Dexie.js for client-side IndexedDB
- **Auth:** JWT via jose
- **AI:** DeepSeek V4 Flash for chat, translation, grammar analysis, handwriting
- **TTS:** Azure Cognitive Services + Qwen TTS + browser speechSynthesis fallback
- **Charts:** Recharts
- **Icons:** Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DEEPSEEK_CHAT_KEY` | DeepSeek API key for AI chat |
| `DEEPSEEK_NEWS_KEY` | DeepSeek API key for K-pop news |
| `DEEPSEEK_VOICE_KEY` | DeepSeek API key for voice conversation |
| `DASHSCOPE_API_KEY` | Alibaba DashScope key for Qwen TTS |
| `AZURE_TTS_KEY` | Azure Cognitive Services key for TTS |
| `AZURE_TTS_REGION` | Azure region (default: eastus) |
| `TURSO_URL` | Turso database URL |
| `TURSO_AUTH_TOKEN` | Turso auth token |
| `JWT_SECRET` | Secret key for JWT signing |
| `ADMIN_USER_ID` | Admin user ID (auto-set on register) |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── api/                # API routes (ai, admin, auth, buddy, tts, etc.)
│   ├── admin/              # Admin panel
│   ├── learn/              # Learning module
│   ├── review/             # SRS review
│   └── ...
├── components/             # Shared React components
├── data/                   # Static data (learning units, grammar, picture books)
├── lib/                    # Shared libraries (db, auth, srs, tts, gamification)
└── types/                  # TypeScript type definitions
```
