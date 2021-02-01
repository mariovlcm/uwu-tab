export class ColorUtil {
  static async strRgbToNumArray(input: string): Promise<number[]> {
    const a = input.replace("rgb(", "").replace(")", "").split(",");
    const b: number[] = [];
    a.forEach((i) => b.push(parseInt(i)));
    return b;
  }
  static async numArrayToStrRgb(input: number[]): Promise<string> {
    if (input.length > 3) throw "Incorrect input array";
    return `rgb(${input[0] + 10 > 255 ? 255 : input[0] + 10},${
      input[1] + 10 > 255 ? 255 : input[1] + 10
    },${input[2] + 10 > 255 ? 255 : input[2] + 10} )`;
  }
}
