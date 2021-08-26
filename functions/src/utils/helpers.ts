import xss from "xss";

export const stripScriptTags = (...args: string[]): string[] => {
  const xssOptions = {
    // whiteList: [],
    // stripIgnoreTag: [],
    stripIgnoreTagBody: ['script'],
  };

  const answerArray = args.map((val) => (val ? xss(val, xssOptions) : val));
  return answerArray;
};
