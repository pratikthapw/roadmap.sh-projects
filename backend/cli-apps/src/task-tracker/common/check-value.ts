import { formatTask } from '../config';
import { TTask, ValidValues } from '../type';

type BaseType = {
  tasks: TTask[];
};

type DescriptionType = {
  type: 'description';
  description: string;
};

type IdType = {
  type: 'id';
  id: number;
};

type TaskExistType = BaseType & (DescriptionType | IdType);

const checkTaskExists = (options: TaskExistType): boolean => {
  switch (options.type) {
    case 'description':
      return checkTask(options);
    default:
      return checkTask(options);
  }
};

const checkTask = (options: TaskExistType): boolean => {
  const result = options.tasks.find((t) => {
    const value = t[options.type];
    const userValue =
      options.type === 'description'
        ? formatTask(options.description)
        : options.id;
    return value === userValue;
  });
  if (result) {
    return true;
  }
  return false;
};

function isValidValues(values: unknown[]): values is ValidValues {
  if (!Array.isArray(values)) {
    return false;
  }
  if (values.length === 1) {
    return typeof values[0] === 'number' || typeof values[0] === 'string';
  } else if (values.length === 2) {
    return typeof values[0] === 'number' && typeof values[1] === 'string';
  }
  return false;
}

export { checkTaskExists, isValidValues };
