import Header from './Header.tsx'
import Footer from './Footer.tsx'
import NavBar from './NavBar.tsx'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Header urlLogo="https://images.unsplash.com/photo-1759800805660-8bc4595568ec?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070">
        <h1>Tous sur les films</h1>
        <NavBar />
      </Header> 

      <main className='page-content'>
        <Outlet />
      </main>
     
      <Footer urlLogo="https://images.unsplash.com/photo-1760336472685-4c3f0dd8d204?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070">
        <p>© 2021 UGC Cinéma</p>
      </Footer>
    </div>
  );
};

export default App;
