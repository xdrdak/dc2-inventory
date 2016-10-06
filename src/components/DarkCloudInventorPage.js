import React from 'react';
import DarkCloudInventorIdea from './DarkCloudInventor/DarkCloudInventorIdea';
import DarkCloudInventorInvention from './DarkCloudInventor/DarkCloudInventorInvention';
import objectAssign from 'object-assign';
import intersection from 'lodash/intersection';
import DB from '../db/db.js';


class DarkCloudInventorPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.db = new DB('localStorage');

    let localIdeasState = this.db.getAllIdeas();
    let localInventionsState = this.db.getAllInventions();
    let localReadyIdeasState = this.db.getAllReadyIdeas();

    const resetHideState = (state) => {
      return state.map((obj) => {
        obj.hide = false;
        return obj;
      });
    };

    this.state = {
      ideas: resetHideState(localIdeasState),
      inventions: resetHideState(localInventionsState),
      readyIdeas: localReadyIdeasState,
      readyOnly: false,
      onlyChapter: 0
    };
    this.ideasFilterKeypress = this.ideasFilterKeypress.bind(this);
    this.inventionsFilterKeypress = this.inventionsFilterKeypress.bind(this);
    this.hideInputWithinState = this.hideInputWithinState.bind(this);
    this.onReadyCheck = this.onReadyCheck.bind(this);
    this.chapterChange = this.chapterChange.bind(this);


  }



  hideInputWithinState(inputValue, state) {
    let newState = objectAssign([], state);
    const input = inputValue.toLowerCase();
    if (input.length === 0) {
      newState = newState.map((obj) => {
        obj.hide = false;
        return obj;
      });
    } else {
      newState = newState.map((obj) => {
        if (obj.value.toLowerCase().indexOf(input) > -1) {
          obj.hide = false;
        } else {
          obj.hide = true;
        }
        return obj;
      });
    }

    return newState;
  }

  ideasFilterKeypress(event) {
    const inputValue = event.target.value;
    const newIdeasState = this.hideInputWithinState(inputValue, this.state.ideas);

    this.setState({
      ideas: newIdeasState
    });
  }

  inventionsFilterKeypress(event) {
    const inputValue = event.target.value;
    const newInventionsState = this.hideInputWithinState(inputValue, this.state.inventions);

    this.setState({
      inventions: newInventionsState
    });

  }

  onIdeaChecked(index) {
    const newIdeasState = objectAssign([], this.state.ideas);
    newIdeasState[index].checked = !newIdeasState[index].checked;

    let newReadyIdeasState = [];
    this.state.ideas.forEach((obj) => {
      if (obj.checked) {
        newReadyIdeasState.push(obj.value);
      }
    });

    this.setState({
      ideas: newIdeasState,
      readyIdeas: newReadyIdeasState
    });

    this.db.saveAllIdeas(newIdeasState);
    this.db.saveAllReadyIdeas(newReadyIdeasState);

  }

  onReadyCheck() {
    const ready = !this.state.readyOnly;
    this.setState({
      readyOnly: ready
    });
  }

  chapterChange(event) {
    const value = Number.parseInt(event.target.value, 10);
    this.setState({
      onlyChapter: (Number.isNaN(value) ? 0 : value)
    });
  }

  onInventionChecked(index) {
    const newInventionState = objectAssign([], this.state.inventions);
    newInventionState[index].invented = !newInventionState[index].invented;

    this.setState({
      inventions: newInventionState
    });

    this.db.saveAllInventions(newInventionState);

  }

  renderIdeas() {
    return this.state.ideas
    .map((obj, i) => {
      return (
          <DarkCloudInventorIdea key={obj.value} idea={obj} onlyChapter={this.state.onlyChapter}
            onChecked={this.onIdeaChecked.bind(this, i)}/>
      );
    });
  }

  renderInventions() {
    return this.state.inventions.map((obj, i) => {
      const obtainedIngredients = intersection(obj.ingredients, this.state.readyIdeas);
      return (
        <DarkCloudInventorInvention invention={obj} key={obj.value} readyOnly={this.state.readyOnly}
          obtainedIngredients={obtainedIngredients} onChecked={this.onInventionChecked.bind(this, i)} />
      );
    });
  }

  render() {
    function renderNumberedOptions(quantity) {
      return [...Array(quantity).keys()].map((i) => {
        return (<option key={i} value={i+1}>{i+1}</option>);
      });
    }

    return (
      <div>
        <h1 className="mb2">Dark Cloud 2 Invention Tracker</h1>
        <h6 className="mt0 mb2">*This app uses the browsers storage to save your selection.</h6>
        <div className="flex justify-between sans-serif">
          <div id="ideas" className="w-50 pa2">
            <h1 className="f6 ttu fw6 mt0 mb3 bb pb2 tracked-mega">Ideas</h1>
            <input className="input-reset ba black-80 bg-white pa1 lh-solid br2 w-100" type="text" onChange={this.ideasFilterKeypress} />
            <div className="mv2">
              <span className="pr1">Chapter:</span>
              <select className="ba black-80 bg-white pa1 lh-solid br2" onChange={this.chapterChange}>
                <option value="0">All</option>
                {renderNumberedOptions(8)}
              </select>
            </div>
            <div className="mv3">
              {this.renderIdeas()}
            </div>
          </div>
          <div id="inventions" className="w-50 pa2">
            <h1 className="f6 ttu fw6 mt0 mb3 bb pb2 tracked-mega">Inventions</h1>
            <input className="input-reset ba black-80 bg-white pa1 lh-solid br2 w-100" type="text" onChange={this.inventionsFilterKeypress} />
            <label className="flex flex-row items-center mv2">
              <div className="flex flex-column">
                <span className="f6 lh-copy ttc">Show ready inventions only</span>
              </div>
              <input type="checkbox" className="mh1" checked={this.state.readyOnly} onChange={this.onReadyCheck} />
            </label>
            <div className="mv3">
              {this.renderInventions()}
            </div>
          </div>
        </div>
    </div>
    );
  }
}


export default DarkCloudInventorPage;
