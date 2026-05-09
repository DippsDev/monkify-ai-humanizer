# 🐵 Monkify

**Monkify** is a modern web application that helps students improve their writing by humanizing AI-generated text to sound more natural and authentic.

## ✨ Features

- **✍️ AI Humanizer** - Transform AI text into natural, human-sounding writing (✅ **Implemented**)
- **🤖 AI Detector** - Analyze text to identify AI-generated content (Coming soon)
- **📝 Plagiarism Checker** - Scan work for similarities (Coming soon)
- **💬 AI Chat** - Get writing assistance and refine ideas (Coming soon)
- **🎯 Real-time Processing** - Instant text transformation
- **🔒 Privacy First** - Your text is never stored or shared

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **AI**: Google Gemini API (Free tier)
- **Fonts**: Custom local fonts (Bungee, Fredoka)

## 📦 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/monkify.git
cd monkify
npm install
```

### 2. Get Your Free Google Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy your API key (starts with `AIza...`)

### 3. Configure Environment Variables

1. Open `.env.local` in the root directory
2. Add your API key:
   ```env
   GEMINI_API_KEY=AIzaSyC...your_actual_key_here
   ```
3. Save the file

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 How to Use

1. **Enter or paste** your AI-generated text in the textarea
2. Click **"Monkify →"** to humanize the text
3. **View the result** below with natural, human-sounding writing
4. **Copy to clipboard** or start over with new text

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
│   │       └── route.ts            # Humanization API endpoint
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
└── README.md
```

## 🔑 API Configuration

### Google Gemini Free Tier Limits

- **Requests per minute**: 60
- **Requests per day**: 1,500
- **Cost**: FREE
- **Text limit**: 10,000 characters per request

Perfect for development, testing, and small-scale production use!

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
- Ensure you've added your API key to `.env.local`
- Restart the development server after adding the key

### "Failed to humanize text" error
- Check your internet connection
- Verify your API key is valid at [Google AI Studio](https://aistudio.google.com/app/apikey)
- Check if you've exceeded rate limits (wait a minute and retry)

### Text is too long
- Maximum text length is 10,000 characters
- Break longer texts into smaller chunks

## 🔐 Security Notes

- Never commit `.env.local` to version control (already in `.gitignore`)
- Keep your API key private
- Rotate your API key if accidentally exposed

## 🚧 Roadmap

- [x] AI text humanization with Google Gemini
- [x] Real-time processing with loading states
- [x] Copy to clipboard functionality
- [ ] File upload support (.txt, .docx, .pdf)
- [ ] AI detection integration
- [ ] Plagiarism checking
- [ ] User authentication
- [ ] Usage analytics dashboard
- [ ] Multiple language support

## 🤝 Contributing

This is a learning project. Feel free to fork and experiment!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Built with ❤️ as a learning project to master modern web development.

## 🙏 Acknowledgments

- Google Gemini API for free AI text processing
- Design inspiration from modern SaaS landing pages
- Custom fonts: Bungee and Fredoka from Google Fonts
- Icons: Heroicons

---

**Ready to humanize some text?** Get your free API key and start transforming AI writing! 🚀
