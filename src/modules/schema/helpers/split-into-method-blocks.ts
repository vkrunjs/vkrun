import { SchemaMethod } from "../../types";

export const splitIntoMethodBlocks = (methods: SchemaMethod[]): SchemaMethod[][] => {
  const blocks: SchemaMethod[][] = [];
  let currentBlock: SchemaMethod[] = [];

  for (const m of methods) {
    if (m.method === "parseTo") {
      blocks.push(currentBlock);
      currentBlock = [];
    } else {
      currentBlock.push(m);
    }
  }

  if (currentBlock.length > 0) {
    blocks.push(currentBlock);
  }
  return blocks;
};
