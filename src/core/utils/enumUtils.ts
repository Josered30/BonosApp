export interface EnumData {
  label: string;
  value: number;
}

export function getEnumData(enumType: any): EnumData[] {
  let arr: EnumData[] = [];
  for (const value in Object.keys(enumType)) {
    if (typeof enumType[value] !== "string") {
      continue;
    }

    arr.push({
      label: enumType[Number(value)],
      value: Number(value),
    });
  }
  return arr;
}
