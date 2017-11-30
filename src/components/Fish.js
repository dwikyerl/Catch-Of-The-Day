import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
  render() {
    const { name, image, desc, price, status, index} = this.props;
    const isAvailable = status === 'available';
    const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';

    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button 
          onClick={() => this.props.addToOrder(index)} 
          disabled={!isAvailable}>
          {buttonText}
        </button>
      </li>
    )
  }
}

export default Fish;