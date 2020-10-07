import { createContext, useContext, useReducer, Dispatch } from 'react';

/**
 * Manages the state for our entire app
 */

// Init an empty context
export const AppStateContext = createContext({} as AppStateContext);

/**
 * Define default application state
 */
export const defaultState: AppState = {

};

/**
 * Build a simple reducer to handle state updates
 */

const stateReducer = (state: AppState, action: StateAction): AppState => {
    switch (action.type) {
        default:
            return {
                ...state,
            };
    }
};

/**
 * Put useReducer into state so we can use it to read from state and
 * dispatch actions seamlessly across out entire app.
 */

export const AppStateProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(stateReducer, defaultState);

    return (
        <AppStateContext.Provider value={{ state, dispatch }}>
            {children}
        </AppStateContext.Provider>
    );
};

/**
 * Make our context with state and dispatch globally available as a simple hook
 */
export const useAppStateContext = () => useContext(AppStateContext);

/**
 * Typings
 */
export interface AppState {}

type StateAction = any;

interface AppStateContext {
    state: AppState;
    dispatch: Dispatch<StateAction>;
}
