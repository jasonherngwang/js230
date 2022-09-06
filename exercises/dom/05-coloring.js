/*
Coloring

Write a function that colors a specific generation of the DOM tree.
A generation is a set of elements that are on the same level of indentation.

Input: One non-negative integer, the column number `col`

Algorithm
- Starting from body, traverse `col` levels down, and gather all elements at
  that level.
- Add class `generation-color` to all elements.

*/

function color(gen) {
  let allNodes = [document.querySelector('body')];
  let currentGen = 0;

  while (currentGen < gen) {
    allNodes = [...allNodes.flatMap((node) => [...node.children])];
    currentGen += 1;
  }
  if (currentGen > 0) {
    allNodes.forEach((node) => node.classList.add('generation-color'));
  }
}

// console.log(color(0));
// color(2);

// Recursive (from Karis)
function colorRecursive(gen, currentGen = 0, parent = document.body) {
  if (currentGen === gen && parent.id) {
    parent.classList.toggle('generation-color');
  }
  [...parent.children].forEach((child) =>
    colorRecursive(gen, currentGen + 1, child)
  );
}

colorRecursive(0);
colorRecursive(4);
colorRecursive(5);

// Gather nodes by level
function nodesUpToLevel(level) {
  let nodes = [[document.body]];
  let nodesAtCurrentLevel = [document.body];
  let currentGen = 0;

  while (currentGen < level) {
    nodesAtCurrentLevel = [
      ...nodesAtCurrentLevel.flatMap((node) => [...node.children]),
    ];
    nodes.push(nodesAtCurrentLevel);
    currentGen += 1;
  }
  return nodes;
}

function colorGen(gen) {
  const nodes = nodesUpToLevel(gen);
  nodes[nodes.length - 1].forEach((node) =>
    node.classList.toggle('generation-color')
  );
}

colorGen(7);
