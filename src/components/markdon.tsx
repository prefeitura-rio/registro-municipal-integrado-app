import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from 'rehype-raw'

interface MarkdownProps {
  content: string
}

// Function to fix unclosed code blocks
const fixUnclosedCodeBlocks = (text: string): string => {
  const lines = text.split('\n')
  let isCodeBlockOpen = false
  const fixedLines: string[] = []
  let currentCodeBlock: string[] = []

  lines.forEach((line) => {
    if (line.startsWith('```')) {
      if (isCodeBlockOpen) {
        // Closing a properly opened code block
        currentCodeBlock.push(line)
        fixedLines.push(...currentCodeBlock)
        currentCodeBlock = []
        isCodeBlockOpen = false
      } else {
        // Starting a new code block
        currentCodeBlock.push(line)
        isCodeBlockOpen = true
      }
    } else if (isCodeBlockOpen) {
      // Collect lines inside a code block
      currentCodeBlock.push(line)
    } else {
      // Treat as normal text if not inside a code block
      fixedLines.push(line)
    }
  })

  // If a code block was left open, treat its content as normal text
  if (isCodeBlockOpen) {
    fixedLines.push(...currentCodeBlock.slice(1)) // Remove the unclosed opening marker
  }

  return fixedLines.join('\n')
}

export function Markdown({ content }: MarkdownProps) {
  console.log({ content })
  const processedText = fixUnclosedCodeBlocks(content)
  console.log({ processedText })

  return (
    <ReactMarkdown
      className="space-y-4"
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              style={oneLight}
              language={match[1]}
              PreTag="div"
              {...props}
              customStyle={{
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
              }}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code
              className="break-words rounded-lg bg-card px-1 py-0.5 text-amber-600"
              {...props}
            >
              {children}
            </code>
          )
        },
      }}
    >
      {processedText}
    </ReactMarkdown>
  )
}
