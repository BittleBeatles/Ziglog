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

export function isIdInRoot(data: DirectoryItem[], id: number) {
  for (const item of data) {
    if (item.id === id) {
      return true;
    }
  }
  return false;
}

function getAllSubFolderIds(folderId: number, folders: DirectoryItem[]) {
  const subFolderIds: number[] = [];

  function findSubFolders(currentFolderId: number) {
    folders.forEach((folder) => {
      if (
        folder.type === 'folder' &&
        folder.id === currentFolderId &&
        folder.notes
      ) {
        folder.notes.forEach((note) => {
          if (note.type === 'folder') {
            subFolderIds.push(note.id);
            findSubFolders(note.id);
          }
        });
      }
    });
  }

  findSubFolders(folderId);
  return subFolderIds;
}

export function canMoveFolder(
  targetFolderId: number,
  destinationFolderId: number,
  folders: DirectoryItem[]
) {
  const subFolders = getAllSubFolderIds(targetFolderId, folders);
  return !subFolders.includes(destinationFolderId);
}
