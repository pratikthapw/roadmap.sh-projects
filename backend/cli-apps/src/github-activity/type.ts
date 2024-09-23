export enum TypeEvents {
  WatchEvent = 'WatchEvent',
  CreateEvent = 'CreateEvent',
  PushEvent = 'PushEvent',
  PullRequestEvent = 'PullRequestEvent',
  ForkEvent = 'ForkEvent',
  PullRequestReviewEvent = 'PullRequestReviewEvent',
  DeleteEvent = 'DeleteEvent',
  IssuesEvent = 'IssuesEvent',
  // not handled below this
  MemberEvent = 'MemberEvent',
  PublicEvent = 'PublicEvent',
}
enum PayloadAction {
  started = 'started',
  created = 'created',
  closed = 'closed',
  opened = 'opened',
}
type TGithubActivityFetchResponse = TCommon & TDifferentEvents;

type TDifferentEvents =
  | TWatchEvent
  | TPushEvent
  | TPullRequestEvent
  | TPullRequestReviewEvent
  | TIssuesEvent
  | { type: TypeEvents.CreateEvent }
  | { type: TypeEvents.ForkEvent }
  | { type: TypeEvents.CreateEvent };

type TWatchEvent = {
  type: TypeEvents.WatchEvent;
  payload: {
    action: PayloadAction.started;
  };
};

type TPushEvent = {
  type: TypeEvents.PushEvent;
  payload: {
    size: number;
  };
};

type TPullRequestEvent = {
  type: TypeEvents.PullRequestEvent;
  payload: {
    action: PayloadAction.opened | PayloadAction.closed;
    pull_request: { title: string };
  };
};

type TPullRequestReviewEvent = {
  type: TypeEvents.PullRequestReviewEvent;
  payload: {
    action: PayloadAction.created;
  };
};

type TIssuesEvent = {
  type: TypeEvents.IssuesEvent;
  payload: {
    action: PayloadAction.opened | PayloadAction.closed;
    issue: { title: string };
  };
};

type TCommon = {
  id: string;
  repo: {
    id: number;
    name: string;
  };
};

export type { TGithubActivityFetchResponse };
