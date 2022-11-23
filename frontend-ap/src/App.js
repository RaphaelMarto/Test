import './App.css';
import Gestion from './Page/Gestion';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
   <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Gestion/>}/>
        </Routes>
      </BrowserRouter>
   </>
  );
}

export default App;
