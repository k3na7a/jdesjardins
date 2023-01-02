export enum CounterReducerActionTypes {
  Increase = 'INCREASE',
  Decrease = 'DECREASE',
}

interface CounterReducerState {
  value: number;
}

interface CounterReducerAction {
  type: CounterReducerActionTypes;
  payload: number;
}

export function counterReducer(
  state: CounterReducerState,
  action: CounterReducerAction
): CounterReducerState {
  const { value } = state;
  const { type, payload } = action;

  switch (type) {
    case CounterReducerActionTypes.Increase:
      return {
        ...state,
        value: value + payload,
      };
    case CounterReducerActionTypes.Decrease:
      return {
        ...state,
        value: value - payload,
      };
    default:
      return state;
  }
}
