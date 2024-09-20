import fs from 'node:fs';
import { getTasks } from './get-tasks';
import { ValidValues, TTask } from './type';
import { filepath, formatTask } from './config';
import { checkTaskExists } from './check-value';

const addTask = (values: ValidValues): void => {
  if (values.length > 1) {
    console.log('You are trying to add more than 1 value at a time.');
    return;
  }
  try {
    const existingTasks = getTasks();
    const newId = getNewId(existingTasks);
    const description = `${values?.[0]}`;
    const isTaskDuplicate = checkTaskExists({
      tasks: existingTasks,
      type: 'description',
      description,
    });

    const addNew: TTask[] = [
      ...existingTasks,
      {
        id: newId,
        description: formatTask(description),
        status: 'todo',
        createdAt: new Date(),
        updatedAt: undefined,
      },
    ];
    if (!isTaskDuplicate) {
      fs.writeFileSync(filepath, JSON.stringify(addNew));
      console.log('Task added successfully');
      return;
    } else {
      console.log('Duplicate task. Please try again.');
    }
  } catch (err: unknown) {
    console.log(err);
    return;
  }
};

const getNewId = (tasks: TTask[]): number => {
  let highestId: number = 1;
  if (tasks.length) {
    const ids = tasks?.map((d) => d.id);
    highestId = Math.max(...ids) + 1;
  }
  return highestId;
};

export { addTask };
