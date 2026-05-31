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
| `JWT_SECRET` | Secret key for JWT signing (required, min 32 chars) |
| `DEEPSEEK_CHAT_KEY` | DeepSeek API key for AI chat |
| `DEEPSEEK_ANALYZE_KEY` | DeepSeek API key for grammar/word analysis |
| `DEEPSEEK_TRANSLATE_KEY` | DeepSeek API key for translation |
| `DEEPSEEK_VOICE_KEY` | DeepSeek API key for voice conversation |
| `DEEPSEEK_HANDWRITING_KEY` | DeepSeek API key for handwriting recognition |
| `DEEPSEEK_LOOKUP_KEY` | DeepSeek API key for dictionary lookup |
| `DEEPSEEK_NEWS_KEY` | DeepSeek API key for K-pop news generation |
| `DASHSCOPE_API_KEY` | Alibaba DashScope key for Qwen TTS |
| `TURSO_DATABASE_URL` | Turso database URL (leave empty for local SQLite) |
| `TURSO_AUTH_TOKEN` | Turso auth token |
| `ADMIN_USER_ID` | (Optional) User ID to auto-promote to admin |

## Database

The app supports two database modes:

- **Local SQLite** (default): Leave `TURSO_DATABASE_URL` empty. Data is stored at `data/app.db`.
- **Turso** (production): Set `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`. Run `npm run db:migrate` to initialize schema.

## Creating an Admin User

1. Register a normal account via the sign-up page
2. Copy your user ID from the admin users page or database
3. Set `ADMIN_USER_ID=<your-id>` in `.env.local` and restart the dev server
4. The admin panel is accessible at `/admin`

## Common Issues

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| Home page keeps spinning | Database connection failed | Check TURSO_URL / local SQLite |
| AI chat returns error | Missing DeepSeek API key | Set `DEEPSEEK_CHAT_KEY` in `.env.local` |
| No sound on click | TTS not configured | Falls back to browser speechSynthesis; ensure `ko-KR` voice is installed |
| API key not configured | `.env.example` keys not copied | Run `cp .env.example .env.local` and fill in values |
| Service Worker caches old version | Cache version mismatch | Hard-refresh (Ctrl+Shift+R) or clear site data |

## Deploying to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Important:** Set all environment variables in the Vercel dashboard (Settings → Environment Variables). For Turso, ensure the database URL and token are set. The build command is `npm run build` (Next.js default).

For file-based storage (local SQLite), note that Vercel's serverless functions have an ephemeral filesystem. Use Turso for production deployments.

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
