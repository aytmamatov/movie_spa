import { Route, Switch } from "react-router";
import Content from "./components/Content/Content";
import FullCard from "./components/Content/FullCard/FullCard";
import Favorites from "./components/Favorites/Favorites";
import Header from "./components/Header/Header";
import Search from "./components/Navbar/Search/Search";
import "./sass/base.sass";

function App() {
  return (
    <div>
      <Header />
      <Search />
      <Switch>
        <Route exact path="/" component={() => <Content />} />
        <Route exact path="/fullcard/:id" component={() => <FullCard />} />
        <Route exact path="/favorites" component={() => <Favorites />} />
      </Switch>
    </div>
  );
}

export default App;
