// Dynamic sitemap route for Next.js App Router
import { NextResponse } from 'next/server';
import { prisma } from '../../../utils/db';

export async function GET() {
  // Fetch blog slugs from your database
  const posts = await prisma.blogPost.findMany({ select: { slug: true } });
  const baseUrl = 'https://hritujeet-portfolio.vercel.app';

  const staticPages = [
    '',
    '/about',
    '/contact',
    '/blogs',
    // Add more static routes if needed
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (page) => `
    <url>
      <loc>${baseUrl}${page}</loc>
    </url>
  `
    )
    .join('')}
  ${posts
    .map(
      (post: { slug: string }) => `
    <url>
      <loc>${baseUrl}/blogs/${post.slug}</loc>
    </url>
  `
    )
    .join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
