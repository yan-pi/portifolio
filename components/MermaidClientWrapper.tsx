'use client'
import dynamic from 'next/dynamic'
import React from 'react'

const MermaidDiagram = dynamic(() => import('./Mermaid'), { ssr: false })

export default function MermaidClientWrapper({ chart, className = '' }: { chart: string; className?: string }) {
  return <MermaidDiagram chart={chart} className={className} />
}

