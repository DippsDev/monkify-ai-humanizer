# 🐵 Monkify

**Monkify** is a modern web application that helps students improve their writing by humanizing AI-generated text to sound more natural and authentic. It uses advanced back-translation and post-processing techniques to bypass AI detectors while maintaining professional academic tone.

## 🎯 How It Works (3-Line Summary)

**Light mode** uses Google Gemini AI for gentle humanization plus minimal post-processing (4 transformations). **Medium/Heavy modes** use back-translation chains (English → Japanese → Spanish/German/French → English) to naturally rephrase text by breaking AI patterns, followed by increasingly aggressive post-processing (9-12 transformations including paraphrasing, restructuring, and academic hedging). Every request produces unique output via seeded randomization, with grammar correction always applied at the end.

## ✨ Features

- **✍️ AI Humanizer** - Transform AI text into natural, human-sounding writing with 3 intensity modes (✅ **Implemented**)
- **🔄 Back-Translation** - Multi-language translation chains for natural paraphrasing (✅ **Implemented**)
- **🎯 Three Intensity Modes** - Light (AI), Medium (2-hop translation), Heavy (3-hop translation)
- **🔀 Unique Every Time** - Same input produces different outputs on each request
- **🤖 AI Detector** - Analyze text to identify AI-generated content (Coming soon)
- **📝 Plagiarism Checker** - Scan work for similarities (Coming soon)
- **💬 AI Chat** - Get writing assistance and refine ideas (Coming soon)
- **🔒 Privacy First** - Your text is never stored or shared

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **AI**: Google Gemini API (Light mode only)
- **Translation**: Google Translate API (Medium & Heavy modes)
- **Fonts**: Custom local fonts (Bungee, Fredoka)

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
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

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

| Mode | Processing | Best For | Cost | Variation |
|------|------------|----------|------|-----------|
| **Light** | AI only | Quick touch-ups | Low | ~30% |
| **Medium** | EN→JA→ES→EN + Processing | Most content (recommended) | Medium | ~50-60% |
| **Heavy** | EN→JA→DE→FR→EN + Max Processing | Critical documents | High | ~70-80% |

### Example Transformation

**Input (AI-Generated):**
```
Artificial intelligence is important for modern technology. 
It can process data efficiently. Therefore, companies should 
use AI solutions.
```

**Output (Medium Mode):**
```
Artificial intelligence demonstrates considerable significance 
for contemporary technology. This system possesses the capability 
to process data efficiently, in many cases. Consequently, 
organizations may benefit from implementing AI solutions.
```

**What Changed:**
- ✅ Natural paraphrasing through translation
- ✅ Professional vocabulary (important → considerable significance)
- ✅ Academic hedging (should → may benefit, added "in many cases")
- ✅ Structural variation (It can → This system possesses the capability)
- ✅ Meaning perfectly preserved

## 🔄 How Back-Translation Works

### The Secret Sauce

```
Your Text
    ↓
Translate to Japanese (different grammar structure)
    ↓
Translate to Spanish/German (more variation)
    ↓
Translate back to English (naturally paraphrased!)
    ↓
Apply 9-12 post-processing transformations
    ↓
Human-sounding text that bypasses AI detectors
```

### Why This Works

1. **Breaks AI Patterns**: Translation disrupts typical AI fingerprints
2. **Natural Paraphrasing**: Real translation engines, not simple synonyms
3. **Structural Changes**: Different languages = different sentence structures
4. **Authentic Variation**: Each request produces unique output
5. **Maintains Meaning**: Professional translation preserves context

### Translation Chains

- **Medium Mode**: English → Japanese → Spanish → English (2 hops)
- **Heavy Mode**: English → Japanese → German → French → English (3 hops)

**Why these languages?**
- **Japanese**: Very different grammar (SOV vs SVO), forces restructuring
- **Spanish**: Different article usage and verb conjugations
- **German**: Complex compound words and word order
- **French**: Different idioms and formal/informal distinctions

### Fallback Behavior

If translation fails (no API key, API error, network issue):
- System logs warning
- Skips back-translation
- Proceeds directly to post-processing
- Still produces humanized output

## 🎨 Three-Stage Processing Pipeline

### Stage 1: Back-Translation (Medium & Heavy)
Naturally paraphrases text through multi-language translation chains.

### Stage 2: AI Processing (Light Only)
Uses Gemini AI for gentle humanization with professional tone.

### Stage 3: Post-Processing (All Modes)

**Light Mode (4 transformations):**
- Vary punctuation patterns
- Add personal touches
- Rewrite first paragraph
- Rewrite concluding paragraph

**Medium Mode (11 transformations):**
- Paraphrase sentences (40% word replacement)
- Restructure sentences
- Add academic transitions
- Vary rhythm and complexity
- Add academic hedging
- All light mode transformations

**Heavy Mode (13 transformations):**
- Paraphrase sentences (60% word replacement)
- Add natural imperfections
- Add formatting variations
- Add interjections
- All medium mode transformations

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

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
monkify/
├── app/
│   ├── api/
│   │   └── humanize/
│   │       └── route.ts            # Humanization API with back-translation
│   ├── components/
│   │   ├── Navbar.tsx              # Navigation bar
│   │   ├── LoginModal.tsx          # Login modal
│   │   ├── SignUpModal.tsx         # Sign up modal
│   │   ├── TestimonialsMarquee.tsx # Scrolling testimonials
│   │   └── FAQ.tsx                 # FAQ accordion
│   ├── signup/
│   │   └── page.tsx                # Sign up page
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Home page
│   └── globals.css                 # Global styles
├── public/
│   └── fonts/                      # Custom fonts (Bungee, Fredoka)
├── .env.local                      # Environment variables (API keys)
└── README.md                       # This file
```

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

## 🎨 Design System

### Color Palette
- **Primary**: Amber/Orange (`#F97316`, `#FED7AA`)
- **Background**: White to Amber gradient
- **Text**: Gray scale (`#111827`, `#6B7280`)
- **Accents**: Orange (`#EA580C`)

### Typography
- **Headings**: Bungee (Bold, Display)
- **Body**: Fredoka (Variable weight)

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

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

## 🔐 Security & Privacy

### API Key Security
- Never commit `.env.local` to version control (already in `.gitignore`)
- Keep your API keys private
- Rotate keys if accidentally exposed
- Restrict API keys to specific APIs in Google Cloud Console

### Usage Monitoring
1. Go to Google Cloud Console
2. Navigate to "APIs & Services" → "Dashboard"
3. View usage statistics and costs
4. Set up billing alerts

### Rate Limiting
Consider adding rate limiting to your API:
```typescript
// Example: 100 requests per hour per IP
const rateLimit = {
  windowMs: 60 * 60 * 1000,
  max: 100
};
```

## 🎯 Best Practices

### For Maximum AI Detection Bypass
1. Use **Heavy mode** for important content
2. Run same text 2-3 times, pick best result
3. Combine with light manual editing
4. Review for accuracy and meaning preservation

### For Cost Efficiency
1. Use **Medium mode** as default
2. Reserve Heavy mode for critical documents
3. Use Light mode for quick touch-ups
4. Batch process when possible

### For Quality
1. Review output for meaning preservation
2. Check professional tone is maintained
3. Fix any translation artifacts if needed
4. Verify facts and context unchanged

## 🚧 Roadmap

- [x] AI text humanization with Google Gemini
- [x] Back-translation with multi-language chains
- [x] Three intensity modes (Light, Medium, Heavy)
- [x] Unique output on every request
- [x] Real-time processing with loading states
- [x] Copy to clipboard functionality
- [ ] File upload support (.txt, .docx, .pdf)
- [ ] AI detection integration
- [ ] Plagiarism checking
- [ ] User authentication
- [ ] Usage analytics dashboard
- [ ] Multiple language support
- [ ] Custom translation chain selection
- [ ] Quality scoring system
- [ ] Batch processing endpoint

## 🤝 Contributing

This is a learning project. Feel free to fork and experiment!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Built with ❤️ as a learning project to master modern web development and AI integration.

## 🙏 Acknowledgments

- Google Gemini API for AI text processing
- Google Translate API for back-translation
- Design inspiration from modern SaaS landing pages
- Custom fonts: Bungee and Fredoka from Google Fonts
- Icons: Heroicons

## 📚 Technical Details

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

### Randomization System
Every request generates a unique seed based on timestamp + random component, ensuring the same input produces different outputs each time while maintaining consistency within a single request.

### Fallback Behavior
If translation fails (no API key, API error, network issue):
- System logs warning
- Skips back-translation
- Proceeds directly to post-processing
- Still produces humanized output

### Error Handling
- Translation failures don't crash the system
- Graceful fallback to post-processing only
- Detailed error logging for debugging
- User-friendly error messages

---

**Ready to humanize some text?** Get your API keys and start transforming AI writing into natural, human-sounding content that bypasses AI detectors! 🚀
