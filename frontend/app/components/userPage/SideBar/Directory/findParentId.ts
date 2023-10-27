import { DirectoryItem } from '../Directory';

export const findParentId = (
  list: DirectoryItem[],
  id: number,
  type: 'noteId' | 'folderId',
  parentId: number = -1
): number => {
  for (const item of list) {
    if (item.type === 'note' && type === 'noteId' && item.noteId === id) {
      return parentId;
    } else if (item.type === 'folder') {
      if (type === 'folderId' && item.folderId === id) {
        return parentId;
      }
      if (item.notes) {
        const result = findParentId(item.notes, id, type, item.folderId!);
        if (result !== undefined) {
          return result;
        }
      }
    }
  }
  return -1;
};
