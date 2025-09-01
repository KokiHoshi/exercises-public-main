export const PositiveNumber = (initialX) => {
  if (initialX <= 0) {
    throw new Error("require : x > 0");
  }

  let x = initialX;

  const api = {
    getX() {
      return x;
    },
    setX(next) {
      if (next <= 0) {
        throw new Error("require : x > 0");
      }
      x = next;
    },
  };

  return Object.freeze(api);
};
