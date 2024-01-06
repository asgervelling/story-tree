export type Tree<T> = {
  root: TreeNode<T>;
}

export type TreeNode<T> = {
  data: T;
  children: TreeNode<T>[];
}

export type StoryTree = Tree<StoryEntry>;

export type StoryNode = TreeNode<StoryEntry>;

export type StoryEntry = {
  text: string;
  writtenBy: string;
  writtenAt: Date;
}

export type PublicGame = {
  players: string[];
  storyTree: StoryTree;
}

export type PrivateGame = {
  players: User[];
  storyTree: StoryTree;
}

export type User = {
  username: string;
  email: string;
  pwHash: string;
};