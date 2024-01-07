import { describe, it, expect } from "@jest/globals";
import { filterTree, forEachTree, mapTree, reduceTree } from "./tree_operations";
import { TreeNode } from "./types";

const lessThan10 = (n: TreeNode<number>) => n.data < 10;

describe("filterTree", () => {
  it("should return null if the root node is filtered out", () => {
    const t: TreeNode<number> = {
      data: 15,
      children: [
        {
          data: 1,
          children: []
        }
      ]
    }

    const expected = null;
    const actual = filterTree(t, lessThan10);
    expect(actual).toStrictEqual(expected);
  });

  it("should return a tree with one node if the filter function returns true on only a root node", () => {
    const t: TreeNode<number> = {
      data: 1,
      children: []
    }
    
    const expected: TreeNode<number> = {
      data: 1,
      children: []
    };
    const actual = filterTree(t, lessThan10);
    expect(actual).toStrictEqual(expected);
  });

  it("should remove any subtrees whose roots are filtered out", () => {
    const t: TreeNode<number> = {
      data: 1,
      children: [
        {
          data: 15,
          children: [
            {
              data: 2,
              children: [],
            }
          ]
        }
      ]
    }

    const expected: TreeNode<number> = {
      data: 1,
      children: []
    };
    const actual = filterTree(t, lessThan10);
    expect(actual).toStrictEqual(expected);
  });

  it("should filter out a child's sibling and keep the other sibling", () => {
    const t: TreeNode<number> = {
      data: 5,
      children: [
        {
          data: 15, // Will be filtered out
          children: []
        },
        {
          data: 6,
          children: []
        }
      ]
    };

    const expected: TreeNode<number> = {
      data: 5,
      children: [
        {
          data: 6,
          children: []
        }
      ]
    };
    const actual = filterTree(t, lessThan10);
    expect(actual).toStrictEqual(expected);
  });

  it("should filter out a sibling and keep multiple other siblings", () => {
    const t: TreeNode<number> = {
      data: 5,
      children: [
        {
          data: 15, // Will be filtered out
          children: []
        },
        {
          data: 6,
          children: []
        },
        {
          data: 7,
          children: []
        }
      ]
    };

    const expected: TreeNode<number> = {
      data: 5,
      children: [
        {
          data: 6,
          children: []
        },
        {
          data: 7,
          children: []
        }
      ]
    };
    const actual = filterTree(t, lessThan10);
    expect(actual).toStrictEqual(expected);
  });

  it("should filter out a sibling and keep multiple other siblings, some of which have children", () => {
    const t: TreeNode<number> = {
      data: 5,
      children: [
        {
          data: 15,
          children: []
        },
        {
          data: 6,
          children: [
            {
              data: 7,
              children: [
                {
                  data: 88,
                  children: [
                    {
                      data: 99,
                      children: []
                    },
                    {
                      data: 9,
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          data: 8,
          children: []
        }
      ]
    };
    
    const expected: TreeNode<number> = {
      data: 5,
      children: [
        {
          data: 6,
          children: [
            {
              data: 7,
              children: []
            }
          ]
        },
        {
          data: 8,
          children: []
        }
      ]
    };
    const actual = filterTree(t, lessThan10);
    expect(actual).toStrictEqual(expected);
  });
})

describe("mapTree", () => {
  it("should map a TreeNode<T> to a TreeNode<U>", () => {
    const t: TreeNode<number> = {
      data: 1,
      children: []
    };

    const expected: TreeNode<string> = {
      data: "1",
      children: []
    };

    const actual = mapTree(t, n => n.data.toString());
    expect(actual).toStrictEqual(expected);
  });
});

describe("reduceTree", () => {
  it("should reduce a TreeNode<T> to a U", () => {
    const t: TreeNode<number> = {
      data: 1,
      children: [
        {
          data: 2,
          children: []
        },
        {
          data: 3,
          children: []
        }
      ]
    };

    const expected = 6;
    const actual = reduceTree(t, (acc, n) => acc + n.data, 0);
    expect(actual).toStrictEqual(expected);
  });
})

describe("forEachTree", () => {
  it("should call a function on each node in a TreeNode<T>", () => {
    const t: TreeNode<number> = {
      data: 1,
      children: [
        {
          data: 2,
          children: []
        },
        {
          data: 3,
          children: []
        }
      ]
    };

    const expected = [1, 2, 3];
    const actual: number[] = [];
    forEachTree(t, n => actual.push(n.data));
    expect(actual).toStrictEqual(expected);
  });
});