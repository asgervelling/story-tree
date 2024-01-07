import { StoryTree, Tree, TreeNode } from "./types";

/**
 * Returns node new tree with the same structure as the input tree,
 * but with each node's data replaced by the result of the mapFn.
 */
export function mapTree<T, U>(
  node: TreeNode<T>,
  mapFn: (n: TreeNode<T>) => U
): TreeNode<U> {
  const mappedData = mapFn(node);

  return {
    data: mappedData,
    children: node.children.map((n) => mapTree(n, mapFn)),
  };
}

/**
 * Return a filtered tree,
 * that contains each subtree that passes the filter.
 * If a root node of a subtree gets filtered out,
 * null is returned.
 */
export function filterTree<T>(
  node: TreeNode<T>,
  filterFn: (n: TreeNode<T>) => boolean
): TreeNode<T> | null {
  if (!filterFn(node)) {
    return null;
  }

  return {
    data: node.data,
    children: node.children
      .map((n) => filterTree(n, filterFn))
      .filter((n) => n !== null) as TreeNode<T>[],
  };
}

export function forEachTree<T>(
  node: TreeNode<T>,
  forEachFn: (n: TreeNode<T>) => void
): void {
  forEachFn(node);
  node.children.forEach((n) => forEachTree(n, forEachFn));
}

/**
 * Do a DFS fold on the tree.
 */
export function reduceTree<T, U>(
  node: TreeNode<T>,
  reduceFn: (acc: U, n: TreeNode<T>) => U,
  initial: U
): U {
  const acc = reduceFn(initial, node);
  return node.children.reduce((acc, n) => reduceTree(n, reduceFn, acc), acc);
}

export function findPathToRoot<T>(
  root: TreeNode<T>,
  targetNode: TreeNode<T>
): TreeNode<T>[] | null {
  throw new Error("Not implemented");
}

/**
 * Find the unique path from node to target,
 * if it exists.
 */
function findPath<T>(node: TreeNode<T>, target: TreeNode<T>): TreeNode<T>[] {
  function dfs(
    node: TreeNode<T>,
    target: TreeNode<T>,
    currentPath: TreeNode<T>[]
  ): TreeNode<T>[] {
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
