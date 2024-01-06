1. User clicks "New Game".
2. User is prompted to enter a name and the first sentence of the story tree.
3. User is presented with a story tree with only a root node: The sentence they wrote.

Objects created:

```typescript
const entry: StoryEntry = {
  text: "<Sentence>",
  writtenAt: Date.now(),
  writtenBy: "<Username>"
}

const tree: StoryTree = {
  data: entry,
  children: []
}

const game: Game = {
  players: [],
  storyTree: tree;
  public: false;
}
```
