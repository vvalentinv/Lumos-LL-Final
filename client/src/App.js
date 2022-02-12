import { Routes, Route } from 'react-router-dom';

import Header from './components/header/header.component';

import HomePage from './pages/home-page/home-page.component';
import CreateDeckPage from './pages/create-deck-page/create-deck-page.component';

const App = () => {

  return (
    <div>
      <Header />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/createdeck' element={<CreateDeckPage />} />
      </Routes>
    </div>
  );
}

export default App;



