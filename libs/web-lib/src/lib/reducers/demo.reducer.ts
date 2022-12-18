export enum ActionType {
  Increase = 'INCREASE',
  Decrease = 'DECREASE',
}

interface Action {
  type: ActionType;
  payload: number;
}

interface State {
  value: number;
}

export function counterReducer(state: State, action: Action): State {
  const { type, payload } = action;

  switch (type) {
    case ActionType.Increase:
      return {
        ...state,
        value: state.value + payload,
      };
    case ActionType.Decrease:
      return {
        ...state,
        value: state.value - payload,
      };
    default:
      return state;
  }
}
