class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      if(!config){
        throw error;
      }
      this.states = config.states;
      this.initial = config.initial;
      this.activeState = config.initial;
      this.listOfStates = [this.initial];
      this.iOfListOfStates = 0;
      this.undoState = true;
      this.redoState = true;
      }
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.activeState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if(state in this.states){
        this.activeState = state;
        this.listOfStates.push(state);
        this.iOfListOfStates++;
        this.redoState = false;
      } else throw error;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      var newState = this.states[this.activeState].transitions[event];
      if(newState){
        this.activeState = newState;
        this.listOfStates.push(newState);
        this.iOfListOfStates++;
        this.redoState = false;
      } else throw error;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.activeState = this.initial;
      this.listOfStates.push(this.initial);
      this.iOfListOfStates++;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      var arrayOfStates = [];
      if(!event){
        for(var state in this.states){
          arrayOfStates.push(state);
        }
        return arrayOfStates;
      } else {
        for(var state in this.states){
          if(this.states[state].transitions[event]){
            arrayOfStates.push(state);
          }
        }
        return arrayOfStates;
      }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if(this.iOfListOfStates == 0){
        return false;
      } else {
        this.iOfListOfStates--;
        this.activeState = this.listOfStates[this.iOfListOfStates];
        this.redoState = true;
        return true;
      }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if(this.iOfListOfStates == this.listOfStates.length - 1 || !this.redoState){
        return false;
      } else {
        this.iOfListOfStates++;
        this.activeState = this.listOfStates[this.iOfListOfStates];
        return true;
      }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this.iOfListOfStates = 0;
      this.listOfStates = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
