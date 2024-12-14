import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  isAdmin: boolean
  login: (token: string, isAdmin: boolean) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const adminStatus = localStorage.getItem('isAdmin') === 'true'
    if (token) {
      setIsLoggedIn(true)
      setIsAdmin(adminStatus)
    }
  }, [])

  const login = (token: string, adminStatus: boolean) => {
    localStorage.setItem('token', token)
    localStorage.setItem('isAdmin', adminStatus.toString())
    setIsLoggedIn(true)
    setIsAdmin(adminStatus)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('isAdmin')
    setIsLoggedIn(false)
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
