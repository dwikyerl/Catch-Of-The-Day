import React from 'react';
import AddFishForm from './AddFishForm';
import PropTypes from 'prop-types';
import base, { app } from '../base';
import firebase from 'firebase';

// import { Link } from 'react-router-dom';

class Inventory extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      uid: null,
      owner: null
    }

    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    this.authHandler = this.authHandler.bind(this);
  }

  componentDidMount() {
    app.auth().onAuthStateChanged((user) => {
      if(user){
        this.authHandler({ user });
      }
    });
  }
  

  static propTypes = {
    fishes: PropTypes.object.isRequired,
    addFish: PropTypes.func.isRequired,
    updateFish: PropTypes.func.isRequired,
    removeFish: PropTypes.func.isRequired,
    removeFromOrder: PropTypes.func.isRequired,
    loadSamples: PropTypes.func.isRequired,
    storeId: PropTypes.string.isRequired
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

  authenticate(providerName){
    let provider = null;
    if (providerName === 'facebook'){
      provider = new firebase.auth.FacebookAuthProvider();
    } else if(providerName === 'github') {
      provider = new firebase.auth.GithubAuthProvider();
    } else if(providerName === 'twitter'){
      provider = new firebase.auth.TwitterAuthProvider();
    }
    app.auth().signInWithPopup(provider).then(this.authHandler, (error) => {
      console.error(error);
    });
  }

  logout(){
    app.auth().signOut().then(() => {
      this.setState({ uid: null});
    });
  }

  authHandler(result){
    // grab the store info
    base.fetch(this.props.storeId, {
      context: this,
    }).then(data => {
      if(!data.owner){
        base.post(this.props.storeId, {
          data: {owner: result.user.uid}
        });
      }

      this.setState({
        uid: result.user.uid,
        owner: data.owner || result.user.uid
      });

    }).catch(error => {
      console.error(error);
    });


  }

  renderLogin(){
    return (
      <nav className="login">
        <h2>Invetory</h2>
        <p>SIgn in to manage your store's inventory</p>
        <button className="github" onClick={() => this.authenticate('github')}>
          Log In with Github
        </button>
        <button className="facebook" onClick={() => this.authenticate('facebook')}>
          Log In with Facebook
        </button>
        <button className="twitter" onClick={() => this.authenticate('twitter')}>
          Log In with Twitter
        </button>
      </nav>
    )
  }

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;

    // Check if visitor login or not
    if(!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    // Check if the visitor is the owner of the current store
    if(this.state.uid !== this.state.owner){
      return (
        <div>
          <p>Sorry you are not the owner of this store!</p>
          {logout}
        </div>
      )
    }


    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}

export default Inventory;
