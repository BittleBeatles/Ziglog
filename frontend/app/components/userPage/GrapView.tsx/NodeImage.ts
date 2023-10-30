import { Node } from '../GraphView';

const folderIconSrc =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
    <path fill="#3D4EFE" d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Z"/>
    <path fill="#3D4EFE" d="M880-720q0 33-23.5 56.5T800-640H160q-33 0-56.5-23.5T80-720H880z"/>
</svg>

`
  );
const noteIconSrc =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
    <path d="M240-880h320v160h240v480H240z" fill="#ffffff"/>
    <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/>
</svg>
`
  );
const linkIconSrc =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
    <path d="M240-880h320v160h240v480H240z" fill="#ffffff"/>
    <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" fill="#3D4EFE"/>
</svg>`
  );

let isFolderIconLoaded = false;
let isNoteIconLoaded = false;
let isLinkIconLoaded = false;
let isRootIconLoaded = false;

let folderIcon: HTMLImageElement | undefined;
let noteIcon: HTMLImageElement | undefined;
let linkIcon: HTMLImageElement | undefined;
let rootIcon: HTMLImageElement | undefined;

if (typeof window !== 'undefined') {
  folderIcon = new Image();
  noteIcon = new Image();
  linkIcon = new Image();
  rootIcon = new Image();

  folderIcon.onload = function () {
    isFolderIconLoaded = true;
  };

  noteIcon.onload = function () {
    isNoteIconLoaded = true;
  };

  linkIcon.onload = function () {
    isLinkIconLoaded = true;
  };

  rootIcon.onload = function () {
    isRootIconLoaded = true;
  };
}

export function loadIcons() {
  if (folderIcon && noteIcon && linkIcon && rootIcon) {
    folderIcon.src = folderIconSrc;
    noteIcon.src = noteIconSrc;
    linkIcon.src = linkIconSrc;
    rootIcon.src =
      'https://image.xportsnews.com/contents/images/upload/article/2022/1128/1669621507974521.jpg';
  }
}

export function getIsFolderIconLoaded() {
  return isFolderIconLoaded;
}

export function getIsNoteIconLoaded() {
  return isNoteIconLoaded;
}

export function getIsLinkIconLoaded() {
  return isLinkIconLoaded;
}

export function getIsRootIconLoaded() {
  return isRootIconLoaded;
}

export function nodePaint(node: Node, ctx: CanvasRenderingContext2D) {
  loadIcons();

  const drawIcon = (
    icon: HTMLImageElement,
    x: number,
    y: number,
    name: string
  ) => {
    ctx.drawImage(icon, x - 12, y - 12, 24, 24);
    ctx.fillText(name, x, y + 25);
    ctx.textAlign = 'center';
  };

  const drawCircle = (
    icon: HTMLImageElement,
    x: number,
    y: number,
    name: string
  ) => {
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, 2 * Math.PI, false);

    ctx.drawImage(icon, x - 12, y - 12, 24, 24);

    ctx.fillText(name, x, y + 25);
    ctx.textAlign = 'center';
  };

  switch (node.type) {
    case 'folder':
      if (
        getIsFolderIconLoaded() &&
        node.x &&
        node.y &&
        node.name &&
        folderIcon
      ) {
        drawIcon(folderIcon, node.x, node.y, node.name);
      }
      break;
    case 'root':
      if (getIsRootIconLoaded() && node.x && node.y && node.name && rootIcon) {
        drawCircle(rootIcon, node.x, node.y, node.name);
      }
      break;
    case 'note':
      if (getIsNoteIconLoaded() && node.x && node.y && node.name && noteIcon) {
        drawIcon(noteIcon, node.x, node.y, node.name);
      }
      break;
    case 'link':
      if (getIsLinkIconLoaded() && node.x && node.y && node.name && linkIcon) {
        drawIcon(linkIcon, node.x, node.y, node.name);
      }
      break;
    default:
      // if (node.x && node.y && node.name) {
      //   drawCircle(node.x, node.y, '#FF0000', node.name);
      // }
      break;
  }
}
