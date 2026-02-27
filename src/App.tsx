import { useRoutes } from 'react-router-dom'
import { router } from './router/Router'
import ScrollToTop from './hocks/ScrollToTop'

function App() {
  const routing = useRoutes(router)
 
  return (  
    <>
      <ScrollToTop/>
      {routing}
    </>
  )
}

export default App
