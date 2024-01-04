type StoryTree = {
  root: StoryNode;
};

type StoryNode = {
  parent: StoryNode | null;
  children: StoryNode[];
};

type Game = {
  players: User[];
  storyTree: StoryTree | null;
  public: boolean;
}

type User = {
  username: string;
  email: string;
  pwHash: string;
};