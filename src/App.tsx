import { ToastContainer } from 'react-toastify'
import Tasks from 'components/Tasks'

import 'react-toastify/dist/ReactToastify.css'
import './App.css'

const App = () => {
  return (
    <div className='App'>
      <Tasks />

      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  )
}

export default App
