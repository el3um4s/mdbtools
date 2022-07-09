// https://www.30secondsofcode.org/js/s/csv-to-json

const titleCSVToJSON = (data: string, delimiter = ","): string[] => {
  const dataNormalized = data.replace(/(\r\n|\n|\r)/gm, "\n").trim();
  const titles = dataNormalized
    .slice(0, dataNormalized.indexOf("\n"))
    .split(delimiter);
  return titles;
};

const CSVToJSON = (
  data: string,
  delimiter = ","
): Record<string, unknown>[] => {
  const dataNormalized = data.replace(/(\r\n|\n|\r)/gm, "\n").trim();
  const titles = dataNormalized
    .slice(0, dataNormalized.indexOf("\n"))
    .split(delimiter);
  return dataNormalized
    .slice(dataNormalized.indexOf("\n") + 1)
    .split("\n")
    .map((v) => {
      const values = v.split(delimiter);
      return titles.reduce(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (obj, title, index) => ((obj[title] = values[index]), obj),
        {}
      );
    });
};

export { CSVToJSON, titleCSVToJSON };
