import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'
import type { Root, Text, HTML } from 'mdast'

const CALLOUT_REGEX = /^:::(\w+)\s*\n([\s\S]*?)\n:::/

type CalloutNode = Text | HTML

export const remarkCallout: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || typeof index !== 'number') return

      const match = node.value.match(CALLOUT_REGEX)
      if (!match) return

      const [fullMatch, type, content] = match
      if (!['info', 'warn', 'error'].includes(type)) return

      const startIndex = node.value.indexOf(fullMatch)
      const endIndex = startIndex + fullMatch.length

      // Split the text if there's content before or after the callout
      const parts: CalloutNode[] = []
      if (startIndex > 0) {
        parts.push({
          type: 'text',
          value: node.value.slice(0, startIndex),
        })
      }

      parts.push({
        type: 'html',
        value: `<div class="callout callout-${type}">${content.trim()}</div>`,
      })

      if (endIndex < node.value.length) {
        parts.push({
          type: 'text',
          value: node.value.slice(endIndex),
        })
      }

      parent.children.splice(index, 1, ...parts)
    })
  }
}
