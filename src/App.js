import React from 'react';
import TodoApp from './TodoApp.js';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <div className="App">
        <header>
            My Todo's List
        </header>
        <Router>
            <Switch>
                <Route exact path="/" component={ TodoApp }/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
