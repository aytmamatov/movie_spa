import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router";
import Content from "./components/Content/Content";
import FullCard from "./components/Content/FullCard/FullCard";
import Favorites from "./components/Favorites/Favorites";
import Header from "./components/Header/Header";
import Search from "./components/Navbar/Search/Search";
import "./sass/base.sass";

function App() {
  const state = useSelector((state) => state.movie);
  return (
    <div
      className="App"
      // style={{
      //   background: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${state.backdrop_path}) no-repeat 0 0 / cover`,
      // }}
    >
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
