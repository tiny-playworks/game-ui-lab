export function createRuntimeIdFactory() {
  let nextId = 0;

  return (scope: string) => {
    nextId += 1;
    return `${scope}-${nextId}`;
  };
}
