'use client'

import { useState } from 'react'

export default function Home() {
  const [url, setUrl] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(false)
  const [results, setResults] = useState<Record<string, boolean>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResults({})
    setSelected(new Set())

    const res = await fetch('/api/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })
    const data = await res.json()
    setImages(data.images || [])
    setLoading(false)
  }

  const toggleSelect = (img: string) => {
    const newSet = new Set(selected)
    newSet.has(img) ? newSet.delete(img) : newSet.add(img)
    setSelected(newSet)
  }

  const checkCopyright = async () => {
    setChecking(true)
    const res = await fetch('/api/tineye', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ images: Array.from(selected) }),
    })
    const data = await res.json()
    setResults(data.results)
    setChecking(false)
  }

  return (
    <main className="min-h-screen px-6 py-10 bg-gradient-to-tr from-slate-50 to-blue-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6">
          🖼️ Image Copyright Checker
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <input
            type="url"
            value={url}
            required
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL (https://...)"
            className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition"
          >
            {loading ? 'Scraping...' : 'Scrape Images'}
          </button>
        </form>

        {images.length > 0 && (
          <div className="text-center mb-6">
            <button
              disabled={selected.size === 0 || checking}
              onClick={checkCopyright}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                selected.size === 0 || checking
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white shadow-md'
              }`}
            >
              {checking ? 'Checking...' : 'Check Selected Images'}
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {images.map((img, i) => {
            const isSelected = selected.has(img)
            const isChecked = results[img]

            return (
              <div
                key={i}
                className={`relative cursor-pointer rounded-lg overflow-hidden shadow-lg transform transition hover:scale-105 border-2 ${
                  isSelected ? 'border-blue-600' : 'border-transparent'
                }`}
                onClick={() => toggleSelect(img)}
              >
                <img
                  src={img}
                  alt={`img-${i}`}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 left-2 bg-white bg-opacity-80 rounded-full p-1">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="w-5 h-5"
                  />
                </div>

                {results[img] !== undefined && (
                  <div
                    className={`absolute bottom-2 left-2 px-2 py-1 text-xs font-bold rounded ${
                      isChecked
                        ? 'bg-red-600 text-white'
                        : 'bg-green-600 text-white'
                    }`}
                  >
                    {isChecked ? 'COPYRIGHTED' : 'FREE'}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
