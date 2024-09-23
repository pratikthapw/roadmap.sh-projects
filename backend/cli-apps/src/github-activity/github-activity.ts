#!/usr/bin/env node

import { capitalizeWord, getArgs } from '../shared';
import { fetchData } from './fetch-data';
import { TypeEvents } from './type';

const main = async () => {
  const args = getArgs();
  if (!args.length) {
    console.log('Please provide an username.');
    return;
  }
  const results = await fetchData(`${args[0]}`);
  if (!results.length) {
    return;
  }
  results.forEach((result) => {
    switch (result.type) {
      case TypeEvents.WatchEvent:
        console.log(`Starred ${result.repo.name} repo.`);
        break;
      case TypeEvents.CreateEvent:
        console.log(`Created a new branch in ${result.repo.name} repo.`);
        break;
      case TypeEvents.PushEvent:
        console.log(
          `Pushed ${result.payload.size} commits to ${result.repo.name} repo.`,
        );
        break;
      case TypeEvents.PullRequestEvent:
        const action = capitalizeWord(result.payload.action);
        console.log(
          `${action} pull request of ${result.payload.pull_request.title} in ${result.repo.name} repo.`,
        );
        break;
      case TypeEvents.ForkEvent:
        console.log(`Forked ${result.repo.name} repo.`);
        break;
      case TypeEvents.PullRequestReviewEvent:
        const eventAction = capitalizeWord(result.payload.action);
        console.log(
          `${eventAction} pull request review in ${result.repo.name} repo.`,
        );
        break;
      case TypeEvents.ForkEvent:
        console.log(`Deleted ${result.repo.name} repo.`);
        break;

      case TypeEvents.IssuesEvent:
        console.log(
          `${capitalizeWord(
            result.payload.action,
          )} issue called ${result.payload.issue.title} in ${result.repo.name} repo.`,
        );
      default:
        break;
    }
  });
};

main();
