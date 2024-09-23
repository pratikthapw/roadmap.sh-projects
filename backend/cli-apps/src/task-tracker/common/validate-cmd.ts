import { isValidValues } from './check-value';
import { cliActions } from '../config';
import { TCliActions, ValidValues } from '../type';
import { getArgs } from '@shared';

type typeReturn =
  | {
      validated: true;
      values: ValidValues;
      command: TCliActions | undefined;
    }
  | { validated: false };

const validationResult = (): typeReturn => {
  const args = getArgs();
  const cmd = args?.[0];
  const values = args.filter((_, i) => i !== 0) as ValidValues;
  const validation = validateCmd(cmd);
  if (!isValidValues(values) && cmd !== 'list' && validation) {
    console.log('Invalid value for the respective command');
    return { validated: false };
  }
  return {
    validated: validation,
    values,
    command: validation ? (cmd as TCliActions) : undefined,
  };
};

const isCliAction = (action: string) => {
  return cliActions.includes(action as TCliActions);
};

const validateCmd = (userAction: string | number | undefined): boolean => {
  if (!userAction) {
    console.log(
      "Empty command, try with some command such as task-cli add 'your task' or similar",
    );
    return false;
  }
  if (typeof userAction === 'number') {
    console.log('Number is not allowed');
    return false;
  }
  if (!isCliAction(userAction)) {
    console.log(`Invalid action type ${userAction}`);
    return false;
  }
  return true;
};

export { validationResult };
