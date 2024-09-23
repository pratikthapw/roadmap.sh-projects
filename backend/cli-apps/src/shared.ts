import yargs, { Arguments } from 'yargs';

const getArgs = (): (string | number)[] => {
  const base = yargs.argv as Arguments;
  const args = base._;
  return args;
};

const capitalizeWord = (word: string) => {
  return word?.[0]?.toUpperCase() + word?.slice(1).toLowerCase();
};

export { getArgs, capitalizeWord };
