'use client';
import React, {
  Dispatch,
  SetStateAction,
  forwardRef,
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
import {
  changeFolderList,
  getForFolderRouterFolderList,
} from '@api/folder/folder';
import SvgIcon from '../../../common/SvgIcon';
import { isIdInRoot } from '@src/util/findParentId';
import colors from '@src/design/color';

interface EditInputProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: 'light' | 'dark';
  setFolderEdit?: Dispatch<SetStateAction<boolean>>;
  editingFolderId: number;
  editingTitle: string;
}
interface THEME_FOCUSED {
  isFocused: boolean;
  theme: 'light' | 'dark';
}

const EditInput = forwardRef<HTMLInputElement, EditInputProps>(
  (
    { theme = 'light', setFolderEdit, editingFolderId, editingTitle, ...rest },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [justFolderList, setJustFolderList] = useState<JustFolder[]>([]);
    function getThemeVariant({ isFocused, theme }: THEME_FOCUSED) {
      if (isFocused && theme === 'light') return THEME_VARIANTS.focusLight;
      if (isFocused && theme === 'dark') return THEME_VARIANTS.focusDark;
      return THEME_VARIANTS[theme];
    }

    const themeClass = getThemeVariant({ isFocused, theme });
    const { nickname, rootFolderId } = useAppSelector((state) => state.user);
    const { getSideList, sideData, getGraphData } = useContext(SideDataContext);
    const isIdRoot = useMemo(() => {
      const res = isIdInRoot(sideData, editingFolderId);
      return res;
    }, [editingFolderId]);

    const changeFolder = async (parentId: number) => {
      await changeFolderList(parentId, editingFolderId);
      if (setFolderEdit) {
        setFolderEdit(false);
      }
      getSideList();
      getGraphData();
    };

    const getFolderList = async () => {
      const res = await getForFolderRouterFolderList(editingFolderId);
      if (res) {
        setJustFolderList(res);
      }
    };

    // 호버효과

    const title = useMemo(() => {
      return editingTitle;
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

    useEffect(() => {
      getFolderList();
    }, []);

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
                    <SvgIcon
                      name="FileMove"
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
                    onClick={() => changeFolder(folder.id)}
                    onMouseEnter={() => handleMouseEnter(folder.id)}
                    onMouseLeave={() => handleMouseLeave(folder.id)}
                    className="mb-1 cursor-pointer opacity-100 hover:opacity-60 transition-opacity duration-300"
                  >
                    {folder.id !== editingFolderId && (
                      <div className="flex items-center ">
                        <SvgIcon
                          name="FileMove"
                          color={
                            theme === 'light' ? colors.black : colors.white
                          }
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
