import { Routes, Route } from 'react-router-dom';

import Header from './components/header/header.component';

import HomePage from './pages/home-page/home-page.component';
import ViewDeckPage from './pages/view-deck-page/view-deck-page.component';
import DeckPreviewPage from './pages/deck-preview-page/deck-preview-page.component';

const App = () => {

  return (
    <div>
      <Header />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/createdeck' element={<ViewDeckPage />} />
        <Route path='/editdeck/:deckID' element={<ViewDeckPage />} />
        <Route path='/deckpreview/:deckID' element={<DeckPreviewPage />} />
      </Routes>
    </div>
  );
}

export default App;



