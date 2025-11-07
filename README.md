# AI Story Generator - Squibler Clone

An AI-powered story generation tool built with Next.js and Google Gemini API.

## Features

- 🤖 AI content generation using Gemini 2.0 Flash Exp
- 📄 File upload support for draft text
- 💾 Copy and download generated content
- 📱 Responsive design
- 🎨 Modern UI with shadcn/ui components

## Tech Stack

- **Framework**: Next.js 16.0 + React 19.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **AI API**: Google Gemini API

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Google Gemini API Key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/woody20250319-ui/cloneweb.git
cd cloneweb
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Gemini API key:
```
GEMINI_API_KEY=your_actual_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variable `GEMINI_API_KEY` in Vercel project settings
4. Deploy

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key | Yes |

Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey).

## Usage

1. Enter your story prompt in the text area
2. (Optional) Upload a draft text file using "Import draft"
3. Click "Generate" to create AI-generated content
4. View, copy, or download the generated story

## License

MIT
