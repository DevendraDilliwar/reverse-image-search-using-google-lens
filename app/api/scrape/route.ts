import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { URL } from 'url'

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()

    if (!url || !url.startsWith('http')) {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
    }

    const response = await axios.get(url)
    const $ = cheerio.load(response.data)

    const baseUrl = new URL(url).origin
    const images: string[] = []

    $('img').each((_, el) => {
      let src = $(el).attr('src')
      if (src) {
        if (src.startsWith('//')) src = 'https:' + src
        else if (src.startsWith('/')) src = baseUrl + src
        images.push(src)
      }
    })

    return NextResponse.json({ images })
  } catch (err) {
    console.error('Scraping error:', err)
    return NextResponse.json({ error: 'Scraping failed' }, { status: 500 })
  }
}
