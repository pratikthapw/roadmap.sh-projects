import { cliActions } from './config';

type TTask = {
  id: number;
  description: string;
  status: 'todo' | 'done' | 'in-progress';
  createdAt: Date;
  updatedAt: Date | undefined;
};

type TCmdProps = (string | number)[];

type TCliActions = (typeof cliActions)[number];

type TaskType = TTask['status'];

type ValidValues = [number] | [string] | [number, string];

export type { TTask, TCmdProps, TCliActions, TaskType, ValidValues };
