import { Route, Routes } from 'react-router-dom';
import Content from './components/Content/Content';
import FullCard from './components/Content/FullCard/FullCard';
import Favorites from './components/Favorites/Favorites';
import Header from './components/Header/Header';
import Search from './components/Navbar/Search/Search';
import './sass/base.sass';

function App() {
  return (
    <div>
      <Header />
      <Search />
      <Routes>
        <Route exact path="/" component={() => <Content />} />
        <Route exact path="/fullcard/:id" component={() => <FullCard />} />
        <Route exact path="/favorites" component={() => <Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
