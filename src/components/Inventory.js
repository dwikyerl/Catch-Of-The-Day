import React from 'react';
import AddFishForm from './AddFishForm';
// import { Link } from 'react-router-dom';

class Inventory extends React.Component {
  constructor(props){
    super(props);
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    // take a copy of the fish and update it with the new data
    const updatedFish = {
      ...fish, 
      [e.target.name]: e.target.value
    };
    this.props.updateFish(key, updatedFish);
  }


  renderInventory(key){
    const fish = this.props.fishes[key];
    return (
      <div className="fish-edit" key={key}>
        <input ref={(input) => this.name = input} name="name" value={fish.name} type="text" placeholder="Fish Name" onChange={(e) => this.handleChange(e, key)}/>
        <input ref={(input) => this.price = input} name="price" value={fish.price} type="text" placeholder="Fish Price" onChange={(e) => this.handleChange(e, key)}/>
        <select ref={(input) => this.status = input} name="status" value={fish.status} onChange={(e) => this.handleChange(e, key)}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea ref={(input) => this.desc = input} name="desc" value={fish.desc} placeholder="Fish Desc" onChange={(e) => this.handleChange(e, key)}/>
        <input ref={(input) => this.image = input} name="image" value={fish.image} type="text" placeholder="Fish Image" onChange={(e) => this.handleChange(e, key)}/>
        <button type="submit">+ Add Item</button>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}

export default Inventory;
