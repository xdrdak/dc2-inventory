import React, {PropTypes} from 'react';

class DarkCloudInventorInventionIList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {

    function checkAvailability(arr, val) {
      return arr.some(function(arrVal) {
        return val === arrVal;
      });
    }

    return (
        <ul className="list pl0 mv1 flex flex-row">
          {this.props.ingredients.map((obj) => {
            const className = checkAvailability(this.props.obtainedIngredients, obj) ? 'flex-auto' : 'flex-auto light-red';
            return (<li key={obj} className={className}>{obj}</li>);
          })}
        </ul>
    );
  }
}

DarkCloudInventorInventionIList.propTypes = {
  ingredients: PropTypes.array.isRequired,
  obtainedIngredients: PropTypes.array.isRequired
};

export default DarkCloudInventorInventionIList;
