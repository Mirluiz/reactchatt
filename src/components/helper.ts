import { files, texts } from "./Dummies";
import {
  User,
  UserNames,
  File,
  MessageProps,
  MessageFileProps,
  MessageImageProps,
  MessageTextProps,
} from "./types";

export const randomizer = (type: "file" | "text", user: UserNames): number => {
  let min = 0,
    max;
  switch (type) {
    case "text":
      max = texts[user].length - 1;
      break;
    case "file":
      max = files[user].length - 1;
      break;
  }

  let random = Math.floor(Math.random() * (max - min + 1) + min);

  return random;
};

export const randomBetween = (max: number, min: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const randomMultiAmount = (
  type: "file" | "text",
  user: UserNames
): number => {
  let min = 2,
    max;
  switch (type) {
    case "text":
      max = texts[user].length - 1;
      break;
    case "file":
      max = files[user].length - 1;
      break;
  }

  let random = Math.floor(Math.random() * (max - min + 1) + min);

  return random;
};

export const createTextMessage = (
  content: string,
  user: User
): MessageTextProps => {
  let ret: MessageTextProps = {
    date: new Date(new Date().getTime()),
    edited: false,
    pending: false,
    status: 2,
    id: uuid4(),
    text: content,
    type: "text",
    owner: {
      id: user.id,
      avatar: user.avatar,
      name: user.name,
    },
  };

  return ret;
};

export const createImageMessage = (
  content: { caption?: string; amount: number },
  user: User,
  addMessage: (m: MessageImageProps) => void
): void => {
  let imgs = [];
  let newMessage: MessageImageProps = {
    date: new Date(),
    edited: false,
    id: uuid4(),
    pending: false,
    status: 1,
    type: "img",
    owner: user,
    images: [],
  };

  let _i = 0;
  while (_i < content.amount) {
    imgs.push({
      id: uuid4(),
      url: generateFakeImage(),
    });
    _i++;
  }

  let promises = imgs.map((img) => {
    return new Promise(
      (
        resolve: (res: {
          id: string;
          title: string;
          url: string;
          height: number;
          width: number;
        }) => void,
        reject
      ) => {
        getMeta(img.url, (localImg) => {
          localImg &&
            resolve({
              title: "text",
              id: img.id,
              url: img.url,
              height: localImg.height,
              width: localImg.width,
            });
        });
      }
    );
  });

  Promise.all(promises).then((results) => {
    results.map((res) => {
      newMessage.images.push({
        id: res.id,
        title: "text",
        url: res.url,
        height: res.height,
        width: res.width,
      });
    });
    addMessage(newMessage);
  });
};

export const createFileMessage = (
  content: { caption?: string; files: Array<File> },
  user: User
): MessageFileProps => {
  let ret: MessageFileProps = {
    id: uuid4(),
    date: new Date(new Date().getTime()),
    edited: false,
    pending: false,
    status: 2,
    caption: content.caption,
    files: content.files,
    type: "file",
    owner: {
      id: user.id,
      avatar: user.avatar,
      name: user.name,
    },
  };

  return ret;
};

export const uuid4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const generateFakeImage = (): string => {
  const baseUrl = "https://fakeimg.pl/";

  let randomResolutionLeft =
    Math.round((Math.floor(Math.random() * (60 - 15) + 15) / 50) * 10) * 50;

  let randomResolutionRight =
    Math.round((Math.floor(Math.random() * (60 - 15) + 15) / 50) * 10) * 50;

  let ret = `https://fakeimg.pl/${randomResolutionLeft}x${randomResolutionRight}`;

  return ret;
};

export const getMeta = (
  url: string,
  callBack: (
    info: null | { width: number; height: number },
    err?: string | Event
  ) => void
) => {
  const img = new Image();
  img.onload = () =>
    callBack({
      height: img.height,
      width: img.width,
    });
  img.onerror = (err) => callBack(null, err);
  img.src = url;
};
