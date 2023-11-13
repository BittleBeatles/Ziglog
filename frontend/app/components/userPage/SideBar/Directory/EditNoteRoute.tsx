'use client';
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { InputHTMLAttributes } from 'react';
import IconButton from '@components/common/IconButton';
import Text from '@components/common/Text';
import SvgIcon from '@components/common/SvgIcon';
import { useAppSelector } from '@store/store';
import SideDataContext from '@(pages)/user-page/[userNickname]/SideDataContext';

import { JustFolder } from '@api/folder/types';
import { getJustFolderList } from '@api/folder/folder';
import { isIdInRoot } from '@src/util/findParentId';
import { changeNoteRoute } from '@api/note/note';
import colors from '@src/design/color';

interface EditNoteRouteProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: 'light' | 'dark';
  setNoteEdit?: Dispatch<SetStateAction<boolean>>;
  editingNoteId: number;
  editingNoteTitle: string;
}

function EditNoteRoute({
  theme = 'light',
  setNoteEdit,
  editingNoteId,
  editingNoteTitle,
}: EditNoteRouteProps) {
  const [justFolderList, setJustFolderList] = useState<JustFolder[]>([]);
  const { nickname, rootFolderId } = useAppSelector((state) => state.user);
  const { getSideList, sideData } = useContext(SideDataContext);

  const changeNote = async (parentId: number) => {
    await changeNoteRoute(parentId, editingNoteId);
    if (setNoteEdit) {
      setNoteEdit(false);
    }
    getSideList();
  };

  const title = useMemo(() => {
    return editingNoteTitle;
  }, []);

  const [hoverStatus, setHoverStatus] = useState<{ [key: number]: boolean }>(
    {}
  );
  const handleMouseEnter = (folderId: number) => {
    setHoverStatus((prevStatus) => {
      const newStatus = Object.keys(prevStatus).reduce<{
        [key: number]: boolean;
      }>((status, key) => {
        status[parseInt(key)] = false;
        return status;
      }, {});

      newStatus[folderId] = true;
      return newStatus;
    });
  };

  const handleMouseLeave = (folderId: number) => {
    setHoverStatus({ ...hoverStatus, [folderId]: false });
  };

  const isIdRoot = useMemo(() => {
    const res = isIdInRoot(sideData, editingNoteId);
    return res;
  }, [editingNoteId]);

  const getFolderList = async () => {
    const res = await getJustFolderList();
    if (res) {
      setJustFolderList(res);
    }
  };

  useEffect(() => {
    getFolderList();
  }, []);

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`flex flex-col rounded w-1/3 p-5  ${THEME_VARIANTS[theme]}`}
      >
        <div>
          <div className="flex justify-between mb-3">
            <Text type="h4">폴더이동</Text>
            <IconButton
              theme={theme}
              name="Close"
              onClick={() => setNoteEdit && setNoteEdit(false)}
            />
          </div>
          <div className="border mb-3 p-2">
            {!isIdRoot && (
              <div
                onClick={() => changeNote(rootFolderId)}
                className="mb-1 cursor-pointer opacity-100 hover:opacity-60 transition-opacity duration-300"
              >
                <div className="flex items-center ">
                  <SvgIcon
                    name="Folder"
                    color={theme === 'light' ? colors.black : colors.white}
                  />
                  <Text className="text-lg ml-1">{nickname}</Text>
                  <Text className="text-main-100 text-lg">/</Text>
                </div>
              </div>
            )}

            {justFolderList.map((folder) => {
              const folderParts = (nickname + folder.title)
                .split('/')
                .map((part, index, array) =>
                  index < array.length - 1
                    ? [
                        part,
                        <Text
                          type="span"
                          className="text-main-100 text-lg"
                          key={index}
                        >
                          /
                        </Text>,
                      ]
                    : part
                )
                .flat();

              return (
                <div
                  key={folder.id}
                  onClick={() => changeNote(folder.id)}
                  onMouseEnter={() => handleMouseEnter(folder.id)}
                  onMouseLeave={() => handleMouseLeave(folder.id)}
                  className="mb-1 cursor-pointer opacity-100 hover:opacity-60 transition-opacity duration-300"
                >
                  {folder.id !== editingNoteId && (
                    <div className="flex items-center">
                      <SvgIcon
                        name="Folder"
                        color={theme === 'light' ? colors.black : colors.white}
                      />
                      <Text className="text-lg ml-1">{folderParts}</Text>
                      {hoverStatus[folder.id] && (
                        <Text className="text-lg ml-1">
                          <Text type="span" className="text-main-100 text-lg">
                            /
                          </Text>
                          {title}
                        </Text>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const THEME_VARIANTS = {
  light: 'bg-white text-black border border-border-grey',
  dark: 'bg-dark-background-page text-white border border-black',
};

export default EditNoteRoute;
