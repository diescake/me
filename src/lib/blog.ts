import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import { remarkCallout } from './remark-callout'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface BlogPost {
  id: string
  title: string
  date: string
  description: string
  content: string
}

export interface BlogPostMetadata {
  id: string
  title: string
  date: string
  description: string
}

export async function getPostData(id: string): Promise<BlogPost> {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Parse front matter
  const { data, content } = matter(fileContents)

  // Convert markdown to HTML with syntax highlighting
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkCallout)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content)

  const htmlContent = String(processedContent)

  return {
    id,
    title: data.title,
    date: data.date,
    description: data.description,
    content: htmlContent,
  }
}

export function getAllPostIds(): string[] {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ''))
}

export function getPaginatedPosts(
  page: number = 1,
  perPage: number = 10,
  searchQuery?: string
): {
  posts: BlogPostMetadata[]
  totalPages: number
} {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      id,
      title: data.title,
      date: data.date,
      description: data.description,
    }
  })

  // Filter posts by search query if provided
  let filteredPosts = allPostsData
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filteredPosts = allPostsData.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query)
    )
  }

  // Sort posts by date
  const sortedPosts = filteredPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })

  const totalPosts = sortedPosts.length
  const totalPages = Math.ceil(totalPosts / perPage)
  const start = (page - 1) * perPage
  const end = start + perPage

  return {
    posts: sortedPosts.slice(start, end),
    totalPages,
  }
}

export function getAllPosts(): BlogPostMetadata[] {
  return getPaginatedPosts(1, Infinity).posts
}
