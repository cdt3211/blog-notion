import React from 'react'
import { marked } from 'marked'
import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import PostProperties from './postProperties';


export default function PostDetail({ properties, mdContent = '' }) {
  //将md解析为html
  const htmlContent = marked(mdContent);
  const window = new JSDOM('').window;
  const DOMPurify = createDOMPurify(window);
  const cleanHtmlContent = DOMPurify.sanitize(htmlContent);

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <PostProperties properties={properties} />

      {/* 文章内容 */}
      <div className="prose prose-lg mx-auto 
                      prose-headings:font-bold prose-headings:text-gray-900
                      prose-p:text-gray-700 prose-p:leading-relaxed
                      prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                        prose-code:px-1 
                      prose-pre:bg-gray-900 prose-pre:text-gray-100
                      prose-img:rounded-lg prose-img:shadow-lg"
        dangerouslySetInnerHTML={{ __html: cleanHtmlContent }}
      />
    </article>
  )
}