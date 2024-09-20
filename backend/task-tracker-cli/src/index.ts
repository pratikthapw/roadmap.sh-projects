#!/usr/bin/env node

import { addTask } from './add-task';
import { changeTaskStatus } from './change-task-status';
import { isValidValues } from './check-value';
import { deleteTask } from './delete-task';
import { listTasks } from './list-tasks';
import { updateTask } from './update-task';
import { getArgs } from './validate-cmd';

const main = () => {
  const validation = getArgs();
  if (validation.validated) {
    // if (!isValidValues(validation.values) && validation.command !== 'list') {
    //   console.log('Invalid command/value');
    //   return;
    // }
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
