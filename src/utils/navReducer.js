const SCREENS = {
  HOME: "home",
  ADD_PODCAST: "add_podcast",
  PODCASTS: "podcasts",
  EPISODE: "episode",
};

function navReducer(stack, action) {
  switch (action.type) {
    case "PUSH":
      return [...stack, action.screen];

    case "POP":
      return stack.length > 1 ? stack.slice(0, -1) : stack;

    case "RESET":
      return [action.screen];

    default:
      return stack;
  }
}

export { navReducer, SCREENS };
