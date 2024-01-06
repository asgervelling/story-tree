import { StoryTree, Tree, TreeNode } from "./types";

/**
 * Returns node new tree with the same structure as the input tree,
 * but with each node's data replaced by the result of the mapFn.
 */
export function mapTree<T, U>(node: TreeNode<T>, mapFn: (n: TreeNode<T>) => U): TreeNode<U> {
  return {
    data: mapFn(node),
    children: node.children.map((n) => mapTree(n, mapFn))
  };
}

/**
 * Return a filtered tree, where each node is included if the filterFn returns true.
 * If a node is filtered out, its children become its parent's children.
 * If a node is included, its children are filtered recursively.
 */
// export function filterTree<T>(node: TreeNode<T>, filterFn: (n: TreeNode<T>) => boolean): TreeNode<T> {
//   let parent = { ...node };
//   while (1) {
    
//   }
// }

export function forEachTree<T>(node: TreeNode<T>, forEachFn: (n: TreeNode<T>) => void): void {
  forEachFn(node);
  node.children.forEach((n) => forEachTree(n, forEachFn));
}

export function reduceTree<T, U>(node: TreeNode<T>, reduceFn: (acc: U, n: TreeNode<T>) => U, initial: U): U {
  throw new Error("Not implemented");
}

export function findPathToRoot<T>(root: TreeNode<T>, targetNode: TreeNode<T>): TreeNode<T>[] | null {
  throw new Error("Not implemented");
}

/**
 * Find the unique path from node to target,
 * if it exists.
 */
function findPath<T>(node: TreeNode<T>, target: TreeNode<T>): TreeNode<T>[] {
  function dfs(node: TreeNode<T>, target: TreeNode<T>, currentPath: TreeNode<T>[]): TreeNode<T>[] {
    const path = [...currentPath, node];

    if (node === target) {
      return path;
    }

    for (const child of node.children) {
      const result = dfs(child, target, path);
      if (result) {
        return result;
      }
    }

    return path;
  }

  return dfs(node, target, []);
}

type TreeArray<T> = (T | TreeArray<T>)[];

function toFilteredTreeList<T>(node: TreeNode<T>, filterFn: (node: TreeNode<T>) => boolean): TreeArray<T> {
  let filtered: TreeArray<T> = [];
  node.children.forEach((n) => {
    filtered.push(toFilteredTreeList(n, filterFn));
  })

  if (filterFn(node)) {
    return [node.data, ...filtered];
  }
  else {
    return [...filtered];
  }
}

const toFilter: Tree<number> = {
  root: {
    data: 5,
    children: [
      {
        data: 15,
        children: []
      },
      {
        data: 6,
        children: []
      }
    ]
  }
};
const expectedFilteredArray: TreeArray<number> = [5, [[], [6]]];
console.log(toFilteredTreeList(toFilter.root, (n: TreeNode<number>) => n.data < 10))

const b2 = {
  data: "B2",
  children: [],
};

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
          b2,
        ],
      },
    ],
  },
};


// console.log(findPath(tree.root, b2));
// [1 [3 [], 1 [2 []]]]
const t: TreeNode<number> = {
  data: 1,
  children: [
    {
      data: 22,
      children: [
        {
          data: 3,
          children: [
            {
              data: 13,
              children: [],
            },
          ],
        },
      ],
    },
    {
      data: 1,
      children: [
        {
          data: 2,
          children: [],
        },
        {
          data: 14,
          children: [],
        },
      ],
    },
  ],
};

const expected: TreeNode<number> = {
  data: 1,
  children: [
    {
      data: 3,
      children: [
        {
          data: 13,
          children: [],
        },
      ],
    },
    {
      data: 1,
      children: [
        {
          data: 2,
          children: [],
        },
      ],
    },
  ],
};

// const printNumberTree = (t: TreeNode<number>) => forEachTree(t, (n) => console.log(n.data));
// const filteredTree = filterTree(t, (n) => n.data < 10); // 
// if (filteredTree) {
//   printNumberTree(filteredTree);
// }