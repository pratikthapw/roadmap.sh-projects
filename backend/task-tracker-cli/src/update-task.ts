import fs from 'node:fs';
import { checkTaskExists } from './check-value';
import { getTasks } from './get-tasks';
import { ValidValues } from './type';
import { filepath } from './config';

const updateTask = (values: ValidValues): void => {
  if (values.length === 1) {
    console.log('You missed to include task id or new task description');
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

  const updateValue = existingTasks.map((t) => {
    if (t.id !== values[0]) {
      return { ...t, description: values[1] };
    }
    return t;
  });

  try {
    fs.writeFileSync(filepath, JSON.stringify(updateValue));
    console.log('Task updated successfully.');
  } catch (err: unknown) {
    console.log(err);
  }
};
export { updateTask };
