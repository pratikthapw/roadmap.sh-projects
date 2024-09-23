import { TGithubActivityFetchResponse } from './type';

const eventUrl = (username: string) => {
  return `https://api.github.com/users/${username}/events`;
};

const fetchData = async (
  username: string,
): Promise<TGithubActivityFetchResponse[]> => {
  try {
    const response = await fetch(eventUrl(username));
    if (!response.ok) {
      if (response.status === 404) {
        console.log(
          `No user exists with username: ${username}. Please try again with different one.`,
        );
        return [];
      }
      console.log(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    console.log(error);
    return [];
  }
};

export { fetchData };
