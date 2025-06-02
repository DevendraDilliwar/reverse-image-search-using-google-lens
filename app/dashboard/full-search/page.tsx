'use client'

import { useState } from 'react'

export default function CopyrightChecker() {
  const [siteUrl, setSiteUrl] = useState('')
  const [routes, setRoutes] = useState<string[]>([])
  const [selectedRoutes, setSelectedRoutes] = useState<Set<string>>(new Set())

  const [images, setImages] = useState<string[]>([])
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set())

  const [results, setResults] = useState<Record<string, boolean>>({})
  const [loadingStep, setLoadingStep] = useState<'idle' | 'crawl' | 'scrape' | 'check'>('idle')

  const handleCrawl = async () => {
    setLoadingStep('crawl')
    const res = await fetch('/api/crawl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: siteUrl }),
    })
    const data = await res.json()
    setRoutes(data.urls || [])
    setSelectedRoutes(new Set())
    setImages([])
    setResults({})
    setLoadingStep('idle')
  }

  const handleScrape = async () => {
    setLoadingStep('scrape')
    const allImages = new Set<string>()
    for (const url of selectedRoutes) {
      const res = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      const data = await res.json()
      data.images?.forEach((img: string) => allImages.add(img))
    }
    setImages(Array.from(allImages))
    setSelectedImages(new Set())
    setResults({})
    setLoadingStep('idle')
  }

  const handleCheck = async () => {
    setLoadingStep('check')
    const res = await fetch('/api/tineye', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ images: Array.from(selectedImages) }),
    })
    const data = await res.json()
    setResults(data.results)
    setLoadingStep('idle')
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        🕵️‍♂️ Image Copyright Checker
      </h1>

      {/* STEP 1: Input URL and Crawl */}
      <div className="mb-4 flex gap-4">
        <input
          type="url"
          placeholder="https://example.com"
          value={siteUrl}
          onChange={(e) => setSiteUrl(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <button
          onClick={handleCrawl}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loadingStep === 'crawl' ? 'Crawling...' : 'Get URLs'}
        </button>
      </div>

      {/* STEP 2: Select Routes */}
      {routes.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-2 text-blue-800">Step 2: Select Routes</h2>
          <div className="flex justify-between items-center mb-2">
            <span>{selectedRoutes.size} selected</span>
            <button
              onClick={() => {
                const all = new Set(selectedRoutes.size === routes.length ? [] : routes)
                setSelectedRoutes(all)
              }}
              className="text-sm text-blue-600 underline"
            >
              {selectedRoutes.size === routes.length ? 'Unselect All' : 'Select All'}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {routes.map((route) => (
              <label key={route} className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-100">
                <input
                  type="checkbox"
                  checked={selectedRoutes.has(route)}
                  onChange={() => {
                    const updated = new Set(selectedRoutes)
                    updated.has(route) ? updated.delete(route) : updated.add(route)
                    setSelectedRoutes(updated)
                  }}
                />
                <span className="text-sm break-all">{route}</span>
              </label>
            ))}
          </div>
          <button
            onClick={handleScrape}
            disabled={selectedRoutes.size === 0}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loadingStep === 'scrape' ? 'Scraping...' : 'Scrape Selected Pages'}
          </button>
        </>
      )}

      {/* STEP 3: Select Images */}
      {images.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-blue-800">Step 3: Select Images</h2>
          <div className="flex justify-between items-center mb-2">
            <span>{selectedImages.size} selected</span>
            <button
              onClick={() => {
                const all = new Set(selectedImages.size === images.length ? [] : images)
                setSelectedImages(all)
              }}
              className="text-sm text-blue-600 underline"
            >
              {selectedImages.size === images.length ? 'Unselect All' : 'Select All'}
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {images.map((img, i) => (
              <div
                key={i}
                className={`relative rounded overflow-hidden border-2 ${
                  selectedImages.has(img) ? 'border-blue-500' : 'border-transparent'
                } cursor-pointer hover:scale-105 transition`}
                onClick={() => {
                  const updated = new Set(selectedImages)
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  updated.has(img) ? updated.delete(img) : updated.add(img)
                  setSelectedImages(updated)
                }}
              >
                <img src={img} alt={`img-${i}`} className="w-full h-28 object-cover" />
                {results[img] !== undefined && (
                  <span
                    className={`absolute bottom-1 left-1 px-2 py-0.5 text-xs font-bold rounded ${
                      results[img] ? 'bg-red-600' : 'bg-green-600'
                    } text-white`}
                  >
                    {results[img] ? 'Matches Found' : 'No Matches Found'}
                  </span>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={handleCheck}
            disabled={selectedImages.size === 0}
            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
          >
            {loadingStep === 'check' ? 'Checking...' : 'Check Copyright'}
          </button>
        </>
      )}
    </div>
  )
}
