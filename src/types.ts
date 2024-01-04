export type StoryTree = {
  root: StoryNode;
};

export type StoryNode = {
  text: string;
  children: StoryNode[];
};

export type Game = {
  players: User[];
  storyTree: StoryTree | null;
  public: boolean;
}

export type User = {
  username: string;
  email: string;
  pwHash: string;
};