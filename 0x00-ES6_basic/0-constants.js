// Modified dunction to instantiate variables using cost
export function taskFirst() {
  const task = 'I prefer const when I can.';
  return task;
}

// Modified function to instantiate variables using let
export function taskNext() {
  let combination = 'But sometimes let';
  combination += getLast();

  return combination;
}

// Utility function used in taskNext
export function getLast() {
  return ' is okay';
}
