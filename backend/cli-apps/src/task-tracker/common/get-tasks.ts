import fs from 'node:fs';
import { filepath } from '../config';
import { TTask } from '../type';

const getTasks = (): TTask[] => {
  try {
    if (!fs.existsSync(filepath)) {
      fs.writeFileSync(filepath, JSON.stringify([]));
    }
    const response = fs.readFileSync(filepath, 'utf-8');

    const parsedResponse = JSON.parse(response);
    return parsedResponse;
  } catch (error) {
    console.error('Error reading file:', error);
    return [];
  }
};

export { getTasks };
