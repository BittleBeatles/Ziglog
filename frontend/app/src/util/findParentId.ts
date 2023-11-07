import { DirectoryItem } from '@api/folder/types';
import { store } from '@store/store';

const rootid = store.getState().user.rootFolderId;

export const findParentId = (
  list: DirectoryItem[],
  id: number,
  type: 'noteId' | 'folderId',
  parentId: number = rootid
): number => {
  for (const item of list) {
    if (item.type === 'note' && type === 'noteId' && item.id === id) {
      return parentId;
    } else if (item.type === 'folder') {
      if (type === 'folderId' && item.id === id) {
        return parentId;
      }
      if (item.notes) {
        const result = findParentId(item.notes, id, type, item.id!);
        if (result !== undefined) {
          return result;
        }
      }
    }
  }
  return rootid;
};

export function findFolderIdByNoteId(list: DirectoryItem[], noteId: number) {
  for (const item of list) {
    if (item.type === 'folder' && item.notes) {
      for (const note of item.notes) {
        if (note.id === noteId) {
          return item.id;
        }
      }
    }
  }
  return rootid;
}
