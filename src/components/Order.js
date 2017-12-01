import React from 'react';
import { formatPrice } from '../helpers';
import PropTypes from 'prop-types';
import CSSTtransitionGroup from 'react-addons-css-transition-group';

class Order extends React.Component {
  constructor(props){
    super(props);
    this.renderOrder = this.renderOrder.bind(this);
  }

  static propTypes = {
    fishes: PropTypes.object.isRequired, 
    order: PropTypes.object.isRequired,
    removeFromOrder: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  }
  
  renderOrder(key){
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

    if(!fish || fish.status === 'unavailable'){
      return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available!{removeButton}</li>
    }
    
    return (
      <li key={key}>
        <span>
          <CSSTtransitionGroup
            component="span"
            className="count"
            transitionName="count"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}
          >
            <span key={count}>{count}</span>
          </CSSTtransitionGroup>
          lbs {fish.name}
        </span>
        <span className="price">{formatPrice(count * fish.price)}</span>
        {removeButton}
      </li>
    )
  }
  
  
  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((acc, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if(isAvailable){
        return acc + (count * fish.price || 0);
      }
      return acc;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <CSSTtransitionGroup 
          component="ul"
          className="order"
          transitionName="order"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </CSSTtransitionGroup>
      </div>
    )
  }
}

export default Order;
