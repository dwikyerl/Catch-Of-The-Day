import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './css/style.css';
import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';


const Root = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={ props => <StorePicker {...props} />} />
        <Route exact path="/store/:storeId" component={App}/>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

 
render(<Root/>, document.querySelector('#main'));
