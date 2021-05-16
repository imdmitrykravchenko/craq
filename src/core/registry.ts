const createRegistry = <T>() => {
  const registry = new Map<string, T>();

  return {
    register(key: string, value: T) {
      registry.set(key, value);
    },
    has(key: string) {
      return registry.has(key);
    },
    get(key: string) {
      return registry.get(key);
    },
    entries(): { [key: string]: T } {
      return [...registry.entries()].reduce(
        (result, [key, value]) => ({ ...result, [key]: value }),
        {},
      );
    },
  };
};

export default createRegistry;
