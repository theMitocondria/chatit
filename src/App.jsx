
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login';
import Chat from './pages/chat';
import { AuthProvider } from './context/AuthContext'
import { useEffect } from 'react';



function App() {  
  return (
    <AuthProvider>
      <Router>
      <div className='w-screen h-screen flex flex-col'>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </div>
      </Router>
    </AuthProvider>
  )
}

export default App
