import React from 'react';
import HeaderCompoennt from '../components/header/Header.component';
import './App.css';
import {Route, Switch} from 'react-router-dom';

const Surveys = () => <h1>Surveys</h1>


function App() {
  return (
    <>
      <HeaderCompoennt/>
      <Switch>
        <Route exact path='/surveys' component={Surveys}/>
      </Switch>
    </>
  );
}

export default App;
