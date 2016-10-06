import ideasDBReal from './ideas.js';
import inventionsDBReal from './inventions.js';

export default class DB {
  constructor(driver) {
    if (driver === 'localStorage') {
      if (!this.getAllIdeas()) {
        this.saveAllIdeas(ideasDBReal);
      }

      if (!this.getAllInventions()) {
        this.getAllInventions(inventionsDBReal);
      }
      if (!this.getAllReadyIdeas()) {
        this.saveAllReadyIdeas([]);
      }
    }
  }

  getAllIdeas() {
    return JSON.parse(localStorage.getItem('ideas-state'));
  }

  getAllInventions() {
    return JSON.parse(localStorage.getItem('inventions-state'));
  }

  getAllReadyIdeas() {
    return JSON.parse(localStorage.getItem('readyideas-state'));
  }

  saveAllIdeas(json) {
    localStorage.setItem('ideas-state', JSON.stringify(json));
  }

  saveAllInventions(json) {
    localStorage.setItem('inventions-state', JSON.stringify(json));
  }

  saveAllReadyIdeas(json) {
    localStorage.setItem('readyideas-state', JSON.stringify(json));
  }

}
