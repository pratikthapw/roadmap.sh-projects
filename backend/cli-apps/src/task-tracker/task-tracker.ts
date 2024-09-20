#!/usr/bin/env node

import { getArgs } from './common/validate-cmd';
import {
  addTask,
  updateTask,
  deleteTask,
  changeTaskStatus,
  listTasks,
} from './features';

const main = () => {
  const validation = getArgs();
  if (validation.validated) {
    switch (validation.command) {
      case 'add':
        addTask(validation.values);
        break;
      case 'update':
        updateTask(validation.values);
        break;
      case 'delete':
        deleteTask(validation.values);
        break;
      case 'mark-in-progress':
        changeTaskStatus(validation.values, 'in-progress');
        break;
      case 'mark-done':
        changeTaskStatus(validation.values, 'done');
        break;
      case 'mark-todo':
        changeTaskStatus(validation.values, 'todo');
        break;
      case 'list':
        listTasks();
        break;
      case 'list-done':
        listTasks('done');
        break;
      case 'list-todo':
        listTasks('todo');
        break;
      case 'list-in-progress':
        listTasks('in-progress');
        break;
      default:
        console.log('Invalid Command');
    }
  }
};

main();
