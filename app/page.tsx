"use client"

import { useState, useRef } from "react"
import { ChevronDown, Upload } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Home() {
  const [input, setInput] = useState("I want to write a")
  const [draftText, setDraftText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    const text = await file.text()
    setDraftText(text)
  }

  const handleGenerate = async () => {
    if (!input.trim()) {
      alert("Please enter a prompt")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input,
          draftText: draftText,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate content")
      }

      // 导航到结果页面
      router.push(`/result?content=${encodeURIComponent(data.content)}`)
    } catch (error) {
      console.error("Error:", error)
      alert(error instanceof Error ? error.message : "Failed to generate content")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-semibold text-gray-900">Squibler</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-1 text-gray-700 cursor-pointer hover:text-gray-900">
              <span>Squibler AI</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1 text-gray-700 cursor-pointer hover:text-gray-900">
              <span>Solutions</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1 text-gray-700 cursor-pointer hover:text-gray-900">
              <span>Resources</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <span className="text-gray-700 cursor-pointer hover:text-gray-900">Pricing</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-700 cursor-pointer hover:text-gray-900 text-sm">Log In</span>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
          AI Story Writer
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">Turn Your Idea into a Story</h1>

        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Write books, novels, and screenplays by chatting with AI. Say goodbye to writer's block.
        </p>

        {/* Input Form */}
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl p-8 mb-8 shadow-sm">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg p-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
            placeholder="I want to write a..."
          />

          {fileName && (
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-lg">
              <Upload className="w-4 h-4" />
              <span>Uploaded: {fileName}</span>
            </div>
          )}

          <div className="flex items-center justify-between mt-6">
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.md,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              <span>📎</span>
              Import draft
            </button>
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Generating..." : "Generate"}
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Suggestion Tags */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Tag label="Fiction book ideas" />
          <Tag label="Fantasy fiction ideas" />
          <Tag label="Horror script ideas" />
          <Tag label="Sci-fi novel ideas" />
        </div>

        {/* Users & Trust */}
        <div className="flex flex-col items-center gap-4 mb-16">
          <div className="flex -space-x-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"
              />
            ))}
          </div>
          <p className="text-gray-700 font-medium">
            <span className="font-bold">20,000+</span> Writers use Squibler
          </p>
        </div>

        {/* Brand Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 py-12 border-t border-b border-gray-200">
          <div className="text-gray-400 font-bold">WIRED</div>
          <div className="text-gray-400 font-bold">FAST COMPANY</div>
          <div className="text-gray-400 font-bold">BUSINESS INSIDER</div>
          <div className="text-gray-400 font-bold">Goodreads</div>
          <div className="text-gray-400 font-bold">THE NEXT WEB</div>
        </div>
      </div>

      {/* Templates Section */}
      <div className="bg-purple-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">What type of story are you writing?</h2>
          <p className="text-lg text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Pick the perfect template for you, then use our AI-assisted editor to develop your story.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <TemplateCard title="Fiction" image="🎭" />
            <TemplateCard title="Non-Fiction" image="📚" />
            <TemplateCard title="Short Story" image="📖" />
            <TemplateCard title="Script" image="🎬" />
            <TemplateCard title="Screenplay" image="🎞️" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">The AI Story Writer Built for Writers.</h2>

          <div className="space-y-8">
            <FeatureItem
              title="AI-Powered Writing"
              description="Get intelligent suggestions and content generation powered by advanced AI models trained on millions of stories."
            />
            <FeatureItem
              title="Multiple Templates"
              description="Choose from fiction, non-fiction, scripts, and more. Each template is optimized for its specific writing style."
            />
            <FeatureItem
              title="Collaborative Editing"
              description="Work with your AI writing partner to refine, edit, and improve your work in real-time."
            />
            <FeatureItem
              title="Easy Publishing"
              description="Publish your finished stories directly to major platforms or export in multiple formats."
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to start writing?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of writers already using Squibler to bring their stories to life.
          </p>
          <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-bold text-lg">
            Get Started Free
          </button>
        </div>
      </div>
    </div>
  )
}

function Tag({ label }: { label: string }) {
  return (
    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors font-medium text-sm flex items-center gap-1">
      {label}
      <span>↗</span>
    </button>
  )
}

function TemplateCard({ title, image }: { title: string; image: string }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 aspect-square flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
        {image}
      </div>
      <div className="p-4 text-center">
        <h3 className="font-bold text-gray-900">{title}</h3>
      </div>
    </div>
  )
}

function FeatureItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="border-l-4 border-blue-500 pl-6 py-4">
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-lg text-gray-600">{description}</p>
    </div>
  )
}
