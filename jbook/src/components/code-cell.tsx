import { useEffect } from 'react'
import { useActions } from '../hooks/use-actions'
import { useTypedSelector } from '../hooks/use-typed-selector'
import { Cell } from '../state'
import CodeEditor from './code-editor'
import Preview from './preview'
import Resizable from './resizable'

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions()
  const bundle = useTypedSelector((state) => state.bundles[cell.id])

  useEffect(() => {
    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [cell.content, cell.id, createBundle])

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={(value) => updateCell(cell.id, value)}
            initialValue={cell.content}
          />
        </Resizable>
        {bundle && <Preview code={bundle.code} bundlingStatus={bundle.error} />}
      </div>
    </Resizable>
  )
}

export default CodeCell
