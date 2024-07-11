export default function getArgVariable(name: string) {
  const processArg = process.argv.slice(2);

  if (processArg.findIndex((string) => string === `--${name}`) === -1) {
    return undefined;
  }

  const variableValue =
    processArg[processArg.findIndex((string) => string === `--${name}`) + 1];

  return variableValue;
}
