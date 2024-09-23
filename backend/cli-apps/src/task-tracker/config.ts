import path from 'path';

const filepath = path.join(__dirname, 'tasks.json');
const cliActions = [
  'add',
  'update',
  'delete',
  'list',
  'list-done',
  'list-todo',
  'list-in-progress',
  'mark-todo',
  'mark-in-progress',
  'mark-done',
] as const;

const formatTask = (task: string) => {
  return task.toLowerCase().trim();
};

export { filepath, cliActions, formatTask };
