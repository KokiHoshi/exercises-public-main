export function makeProxyAndLogs(target) {
  const logs = [];

  const handler = {
    get(obj, prop, receiver) {
      const value = Reflect.get(obj, prop, receiver);

      if (typeof value !== "function") {
        return value;
      }

      return function (...args) {
        logs.push({
          name: String(prop),
          args,
          timestamp: new Date(),
        });

        return value.apply(obj, args);
      };
    },
  };

  const proxy = new Proxy(target, handler);
  return [proxy, logs];
}
