import React, {PropTypes} from 'react';

class DarkCloudInventorIdea extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.isHidden = this.isHidden.bind(this);
    this.isNotTheSelectedChapter = this.isNotTheSelectedChapter.bind(this);
  }

  isHidden() {
    return this.props.idea.hide;
  }

  isNotTheSelectedChapter() {
    return this.props.onlyChapter != this.props.idea.chapter && this.props.onlyChapter != 0;
  }

  render() {
    let wrapperClassName = '';

    if (this.isHidden()
      || this.isNotTheSelectedChapter() ) {
      wrapperClassName += ' dn';
    } else {
      wrapperClassName += 'flex flex-column ba b--black-10 mv2';
    }

    return (
      <div className={wrapperClassName}>
        <label className="flex flex-row items-center justify-between bg-light-blue pa2">
          <div className="flex flex-column">
            <span className="f3 lh-copy ttc">{this.props.idea.value}</span>
            <span className="f6 bt w-100">Chapter {this.props.idea.chapter} </span>
          </div>
          <input type="checkbox" className="w1" checked={this.props.idea.checked} onChange={this.props.onChecked} />
        </label>
        <div className="pa2">
          <p className="mv1">
            {this.props.idea.foundAt}
          </p>
        </div>
      </div>
    );
  }
}

DarkCloudInventorIdea.propTypes = {
  idea: PropTypes.object.isRequired,
  onChecked: PropTypes.func.isRequired,
  onlyChapter: PropTypes.number.isRequired,
};

export default DarkCloudInventorIdea;
