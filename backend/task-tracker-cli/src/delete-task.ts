import fs from 'node:fs';
import { checkTaskExists } from './check-value';
import { getTasks } from './get-tasks';
import { ValidValues } from './type';
import { filepath } from './config';

const deleteTask = (values: ValidValues): void => {
  if (values.length > 1 || typeof values[0] === 'string') {
    console.log('Invalid values');
    return;
  }

  const existingTasks = getTasks();
  const taskExist = checkTaskExists({
    tasks: existingTasks,
    type: 'id',
    id: values[0],
  });

  if (!taskExist) {
    console.log('Task with provided id is not available.');
    return;
  }
  const deleteValue = existingTasks.filter((t) => t.id !== values[0]);
  try {
    fs.writeFileSync(filepath, JSON.stringify(deleteValue));
    console.log('Task deleted successfully');
    return;
  } catch (err: unknown) {
    console.log(err);
  }
};
export { deleteTask };
