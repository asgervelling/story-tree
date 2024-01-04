import { StoryTree, StoryNode, Game, User } from "./types";

function dfs(n: StoryNode, mapFn: (n: StoryNode) => void): void {
  mapFn(n);
  n.children.forEach((child) => dfs(child, mapFn));
}

const tree: StoryTree = {
  root: {
    text: "Root n",
    children: [
      {
        text: "A",
        children: [
          {
            text: "A1",
            children: [],
          },
        ],
      },
      {
        text: "B",
        children: [
          {
            text: "B1",
            children: [],
          },
          {
            text: "B2",
            children: [],
          },
        ],
      },
    ],
  },
};

dfs(tree.root, (n) => console.log(n.text));