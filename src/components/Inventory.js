import React from 'react';
import AddFishForm from './AddFishForm';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

class Inventory extends React.Component {
  constructor(props){
    super(props);
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  static propTypes = {
    fishes: PropTypes.object.isRequired,
    addFish: PropTypes.func.isRequired,
    updateFish: PropTypes.func.isRequired,
    removeFish: PropTypes.func.isRequired,
    removeFromOrder: PropTypes.func.isRequired,
    loadSamples: PropTypes.func.isRequired
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

  handleDelete(key){
    this.props.removeFish(key);
    this.props.removeFromOrder(key);
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
        <button onClick={() => this.handleDelete(key)}>Remove Item</button>
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
