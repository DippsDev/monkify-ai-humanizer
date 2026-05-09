# 🐵 Monkify

**Monkify** is a modern web application designed to help students improve their writing by detecting AI-generated content and humanizing text to sound more natural and authentic.

## ✨ Features

- **🤖 AI Detector** - Analyze text to identify AI-generated content with detailed breakdowns
- **✍️ AI Humanizer** - Transform AI text into natural, human-sounding writing
- **📝 Plagiarism Checker** - Scan work for similarities and avoid duplicate content
- **💬 AI Chat** - Get writing assistance, improve drafts, and refine ideas
- **🎯 Real-time Analysis** - See exactly which parts of your text need improvement
- **🔒 Privacy First** - Your text is never stored or shared

## 🎨 Design

Monkify features a clean, modern design with:
- **Amber/Orange Theme** - Warm, inviting color palette
- **Custom Typography** - Bungee font for headings, Fredoka for body text
- **Smooth Animations** - Marquee testimonials and accordion FAQs
- **Responsive Layout** - Works seamlessly on desktop and mobile

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Fonts**: Custom local fonts (Bungee, Fredoka)
- **Deployment**: Optimized for Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/monkify.git
   cd monkify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
monkify/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx              # Navigation bar
│   │   ├── LoginModal.tsx          # Login modal component
│   │   ├── TestimonialsMarquee.tsx # Scrolling testimonials
│   │   └── FAQ.tsx                 # Accordion FAQ section
│   ├── signup/
│   │   └── page.tsx                # Sign up page
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Home page
│   └── globals.css                 # Global styles
├── public/
│   └── fonts/                      # Custom fonts
└── README.md
```

## 🎯 Key Sections

### Hero Section
- Eye-catching headline with call-to-action
- Text input area with file upload
- Trusted by indicators (Originality.ai, Scribbr, GPTZero)

### Before/After Comparison
- Visual demonstration of AI vs humanized text
- Color-coded highlights for easy understanding

### AI Detection Demo
- Live analysis report with percentage breakdowns
- Visual progress indicators

### Testimonials
- Animated marquee with student reviews
- Pause on hover functionality

### Features Grid
- Four main features with icons
- Clean card-based layout

### FAQ Section
- Expandable accordion with smooth animations
- Common questions about AI detection and humanization

## 🎨 Color Palette

- **Primary**: Amber/Orange (`#F97316`, `#FED7AA`)
- **Background**: White to Amber gradient
- **Text**: Gray scale (`#111827`, `#6B7280`)
- **Accents**: Orange (`#EA580C`)

## 🔤 Typography

- **Headings**: Bungee (Bold, Display)
- **Body**: Fredoka (Variable weight)

## 🌐 Pages

- **/** - Landing page with all sections
- **/signup** - Dedicated sign-up page with full form

## 📱 Responsive Design

Monkify is fully responsive with breakpoints for:
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

## 🤝 Contributing

This is a personal learning project. Feel free to fork and experiment!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Built with ❤️ as a learning project to master web development.

## 🙏 Acknowledgments

- Design inspiration from modern SaaS landing pages
- Custom fonts: Bungee and Fredoka from Google Fonts
- Icons: Heroicons

---

**Note**: This is a frontend demonstration project. Backend functionality for AI detection and text humanization is not implemented.
