import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Paste from './components/Paste.jsx'
import ViewPaste from './components/ViewPaste.jsx'

const RootLayout = () => (
  <div className='flex flex-col items-center justify-center min-h-screen w-full'>
    <Navbar />
    <Outlet />
  </div>
)

const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/pastes',
          element: <Paste />,
        },
        {
          path: '/pastes/:id',
          element: <ViewPaste />,
        },
      ]
    }
  ]
)

function App() {
  return <RouterProvider router={router} />
}

export default App
