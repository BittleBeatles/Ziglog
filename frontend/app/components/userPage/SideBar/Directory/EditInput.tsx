'use client';
import React, {
  Dispatch,
  SetStateAction,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { InputHTMLAttributes } from 'react';
import IconButton from '../../../common/IconButton';
import Text from '../../../common/Text';
import { useAppSelector } from '@store/store';
import SideDataContext from '@(pages)/user-page/[userNickname]/SideDataContext';
import { JustFolder } from '@api/folder/types';
import { chageFolderList, getJustFolderList } from '@api/folder/folder';
import SvgIcon from '../../../common/SvgIcon';
import { canMoveFolder, isIdInRoot } from '@src/util/findParentId';

interface EditInputProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: 'light' | 'dark';
  setFolderEdit?: Dispatch<SetStateAction<boolean>>;
  editingFolderId: number;
}
interface THEME_FOCUSED {
  isFocused: boolean;
  theme: 'light' | 'dark';
}

const EditInput = forwardRef<HTMLInputElement, EditInputProps>(
  ({ theme = 'light', setFolderEdit, editingFolderId, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [justFolderList, setJustFolderList] = useState<JustFolder[]>([]);
    function getThemeVariant({ isFocused, theme }: THEME_FOCUSED) {
      if (isFocused && theme === 'light') return THEME_VARIANTS.focusLight;
      if (isFocused && theme === 'dark') return THEME_VARIANTS.focusDark;
      return THEME_VARIANTS[theme];
    }

    const themeClass = getThemeVariant({ isFocused, theme });
    const { nickname, rootFolderId } = useAppSelector((state) => state.user);
    const { getSideList, sideData } = useContext(SideDataContext);
    const isIdRoot = useMemo(() => {
      const res = isIdInRoot(sideData, editingFolderId);
      return res;
    }, [editingFolderId]);

    const changeFolder = async (parentId: number) => {
      await chageFolderList(parentId, editingFolderId);
      if (setFolderEdit) {
        setFolderEdit(false);
      }
      getSideList();
    };

    const getFolderList = async () => {
      const res = await getJustFolderList();
      if (res) {
        setJustFolderList(res);
      }
    };

    useEffect(() => {
      getFolderList();
    }, []);

    const canMoveFoldertoFolder = useCallback(
      (targetId: number, des: number) => {
        return canMoveFolder(targetId, des, sideData);
      },
      [sideData]
    );
    return (
      <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className={`flex flex-col rounded w-1/3 p-5 ${themeClass}`}>
          <div>
            <div className="flex justify-between mb-3">
              <Text type="h4">폴더 이동</Text>
              <IconButton
                theme={theme}
                name="Close"
                onClick={() => setFolderEdit && setFolderEdit(false)}
              />
            </div>
            <div className="border mb-3 p-2">
              {!isIdRoot && (
                <div
                  onClick={() => changeFolder(rootFolderId)}
                  className="mb-1 cursor-pointer opacity-100 hover:opacity-60 transition-opacity duration-300"
                >
                  <div className="flex items-center ">
                    <SvgIcon name="Folder" />
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
                    onClick={() => changeFolder(folder.id)}
                    className="mb-1 cursor-pointer opacity-100 hover:opacity-60 transition-opacity duration-300"
                  >
                    {canMoveFoldertoFolder(
                      editingFolderId,
                      folder.id
                    ).toString()}
                    {folder.id !== editingFolderId &&
                      canMoveFoldertoFolder(editingFolderId, folder.id) && (
                        <div className="flex items-center ">
                          <SvgIcon name="Folder" />

                          <Text className="text-lg ml-1">{folderParts}</Text>
                        </div>
                      )}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div className="mb-3">
              <Text type="h4">폴더명 수정</Text>
            </div>
            <div className={`h-16 p-2 text-lg flex border items-center `}>
              <input
                className={`w-full outline-none ${
                  theme === 'light' ? 'bg-white' : 'bg-dark-background-page'
                }`}
                ref={ref}
                {...rest}
                type="text"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

const THEME_VARIANTS = {
  light: 'bg-white text-black border border-border-grey',
  dark: 'bg-dark-background-page text-white border border-black',
  focusLight: 'bg-white text-black border border-grey',
  focusDark: 'bg-dark-background-page text-white border border-white-300',
};

export default EditInput;
