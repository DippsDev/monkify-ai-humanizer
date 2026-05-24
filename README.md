# 🐵 Monkify

**Monkify** is a modern web application that helps students improve their writing by humanizing AI-generated text to sound more natural and authentic. It uses advanced back-translation and post-processing techniques to bypass AI detectors while maintaining professional academic tone.

## 🎯 How It Works (3-Line Summary)

**Light mode** uses Google Gemini AI for gentle humanization plus minimal post-processing (4 transformations). **Medium/Heavy modes** use back-translation chains (English → Japanese → Spanish/German/French → English) to naturally rephrase text by breaking AI patterns, followed by increasingly aggressive post-processing (9-12 transformations including paraphrasing, restructuring, and academic hedging). Every request produces unique output via seeded randomization, with grammar correction always applied at the end.

---

## 📚 Table of Contents

1. [Features](#-features)
2. [Tech Stack](#-tech-stack)
3. [Quick Start](#-quick-start)
4. [How to Use](#-how-to-use)
5. [Humanization System](#-humanization-system-detailed)
6. [Configuration History](#-configuration-history)
7. [Cost Breakdown](#-cost-breakdown)
8. [Project Structure](#-project-structure)
9. [API Endpoints](#-api-endpoints)
10. [Authentication System](#-authentication-system)
11. [Troubleshooting](#-troubleshooting)
12. [Best Practices](#-best-practices)

---

## ✨ Features

- **✍️ AI Humanizer** - Transform AI text into natural, human-sounding writing with 3 intensity modes (✅ **Implemented**)
- **🔄 Back-Translation** - Multi-language translation chains for natural paraphrasing (✅ **Implemented**)
- **🎯 Three Intensity Modes** - Light (AI), Medium (2-hop translation), Heavy (3-hop translation)
- **🔀 Unique Every Time** - Same input produces different outputs on each request
- **🔐 User Authentication** - Secure login with email/password or OAuth (Google, GitHub) (✅ **Implemented**)
- **👤 User Accounts** - Personal accounts with session management (✅ **Implemented**)
- **🤖 AI Detector** - Analyze text to identify AI-generated content (Coming soon)
- **📝 Plagiarism Checker** - Scan work for similarities (Coming soon)
- **💬 AI Chat** - Get writing assistance and refine ideas (Coming soon)
- **🔒 Privacy First** - Your text is never stored or shared

---

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **AI**: Google Gemini API (Light mode only)
- **Translation**: Google Translate API (Medium & Heavy modes)
- **Authentication**: [Supabase](https://supabase.com/) (Email/Password + OAuth)
- **Fonts**: Custom local fonts (Bungee, Fredoka)

---

## 📦 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/monkify.git
cd monkify
npm install
```

### 2. Get Your API Keys

#### Google Gemini API Key (Required for Light mode)

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy your API key (starts with `AIza...`)

#### Google Translate API Key (Required for Medium & Heavy modes)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "Cloud Translation API"
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy your API key
6. (Optional) Restrict key to "Cloud Translation API" only

**Free Tier**: 500,000 characters/month FREE
- ~125 heavy mode requests
- ~350 medium mode requests
- Perfect for personal/student use

**Paid Tier**: $20 per 1 million characters (only if you exceed free tier)

### 3. Configure Environment Variables

Open `.env.local` in the root directory and add:

```env
# Google Gemini API Key (for Light mode humanization)
GEMINI_API_KEY=your_gemini_api_key_here

# Google Translate API Key (for Medium & Heavy mode back-translation)
GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key_here

# Supabase Configuration (for user authentication)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set Up Supabase Authentication (Optional)

If you want user authentication:

1. **Create a Supabase project** at [supabase.com](https://supabase.com)
2. **Get your credentials**:
   - Go to Settings → API
   - Copy your Project URL and anon/public key
3. **Update `.env.local`** with your Supabase credentials
4. **Configure authentication**:
   - Go to Authentication → URL Configuration
   - Set Site URL to `http://localhost:3000`
   - Add Redirect URL: `http://localhost:3000/auth/callback`
5. **Optional: Enable OAuth providers** (Google, GitHub) in Authentication → Providers

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎯 How to Use

### Basic Usage

1. **Enter or paste** your AI-generated text in the textarea
2. **Select intensity mode**:
   - **Light**: Quick AI-based humanization (uses Gemini)
   - **Medium**: Back-translation + processing (recommended)
   - **Heavy**: Maximum variation for critical content
3. Click **"Monkify →"** to humanize the text
4. **View the result** with natural, human-sounding writing
5. **Copy to clipboard** or run again for different variation

### Intensity Modes Explained

| Mode | Processing | Best For | Human Score | Professionalism |
|------|------------|----------|-------------|-----------------|
| **Light** | AI only | Quick touch-ups | 75-85% | Very High |
| **Medium** | EN→JA→ES→EN + Processing | Most content (recommended) | 80-88% | High |
| **Heavy** | EN→JA→DE→FR→EN + Max Processing | Critical documents | 85-92% | Moderate-High |

---

## 🔄 Humanization System (Detailed)

### Current Configuration (Latest Update)

After extensive testing and refinement, the system now achieves the perfect balance between **professionalism**, **readability**, and **human score**.

#### **Grammar Errors** (Minimal)
- **Light**: 0.5% per sentence
- **Medium**: 0.8% per sentence
- **Heavy**: 1.2% per sentence
- **Only 2 subtle error types**: its/it's, then/than
- **15% chance within affected sentences**

#### **Spelling Errors** (Increased for Natural Feel)
- **Light**: 4% per word
- **Medium**: 6% per word
- **Heavy**: 10% per word
- **Less disruptive than grammar errors**

#### **Conversational Tone** (Professional Only)
- **Frequency**: 8%
- **Phrases**: "Research suggests that", "Studies indicate that", "Evidence shows that"

#### **Self-Corrections** (Minimal)
- **Frequency**: 6%
- **Phrases**: "—that is to say,", "—or rather,"

#### **Trailing Thoughts** (Removed)
- **Frequency**: 0% (completely removed for professionalism)

#### **Parenthetical Asides** (Removed)
- **Frequency**: 0% (completely removed for professionalism)

#### **Sentence Structure Breaks** (Professional)
- **Frequency**: 20%
- **Uses**: Dashes and semicolons (professional)

#### **Natural Redundancy** (Minimal)
- **Frequency**: 8%
- **Phrases**: "generally", "typically", "often"

#### **Contractions** (Moderate)
- **Frequency**: 40% conversion rate
- **Examples**: "it's", "don't", "can't", "won't"

### Three-Stage Processing Pipeline

**Stage 1: Back-Translation (Medium & Heavy modes only)**
- Naturally paraphrases text through multi-language translation chains
- Medium: EN → JA → ES → EN
- Heavy: EN → JA → DE → FR → EN

**Stage 2: AI Processing (Light mode only)**
- Uses Google Gemini Flash API for gentle humanization
- Maintains professional tone while making text more natural

**Stage 3: Post-Processing (All modes)**
- Light: 4 transformations (punctuation, personal touches, paragraph rewrites)
- Medium: 11 transformations (adds paraphrasing 40%, restructuring, transitions, hedging)
- Heavy: 13 transformations (paraphrasing 60%, imperfections, formatting variations)

### Example Transformation

**Input (AI-Generated):**
```
Artificial intelligence is important for modern technology. 
It can process data efficiently. Therefore, companies should 
use AI solutions.
```

**Output (Medium Mode - Professional):**
```
Artificial intelligence demonstrates considerable significance 
for contemporary technology. This system generally possesses 
the capability to process data efficiently. Consequently, 
organizations may benefit from implementing AI solutions.
```

**What Changed:**
- ✅ Natural paraphrasing through translation
- ✅ Professional vocabulary (important → considerable significance)
- ✅ Professional filler ("generally")
- ✅ Structural variation (It can → This system possesses the capability)
- ✅ Minimal spelling errors (natural typos)
- ✅ Very few grammar errors (subtle)
- ✅ Meaning perfectly preserved

---

## 📖 Configuration History

The humanization system has evolved through extensive testing to achieve the perfect balance. Here's the journey:

### Update 1: AI Detection Bypass
**Problem**: Text was getting detected as 100% AI-generated.

**Solution**: Implemented 6 aggressive humanization functions:
- `addConversationalTone()` - Personal pronouns and starters
- `addIncompleteThoughts()` - Self-corrections and trailing thoughts
- `breakPerfectStructures()` - Dashes, semicolons, parenthetical asides
- `addMoreContractions()` - 60% conversion rate
- `varySentenceBeginnings()` - Prevents repetitive starts
- `addNaturalRedundancy()` - Filler words

**Result**: Human score increased from 0% to 55-70%

### Update 2: Human Score Boost
**Problem**: Human score was only 55%, needed 70%+.

**Solution**: Doubled all humanization frequencies:
- Conversational tone: 15% → 30%
- Self-corrections: 8% → 15%
- Trailing thoughts: 6% → 12%
- Structure breaks: 20% → 35%
- Parenthetical asides: 10% → 18%
- Natural redundancy: 10% → 20%

**Result**: Human score increased to 97%

### Update 3: Introduction Clarity Fix
**Problem**: 97% human score achieved, but introduction was unclear.

**Solution**: Protected first paragraph from aggressive humanization:
- All aggressive functions skip paragraph 0
- `rewriteFirstParagraph()` simplified to only remove contrasting words
- Body paragraphs maintain full humanization

**Result**: Clear introduction + 97% human score maintained

### Update 4: Error Reduction
**Problem**: Too many spelling and grammar errors made text hard to read.

**Solution**: Dramatically reduced error rates:
- Spelling: 8-25% → 2-8% per word (68-75% reduction)
- Grammar: 25-55% → 8-18% per sentence (67-70% reduction)
- Errors per sentence: 2-4 → 1-2 (50% reduction)

**Key Insight**: Errors are NOT the main driver of human score. Contractions, varied structures, and natural flow are.

**Result**: Much cleaner text, human score maintained at 85-97%

### Update 5: Professionalism Fix (First Pass)
**Problem**: Text had too many connecting words and casual phrases.

**Solution**: Reduced casual elements:
- Conversational starters: 30% → 10%
- Casual transitions: 25% → 5%
- Self-corrections: 15% → 6%
- Trailing thoughts: 12% → 0%
- Parenthetical asides: 18% → 10%
- Filler words: 20% → 15%

**Result**: More professional, human score 85-92%

### Update 6: Grammar/Spelling Balance
**Problem**: Still too many grammar errors, needed more spelling errors instead.

**Solution**: Further adjusted error rates:
- Grammar: 8-18% → 1-3% per sentence (further reduced)
- Spelling: 2-8% → 3-8% per word (slightly increased)

**Result**: Better readability, human score maintained

### Update 7: Final Professionalism Update (Current)
**Problem**: Text still too casual for academic/professional use.

**Solution**: Final refinements for maximum professionalism:
- Conversational tone: 10% → 8% (only academic phrases)
- Self-corrections: 6% → 6% (kept minimal)
- Trailing thoughts: 0% → 0% (kept removed)
- Parenthetical asides: 10% → 0% (completely removed)
- Structure breaks: 35% → 20% (reduced)
- Natural redundancy: 15% → 8% (reduced)
- Contractions: 60% → 40% (reduced)
- Grammar: 1-3% → 0.5-1.2% per sentence (further reduced)
- Spelling: 3-8% → 4-10% per word (increased)

**Result**: **Professional, formal text with 75-88% human score**

### Current State: Perfect Balance

| Metric | Value | Status |
|--------|-------|--------|
| Grammar errors | 0.5-1.2% | ✅ Minimal |
| Spelling errors | 4-10% | ✅ Natural |
| Conversational tone | 8% | ✅ Professional |
| Natural redundancy | 8% | ✅ Minimal |
| Contractions | 40% | ✅ Moderate |
| Varied structures | 20% | ✅ Professional |
| Human score | 75-88% | ✅ Good |
| Readability | Excellent | ✅ High |
| Professionalism | Very High | ✅ High |

---

## 💰 Cost Breakdown

### Google Translate API Pricing

**Free Tier:**
- 500,000 characters/month FREE
- ~125 heavy mode requests (4,000 chars each)
- ~350 medium mode requests (1,500 chars each)
- Perfect for personal/student use

**Paid Tier:**
- $20 per 1 million characters
- Only charged if you exceed free tier

### Example Monthly Costs

```
Light Usage (10 requests/day, medium mode):
  10 × 30 × 500 × 3 = 450,000 chars/month
  Cost: $0 (within free tier!)

Moderate Usage (30 requests/day, medium mode):
  30 × 30 × 800 × 3 = 2.16M chars/month
  Cost: ~$33/month

Heavy Usage (50 requests/day, heavy mode):
  50 × 30 × 1000 × 4 = 6M chars/month
  Cost: ~$110/month
```

### Cost Optimization Tips

1. Use **Medium mode** as default (best quality/cost balance)
2. Reserve **Heavy mode** for critical documents
3. Use **Light mode** for quick touch-ups (no translation cost)
4. Set usage quotas in Google Cloud Console
5. Monitor usage weekly

---

## 📁 Project Structure

```
monkify/
├── app/
│   ├── api/
│   │   └── humanize/
│   │       └── route.ts            # Humanization API with back-translation
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts            # OAuth callback handler
│   ├── components/
│   │   ├── Navbar.tsx              # Navigation bar with user profile
│   │   ├── LoginModal.tsx          # Login modal with auth
│   │   ├── SignUpModal.tsx         # Sign up modal with auth
│   │   ├── ForgotPasswordModal.tsx # Password reset modal
│   │   ├── TestimonialsMarquee.tsx # Scrolling testimonials
│   │   └── FAQ.tsx                 # FAQ accordion
│   ├── signup/
│   │   └── page.tsx                # Sign up page
│   ├── layout.tsx                  # Root layout with AuthProvider
│   ├── page.tsx                    # Home page
│   └── globals.css                 # Global styles
├── lib/
│   ├── supabase/
│   │   ├── client.ts               # Browser Supabase client
│   │   ├── server.ts               # Server Supabase client
│   │   └── middleware.ts           # Session management
│   └── auth/
│       └── AuthContext.tsx         # Auth state provider
├── public/
│   └── fonts/                      # Custom fonts (Bungee, Fredoka)
├── middleware.ts                   # Session refresh middleware
├── .env.local                      # Environment variables (API keys)
└── README.md                       # This file
```

---

## 🔑 API Endpoints

### POST /api/humanize

Humanize AI-generated text with three intensity modes.

**Request:**
```typescript
{
  "text": "Your AI-generated text here",
  "intensity": "light" | "medium" | "heavy"
}
```

**Response:**
```typescript
{
  "success": true,
  "originalText": "...",
  "humanizedText": "...",
  "originalLength": 100,
  "humanizedLength": 105,
  "intensity": "medium"
}
```

**Processing Time:**
- Light: 1-3 seconds (AI processing)
- Medium: 2-4 seconds (2-hop translation + processing)
- Heavy: 4-8 seconds (3-hop translation + max processing)

---

## 🔐 Authentication System

### Features
- ✅ Email/Password registration with email verification
- ✅ Secure login with session management
- ✅ Password reset functionality
- ✅ Google OAuth (requires configuration)
- ✅ GitHub OAuth (requires configuration)
- ✅ Automatic session refresh
- ✅ User profile display in navbar

### Using Authentication

**Sign Up:**
1. Click "Sign Up" in the navbar
2. Enter your name, email, and password
3. Check your email for verification link
4. Click the link to verify your account

**Login:**
1. Click "Login" in the navbar
2. Enter your email and password
3. Or use Google/GitHub OAuth (if configured)

**Password Reset:**
1. Click "Forgot password?" on login modal
2. Enter your email
3. Check your email for reset link
4. Follow the link to set a new password

**Sign Out:**
1. Click your profile icon in the navbar
2. Click "Sign Out"

---

## 🐛 Troubleshooting

### "API key not configured" error
- Ensure you've added both API keys to `.env.local`
- Restart the development server after adding keys
- For Light mode: Check `GEMINI_API_KEY`
- For Medium/Heavy modes: Check `GOOGLE_TRANSLATE_API_KEY`

### "Failed to humanize text" error
- Check your internet connection
- Verify API keys are valid in respective consoles
- Check if you've exceeded rate limits (wait and retry)
- Review server logs for detailed error messages

### Translation seems off
- Try Medium mode instead of Heavy (fewer translation hops)
- Review output and manually adjust if needed
- Avoid highly technical jargon that may not translate well

### Text is too long
- Maximum text length is 10,000 characters
- Break longer texts into smaller chunks
- Process paragraphs separately for better results

### Too expensive
- Use Medium mode instead of Heavy
- Use Light mode for quick fixes (no translation cost)
- Set usage quotas in Google Cloud Console
- Monitor usage in Google Cloud Dashboard

### Output too different from input
- Use Light mode for conservative changes
- Medium mode for balanced transformation
- Heavy mode only for critical content needing maximum variation

### Text still too casual
- The system is now optimized for professional writing
- Light intensity provides maximum professionalism (75-85% human score)
- Medium intensity balances professionalism and human score (80-88%)
- Heavy intensity prioritizes human score over formality (85-92%)

---

## 🎓 Best Practices

### For Maximum Professionalism
1. Use **Light intensity**
2. Minimal casual elements (8% conversational, 0% trailing thoughts)
3. Very professional tone
4. Human score: 75-85%
5. Perfect for academic papers, business documents

### For Balanced Approach
1. Use **Medium intensity**
2. Low casual elements (8% conversational, 6% self-corrections)
3. Professional but natural
4. Human score: 80-88%
5. Perfect for most professional writing

### For Maximum Human Score
1. Use **Heavy intensity**
2. Moderate casual elements
3. Natural and conversational
4. Human score: 85-92%
5. Perfect for content writing, blogs

### For Quality
1. Review output for meaning preservation
2. Check professional tone is maintained
3. Fix any translation artifacts if needed
4. Verify facts and context unchanged

---

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

---

## 🚧 Roadmap

- [x] AI text humanization with Google Gemini
- [x] Back-translation with multi-language chains
- [x] Three intensity modes (Light, Medium, Heavy)
- [x] Unique output on every request
- [x] Real-time processing with loading states
- [x] Copy to clipboard functionality
- [x] User authentication (Email/Password + OAuth)
- [x] User session management
- [x] Password reset functionality
- [x] Professional tone optimization
- [x] Error rate balancing
- [x] Introduction clarity protection
- [ ] File upload support (.txt, .docx, .pdf)
- [ ] AI detection integration
- [ ] Plagiarism checking
- [ ] User dashboard with usage analytics
- [ ] Save and manage humanized texts
- [ ] Multiple language support
- [ ] Custom translation chain selection
- [ ] Quality scoring system
- [ ] Batch processing endpoint

---

## 🤝 Contributing

This is a learning project. Feel free to fork and experiment!

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Built with ❤️ as a learning project to master modern web development and AI integration.

---

## 🙏 Acknowledgments

- Google Gemini API for AI text processing
- Google Translate API for back-translation
- Design inspiration from modern SaaS landing pages
- Custom fonts: Bungee and Fredoka from Google Fonts
- Icons: Heroicons

---

**Ready to humanize some text?** Get your API keys and start transforming AI writing into natural, human-sounding content that bypasses AI detectors! 🚀
