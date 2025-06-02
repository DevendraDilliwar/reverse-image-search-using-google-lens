import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

const TINEYE_API_URL = process.env.TINEYE_API_URL
const TINEYE_API_USERNAME = process.env.TINEYE_API_USERNAME!
const TINEYE_API_KEY = process.env.TINEYE_API_KEY!

export async function POST(req: NextRequest) {
  const { images } = await req.json()
  const results: Record<string, boolean> = {}

  for (const url of images) {
    try {
      const res = await axios.get(TINEYE_API_URL, {
        params: { url },
        auth: {
          username: TINEYE_API_USERNAME,
          password: TINEYE_API_KEY,
        },
      })

      const matches = res.data?.results?.matches || []
      results[url] = matches.length > 0 // true = found = copyrighted
    } catch (e) {
      console.error('TinEye error for', url, e)
      results[url] = false // treat as no result if error
    }
  }

  return NextResponse.json({ results })
}
