import { getTasks } from '../common/get-tasks';
import { TaskType, TTask } from '../type';

const listTasks = (type?: TaskType): void => {
  const existingTasks = getTasks();
  switch (type) {
    case 'done':
      const doneTasks = filterTask(existingTasks, type);
      console.log(doneTasks);
      break;
    case 'todo':
      const todoTasks = filterTask(existingTasks, type);
      console.log(todoTasks);
      break;
    case 'in-progress':
      const inProgressTasks = filterTask(existingTasks, type);
      console.log(inProgressTasks);
      break;
    default:
      console.log(existingTasks);
  }
};

const filterTask = (tasks: TTask[], type: TaskType) => {
  const filteredTask = tasks.filter((t) => t.status === type);
  return filteredTask;
};

export { listTasks };
