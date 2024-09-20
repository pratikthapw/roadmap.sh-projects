import { isValidValues } from './check-value';
import { cliActions } from './config';
import { TCliActions, TCmdProps, ValidValues } from './type';
import yargs, { Arguments } from 'yargs';

type typeReturn =
  | {
      validated: true;
      values: ValidValues;
      command: TCliActions | undefined;
    }
  | { validated: false };

const getArgs = (): typeReturn => {
  const argv = yargs.argv as Arguments;
  const args = argv._;
  const cmd = args?.[0];
  const values = args.filter((_, i) => i !== 0) as ValidValues;
  const validation = validateCmd(cmd);
  if (!isValidValues(values) && cmd !== 'list') {
    console.log('Invalid command/value');
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

export { getArgs };
