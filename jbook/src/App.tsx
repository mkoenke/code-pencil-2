// import CodeCell from './components/code-cell'
import { Provider } from 'react-redux'
import TextEditor from './components/text-editor'
import { store } from './state'

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <TextEditor />
        {/* <CodeCell /> */}
      </div>
    </Provider>
  )
}

export default App
