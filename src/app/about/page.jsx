import { fetchMdContent } from '@/lib/data'
import React from 'react'
import { marked } from 'marked'
import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import { aboutPageId } from '@/lib/notionServer'
import PageHeader from '@/components/pageHeader'
import { Suspense } from 'react'
import ListSkeleton from '@/components/listSkeleton'

// 每小时更新一次
export const revalidate = 3600

async function AboutContainer() {
    const aboutPost = await fetchMdContent(aboutPageId)
    const htmlContent = marked(aboutPost)
    const window = new JSDOM('').window
    const DOMPurify = createDOMPurify(window)
    const cleanHtmlContent = DOMPurify.sanitize(htmlContent)
    return (
        <div className="max-w-3xl mx-auto">
            <article
                className="prose-base mx-auto 
                          prose-headings:font-bold
                         prose-p:leading-relaxed
                          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                          prose-img:rounded-lg prose-img:shadow-lg"
                dangerouslySetInnerHTML={{ __html: cleanHtmlContent }}
            />
        </div>
    )
}

export default function AboutPage() {
    return (
        <main className="container mx-auto px-4">
            <PageHeader title={'About'} />
            {/* 内容区域 */}
            <Suspense fallback={<ListSkeleton />}>
                <AboutContainer />
            </Suspense>
        </main>
    )
}
