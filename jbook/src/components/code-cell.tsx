import { useEffect, useState } from 'react'
import bundle from '../bundler'
import CodeEditor from './code-editor'
import Preview from './preview'
import Resizable from './resizable'

const CodeCell = () => {
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input)
      setCode(output)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [input])

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={(value) => setInput(value)}
            initialValue="const a = 1"
          />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  )
}

export default CodeCell
