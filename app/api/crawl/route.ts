import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { URL } from 'url'

export async function POST(req: NextRequest) {
  const { url } = await req.json()
  const visited = new Set<string>()
  const queue: string[] = [url]
  const origin = new URL(url).origin
  const maxPages = 50

  const foundLinks: string[] = []

  while (queue.length > 0 && foundLinks.length < maxPages) {
    const currentUrl = queue.shift()
    if (!currentUrl || visited.has(currentUrl)) continue

    visited.add(currentUrl)

    try {
      const res = await axios.get(currentUrl)
      const $ = cheerio.load(res.data)

      const links = $('a')
        .map((_, el) => $(el).attr('href'))
        .get()
        .filter((href) => href && href.startsWith('/')) // internal links
        .map((href) => new URL(href, origin).toString())

      for (const link of links) {
        if (!visited.has(link)) {
          queue.push(link)
          foundLinks.push(link)
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      console.error('Error loading', currentUrl)
    }
  }

  const uniqueLinks = Array.from(new Set(foundLinks)).slice(0, maxPages)

  return NextResponse.json({ urls: uniqueLinks })
}
