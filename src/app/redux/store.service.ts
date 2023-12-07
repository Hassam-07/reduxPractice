// import { Injectable } from '@angular/core';
// import { Action } from './actions';
// import { TodosState, initialState } from './reducer';

// const win = window as any;
// @Injectable({
//   providedIn: 'root',
// })
// export class StoreService {
//   private state: TodosState = initialState;

//   /**
//    * Ignore the constructor code
//    * @ignore Redux Dev Tools setup
//    */
//   constructor() {
//     // Redux Dev Tools
//     if (win.__REDUX_DEVTOOLS_EXTENSION__) {
//       win.devTools = win.__REDUX_DEVTOOLS_EXTENSION__.connect();
//       // Set Initial State for Redux DevTools
//       win.devTools.init(this.state);
//       // Time Travel Debugging
//       win.devTools.subscribe((message: any) => {
//         if (
//           message.type === 'DISPATCH' &&
//           message.payload.type === 'JUMP_TO_ACTION'
//         ) {
//           this.state = JSON.parse(message.state);
//         }

//         if (message.type === 'ACTION') {
//           this.dispatch({ type: message.payload });
//         }
//       });
//     }
//   }

//   dispatch(action: Action) {
//     this.state = reducer(this.state, action);

//     /**
//      * @ignore Send action, state info to Redux Dev Tools
//      */
//     win.devTools?.send(action, this.state);
//   }

//   select(path: keyof TodosState) {
//     if (this.state[path] !== undefined) {
//       return this.state[path];
//     } else {
//       return null;
//     }
//   }
// }
// function reducer(state: TodosState, action: Action): TodosState {
//   throw new Error('Function not implemented.');
// }

import { Injectable } from '@angular/core';
import { initialState, TodosState, reducer } from './reducer';
import { Action } from './actions';

const win = window as any;

/**
 * Simple State Management using Redux WITHOUT reactivity
 */
@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private state: TodosState = initialState;

  /**
   * Ignore the constructor code
   * @ignore Redux Dev Tools setup
   */
  constructor() {
    // Redux Dev Tools
    if (win.__REDUX_DEVTOOLS_EXTENSION__) {
      win.devTools = win.__REDUX_DEVTOOLS_EXTENSION__.connect();
      // Set Initial State for Redux DevTools
      win.devTools.init(this.state);
      // Time Travel Debugging
      win.devTools.subscribe((message: any) => {
        if (
          message.type === 'DISPATCH' &&
          message.payload.type === 'JUMP_TO_ACTION'
        ) {
          this.state = JSON.parse(message.state);
        }

        if (message.type === 'ACTION') {
          this.dispatch({ type: message.payload });
        }
      });
    }
  }

  dispatch(action: Action) {
    this.state = reducer(this.state, action);

    /**
     * @ignore Send action, state info to Redux Dev Tools
     */
    win.devTools?.send(action, this.state);
  }

  select(path: keyof TodosState) {
    if (this.state[path] !== undefined) {
      return this.state[path];
    } else {
      return null;
    }
  }
}
