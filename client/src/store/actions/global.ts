export const INPUT_CHANGE = 'INPUT_CHANGE';

export interface InputChangeAction {
  type: typeof INPUT_CHANGE;
  name: string;
  value: string;
  reducerName?: string;
}

export const inputChange = (
  name: string,
  value: string,
  reducerName?: string,
): InputChangeAction => ({
  type: INPUT_CHANGE,
  name,
  value,
  reducerName,
});

export type GlobalActions = InputChangeAction;
