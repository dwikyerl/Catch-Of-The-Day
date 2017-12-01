import React from 'react';
import { formatPrice } from '../helpers';
import PropTypes from 'prop-types';

class Fish extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    index: PropTypes.string.isRequired,
    addToOrder: PropTypes.func.isRequired
  }

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