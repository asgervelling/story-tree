import { Tree, TreeNode } from "./types";

function dfs<T>(n: TreeNode<T>, mapFn: (n: TreeNode<T>) => void): void {
  mapFn(n);
  n.children.forEach((child) => dfs(child, mapFn));
}

const tree: Tree<string> = {
  root: {
    data: "Root n",
    children: [
      {
        data: "A",
        children: [
          {
            data: "A1",
            children: [],
          },
        ],
      },
      {
        data: "B",
        children: [
          {
            data: "B1",
            children: [],
          },
          {
            data: "B2",
            children: [],
          },
        ],
      },
    ],
  },
};

dfs(tree.root, (n) => console.log(n.data));
