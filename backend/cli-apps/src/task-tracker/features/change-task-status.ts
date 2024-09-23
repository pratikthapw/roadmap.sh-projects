import fs from 'node:fs';
import { getTasks } from '../common/get-tasks';
import { checkTaskExists } from '../common/check-value';
import { TaskType, TTask, ValidValues } from '../type';
import { filepath } from '../config';

const changeTaskStatus = (values: ValidValues, type: TaskType) => {
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

  const inProgressValue: TTask[] = existingTasks.map((t) => {
    if (t.id === values[0]) {
      return { ...t, status: type };
    }
    return t;
  });

  try {
    fs.writeFileSync(filepath, JSON.stringify(inProgressValue));
    console.log(`Task status updated to ${type} successfully.`);
  } catch (err: unknown) {
    console.log(err);
  }
};

export { changeTaskStatus };
