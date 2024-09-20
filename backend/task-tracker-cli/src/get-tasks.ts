import fs from 'node:fs';
import { TTask } from './type';
import { filepath } from './config';

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
