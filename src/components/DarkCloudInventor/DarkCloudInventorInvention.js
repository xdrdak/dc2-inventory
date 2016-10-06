import React, {PropTypes} from 'react';
import DarkCloudInventorInventionIList from './DarkCloudInventorInventionIList';

class DarkCloudInventorInvention extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let wrapperClassName = '';
    if (this.props.invention.hide || (this.props.readyOnly && this.props.obtainedIngredients.length != 3)) {
      wrapperClassName += ' dn';
    } else {
      wrapperClassName += 'flex flex-column ba b--black-10 mv2';
    }

    let labelClassName = 'flex flex-row items-baseline justify-between pa2';

    if (this.props.obtainedIngredients.length === 3) {
      labelClassName += ' bg-green';
    } else {
      labelClassName += ' bg-light-red';
    }


    return (
      <div className={wrapperClassName}>
        <label className={labelClassName}>
          <span className="f3 lh-copy ttc">{this.props.invention.value}</span>
          <input type="checkbox" className="w1" checked={this.props.invention.invented} onChange={this.props.onChecked} />
        </label>
        <div className="pa2">
          <DarkCloudInventorInventionIList ingredients={this.props.invention.ingredients} obtainedIngredients={this.props.obtainedIngredients} />
        </div>
      </div>
    );
  }
}

DarkCloudInventorInvention.propTypes = {
  invention: PropTypes.object.isRequired,
  obtainedIngredients: PropTypes.array.isRequired,
  onChecked: PropTypes.func.isRequired,
  readyOnly: PropTypes.bool.isRequired
};

export default DarkCloudInventorInvention;
