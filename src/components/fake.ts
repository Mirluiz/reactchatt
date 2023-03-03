import { MessageProps } from "./types";
import { users } from "./Dummies";
const generateFakeImage = (): string => {
  const baseUrl = "https://fakeimg.pl/";

  let randomResolutionLeft =
    Math.round((Math.floor(Math.random() * (60 - 15) + 15) / 50) * 10) * 50;

  let randomResolutionRight =
    Math.round((Math.floor(Math.random() * (60 - 15) + 15) / 50) * 10) * 50;

  let ret = `https://fakeimg.pl/${randomResolutionLeft}x${randomResolutionRight}`;

  return ret;
};

const generateFakeText = (maxL: number, minL: number): string => {
  const fullText = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae 
    ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur 
    aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui 
    dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore 
    magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut 
    aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, 
    vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
  `;

  const textArray = fullText.split(" ");

  let randomIndex = Math.floor(Math.random() * textArray.length - 2);
  let randomQ = Math.floor(Math.random() * (maxL - minL) + minL);
  let _ = textArray.slice(randomIndex, randomIndex + randomQ);

  return _.join(" ");
};

export const generateFake = (q: number): Array<MessageProps> => {
  let ret: Array<MessageProps> = [];
  let _i = 0;

  while (_i < q) {
    let isImage = byChance(10);
    let isLeft = byChance(50);

    ret.push({
      date: new Date(),
      edited: false,
      files: undefined,
      images: isImage
        ? [
            {
              id: _i + "image",
              title: "image" + _i,
              url: generateFakeImage(),
              height: 100,
              width: 100,
            },
          ]
        : undefined,
      pending: false,
      status: 2,
      text: generateFakeText(10, 1),
      owner: isLeft ? users.brodsky : users.me,
      type: isImage ? "img" : "text",
      id: _i.toString(),
    });
    _i++;
  }

  return ret;
};

const byChance = (percent: number) => {
  return Math.floor(Math.random() * (100 - 1) + 1) < percent;
};
