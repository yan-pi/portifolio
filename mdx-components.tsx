import type { MDXComponents } from 'mdx/types'
import { ComponentPropsWithoutRef } from 'react'
import { highlight } from 'sugar-high'
import dynamic from 'next/dynamic'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Cover: ({
      src,
      alt,
      caption,
    }: {
      src: string
      alt: string
      caption: string
    }) => {
      return (
        <figure>
          <img src={src} alt={alt} className="rounded-xl" />
          <figcaption className="text-center">{caption}</figcaption>
        </figure>
      )
    },
    code: ({ children, className = '', ...props }: ComponentPropsWithoutRef<'code'>) => {
      // Detect mermaid code blocks
      if (typeof className === 'string' && className.includes('language-mermaid')) {
        // Use client wrapper for Mermaid diagrams in MDX
        const MermaidClientWrapper = require('./components/MermaidClientWrapper').default
        return <MermaidClientWrapper chart={children as string} className={className} />
      }
      const codeHTML = highlight(children as string)
      return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
    },
  }
}
