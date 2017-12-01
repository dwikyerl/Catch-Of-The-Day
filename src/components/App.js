import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';
// import { Link } from 'react-router-dom';

class App extends React.Component {
  constructor(props){
    super(props);
    
    //get initial state
    this.state = {
      fishes: {},
      order: {}
    }
    
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.updateFish = this.updateFish.bind(this);
  }
  
  componentWillMount(){
    // this runs right before the <App> is rendered
    const storeId = this.props.match.params.storeId;
    this.ref = base.syncState(`${storeId}/fishes`
    ,{
      context: this,
      state: 'fishes'
    });
    
    // check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${storeId}`);
    
    if(localStorageRef){
      //update our App component's order state
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }
  
  componentWillUnmount(){
    base.removeBinding(this.ref);
  }
  
  componentWillUpdate(nextProps, nextState){
    const storeId = this.props.match.params.storeId;
    localStorage.setItem(`order-${storeId}`, JSON.stringify(nextState.order));
  }
  
  addFish(fish){
    // update our state
    const fishes = {...this.state.fishes};
    // add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // set state
    this.setState({fishes});
  }

  updateFish(key, updatedFish){
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }
  
  loadSamples(){
    this.setState({
      fishes: sampleFishes
    });
  }
  
  addToOrder(key) {
    // take a copy of state
    const order = {...this.state.order};
    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;
    // update our state
    this.setState({ order })
  }
  
  render() {
    const fishes = Object.keys(this.state.fishes).map((key) => (
      <Fish 
        key={key}
        index={key}
        {...this.state.fishes[key]}
        addToOrder={this.addToOrder}
      />
    ));
    
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {fishes}
          </ul>
        </div>
        <Order 
          fishes={this.state.fishes} 
          order={this.state.order}
          params={this.props.match.params}
        />
        <Inventory 
          fishes={this.state.fishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          loadSamples={this.loadSamples}
        />
      </div>
    )
  }
}

export default App;
