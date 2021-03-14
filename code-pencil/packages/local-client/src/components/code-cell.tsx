import { useEffect } from 'react'
import { useActions } from '../hooks/use-actions'
import { useCumulativeCode } from '../hooks/use-cumulative-code'
import { useTypedSelector } from '../hooks/use-typed-selector'
import { Cell } from '../state'
import './code-cell.css'
import CodeEditor from './code-editor'
import Preview from './preview'
import Resizable from './resizable'

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions()
  const bundle = useTypedSelector((state) => state.bundles[cell.id])
  const cumulativeCode = useCumulativeCode(cell.id)

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode)
      return
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, createBundle])

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
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} bundlingStatus={bundle.error} />
          )}
        </div>
        {/* {bundle && <Preview code={bundle.code} bundlingStatus={bundle.error} />} */}
      </div>
    </Resizable>
  )
}

export default CodeCell
