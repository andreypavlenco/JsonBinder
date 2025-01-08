import { filterUnique } from './filter-unique';
import { mapToDtos } from './map-to-dtos';

export function checkUnique<
  T extends { title: string },
  K extends { title: string },
>(arrayT: T[], arrayK: string[]): K[] {
  const dtos = mapToDtos<K>(arrayK);
  return filterUnique(arrayT, dtos, (item) => item.title);
}
