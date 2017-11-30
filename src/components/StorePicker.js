import React from 'react';
import { getFunName } from './../helpers';


class StorePicker extends React.Component {
  // constructor(props){
  //   super(props);
    
  //   this.goToStore = this.goToStore.bind(this);
  // }
  
  goToStore(e){
    e.preventDefault();
    //first grab the text from the box
    const target = this.storeInput.value;
    // second going to to transition from / to /store/:storeId  
    this.props.history.push(`/store/${target}`);
  }
  
  render() {
    // Any where else
    return (
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => {this.storeInput = input}} />
        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}



export default StorePicker;
