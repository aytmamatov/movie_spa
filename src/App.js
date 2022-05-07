import { Route, Routes } from 'react-router-dom';
import Content from 'src/components/Content/Content';
import FullCard from 'src/components/Content/FullCard/FullCard';
import Favorites from 'src/components/Favorites/Favorites';
import Header from 'src/components/Header/Header';
import Search from 'src/components/Navbar/Search/Search';
import 'src/sass/base.sass';

function App() {
  return (
    <div>
      <Header />
      <Search />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/fullcard/:id" element={<FullCard />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
