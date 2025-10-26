import { useState, useEffect } from 'react'
import { PasswordGate } from './components/PasswordGate'
import { Questionnaire } from './components/Questionnaire'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if already authenticated on mount
  useEffect(() => {
    const auth = sessionStorage.getItem('hjz-auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  if (!isAuthenticated) {
    return <PasswordGate onAuthenticated={() => setIsAuthenticated(true)} />
  }

  return <Questionnaire />
}

export default App
