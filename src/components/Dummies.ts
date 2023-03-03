import {
  createFileMessage,
  createImageMessage,
  createTextMessage,
  randomBetween,
  randomizer,
  randomMultiAmount,
  uuid4,
} from "./helper";
import {
  Users,
  File,
  User,
  UserNames,
  Image,
  MessageProps,
  MessageImageProps,
} from "./types";

export const users: Users = {
  me: {
    id: "1",
    name: "You",
    avatar: "/images/users/lermentovicon.jpg",
    generateMessage: (type) => createMessage("me", type),
  },
  mandelstam: {
    id: "2",
    name: "Mandelstam",
    avatar: "/images/users/osipicon.jpg",
    generateMessage: (type) => createMessage("mandelstam", type),
  },
  shakespeare: {
    id: "3",
    name: "Shakespeare",
    avatar: "/images/users/williamicon.jpeg",
    generateMessage: (type) => createMessage("shakespeare", type),
  },
  brodsky: {
    id: "4",
    name: "Brodsky",
    avatar: "/images/users/brodskyicon.jpeg",
    generateMessage: (type) => createMessage("brodsky", type),
  },
  pasternak: {
    id: "5",
    name: "Pasternak",
    avatar: "/images/users/pasternakicon.jpg",
    generateMessage: (type) => createMessage("pasternak", type),
  },
};

const createMessage = (
  user: UserNames,
  type: "text" | "file" | "files"
): MessageProps => {
  let ret;

  switch (type) {
    case "text":
      ret = createTextMessage(
        texts[user][randomizer("text", user)],
        users[user]
      );
      break;
    case "file":
      ret = createFileMessage(
        {
          caption: "test",
          files: [files[user][randomizer(type, user)]],
        },
        users[user]
      );
      break;
    case "files":
      ret = createFileMessage(
        {
          caption: "test",
          files: Array.apply(null, Array(randomMultiAmount("file", user))).map(
            () => {
              return files[user][randomizer("file", user)];
            }
          ),
        },
        users[user]
      );
      break;
  }

  return ret;
};

export const texts: { [key in UserNames]: Array<string> } = {
  me: [
    `
      Чтоб всю ночь, весь день мой слух лелея,
      Про любовь мне сладкий голос пел,
      Надо мной чтоб вечно зеленея
      Темный дуб склонялся и шумел.
    `,
    `
      На севере диком стоит одиноко
      На голой вершине сосна
      И дремлет качаясь, и снегом сыпучим
      Одета, как ризой, она.
      И снится ей всё, что в пустыне далекой –
      В том крае, где солнца восход,
      Одна и грустна на утесе горючем
      Прекрасная пальма растет.
    `,
    `
      Я жить хочу! Хочу печали
      Любви и счастию назло;
      Они мой ум избаловали
      И слишком сгладили чело.
    `,
    `
      Как страшно жизни сей оковы
      Нам в одиночестве влачить.
      Делить веселье — все готовы:
      Никто не хочет грусть делить.
    `,
    `
      Ужасная судьба отца и сына
      Жить розно и в разлуке умереть,
      И жребий чуждого изгнанника иметь
      На родине с названьем гражданина!
    `,
  ],
  shakespeare: [
    "The fault...is not in our stars, but in ourselves",
    "Many a true word hath been spoken in jest.",
    "Thought is free.",
    `
      From fairest creatures we desire increase,
      That thereby beauty’s rose might never die,
      But, as the riper should by time decease,
      His tender heir might bear his memory.
    `,
  ],
  brodsky: [
    `
      Мимо ристалищ, капищ,
      мимо храмов и баров,
      мимо шикарных кладбищ,
      мимо больших базаров,
      мира и горя мимо,
      мимо Мекки и Рима,
      синим солнцем палимы,
      идут по земле пилигримы.
    `,
    `
      Мы с тобой — никто, ничто
      Эти горы — наших фраз
      эхо, выросшее в сто,
      двести, триста тысяч раз.
    `,
    `
      Но переживи миг.
      И переживи век.
      Переживи крик.
      Переживи смех.
      
      Переживи стих.
      
      Переживи всех.
    `,
    `
      Того гляди, что из озерных дыр
      да и вообще — через любую лужу
      сюда полезет посторонний мир.
      Иль этот уползет наружу.
    `,
  ],
  pasternak: [
    `
      Другие по живому следу
      Пройдут твой путь за пядью пядь,
      Но пораженья от победы
      Ты сам не должен отличать.
    `,
    `
      Легко проснуться и прозреть,
      Словесный сор из сердца вытрясть
      И жить, не засоряясь впредь,
      Все это — небольшая хитрость.
    `,
  ],
  mandelstam: [
    `
      Я счастлив жестокой обидою, 
      И в жизни поxожей на сон,
      Я каждому тайно завидую
      И в каждого тайно влюблен.
    `,
    `
      Когда, закутанный плащом, 
      Не согревающим, но милым, 
      К повелевающим светилам 
      Смиренным возлетишь лучом. 
    `,
    `
      Нежнее нежного
      Лицо твое,
      Белее белого 
      Твоя рука, 
      От мира целого
      Ты далека, 
      И все твое – 
      От неизбежного. 
    `,
    `
      Или, свой путь и срок 
      Я, исчерпав, вернусь: 
      Там — я любить не мог, 
      Здесь — я любить боюсь... 
    `,

    `
      Ни о чем не нужно говорить, 
      Ничему не следует учить, 
      И печальна так и хороша 
      Темная звериная душа: 

      Ничему не хочет научить, 
      Не умеет вовсе говорить 
      И плывет дельфином молодым 
      По седым пучинам мировым. 
    `,
    `
      Я получил блаженное наследство —  
      Чужих певцов блуждающие сны; 
      Свое родство и скучное соседство 
      Мы презирать заведомо вольны. 
    `,
  ],
};

export const files: { [key in UserNames]: Array<File> } = {
  me: [
    {
      id: uuid4(),
      type: "img",
      url: "/images/users/lerm.jpg",
      title: "poetry.pdf",
      secondary: "1.0 MB",
    },
    {
      id: uuid4(),
      type: "img",
      url: "/images/users/lerm1.jpg",
      title: "poetry1.pdf",
      secondary: "1.3 MB",
    },
    {
      id: uuid4(),
      type: "img",
      url: "/images/users/lerm2.jpg",
      title: "geroi.pdf",
      secondary: "2.2 MB",
    },
  ],
  shakespeare: [
    {
      id: uuid4(),
      type: "img",
      url: "/images/users/shacs.jpg",
      title: "macbeth.pdf",
      secondary: "1.0 MB",
    },
    {
      id: uuid4(),
      type: "img",
      url: "/images/users/shacs2.webp",
      title: "mid.pdf",
      secondary: "1.3 MB",
    },
    {
      id: uuid4(),
      type: "img",
      url: "/images/users/shacs3.jpg",
      title: "r&j.pdf",
      secondary: "2.2 MB",
    },
    {
      id: uuid4(),
      type: "img",
      url: "/images/users/shacs4.webp",
      title: "caeser.pdf",
      secondary: "1.8 MB",
    },
  ],
  mandelstam: [
    {
      id: uuid4(),
      type: "img",
      url: "/images/users/mand.jpg",
      title: "шум времен.pdf",
      secondary: "2.0 MB",
    },
    {
      id: uuid4(),
      type: "img",
      url: "/images/users/mand1.jpg",
      title: "камень.pdf",
      secondary: "1.2 MB",
    },
    {
      id: uuid4(),
      type: "img",
      url: "/images/users/mand2.jpg",
      title: "поэт и царь.pdf",
      secondary: "1.7 MB",
    },
  ],
  pasternak: [
    {
      id: uuid4(),
      type: "img",
      url: "/images/users/pasternak.jpg",
      title: "doktor.pdf",
      secondary: "1.0 MB",
    },
    {
      id: uuid4(),
      type: "img",
      url: "/images/users/pasternak1.jpg",
      title: "poetry.pdf",
      secondary: "1.3 MB",
    },
    {
      id: uuid4(),
      type: "img",
      url: "/images/users/pasternak2.jpg",
      title: "poetry1.pdf",
      secondary: "2.2 MB",
    },
    {
      id: uuid4(),
      type: "img",
      url: "/images/users/pasternak3.jpg",
      title: "poetry3.pdf",
      secondary: "1.8 MB",
    },
  ],
  brodsky: [
    {
      id: uuid4(),
      type: "img",
      url: "/images/users/bro.jpg",
      title: "poetry.pdf",
      secondary: "1.0 MB",
    },
    {
      id: uuid4(),
      type: "img",
      url: "/images/users/bro1.jpeg",
      title: "poetry1.pdf",
      secondary: "1.3 MB",
    },
    {
      id: uuid4(),
      type: "img",
      url: "/images/users/bro2.jpg",
      title: "poetry2.pdf",
      secondary: "2.2 MB",
    },
  ],
};
