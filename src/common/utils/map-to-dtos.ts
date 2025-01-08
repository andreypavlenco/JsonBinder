export function mapToDtos<T extends { title: string }>(array: string[]): T[] {
  return array.map((title) => ({
    title,
  })) as T[];
}
