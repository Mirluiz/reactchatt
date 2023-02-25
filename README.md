# react chat component | BETA

<p align="center">
 <img src='https://github.com/Mirluiz/reactchatt/blob/master/demo.gif'/>
</p>

## Getting Started

```bash
npm install reactchatt
```

## Demo

[Playground](https://reactchatt.az)

## Usage

```ts
import { ReactChat } from "renchat";

<ReactChat messages={messages} />;
```

## User guide

### Props

|             |         Description          |         Type          | Default  |
| :---------: | :--------------------------: | :-------------------: | :------: |
|  messages   |      Array of messages       | `Array<MessageProps>` |    []    |
| placeholder |     Composer placeholder     |       `string`        |  Write   |
|   typing    |       Typing animation       |       `boolean`       |  false   |
|    icon     |      Show user's icons       |       `boolean`       |  false   |
|    title    |      Show user's titles      |       `boolean`       |  false   |
|  threshold  | Edge reach threshold trigger |       `number`        |    0     |
|   loading   |      Loading animation       |       `boolean`       |  false   |
|    date     | Show date on messenger body  |       `boolean`       |   true   |
| dateFormat  |    Messenger date format     |       `boolean`       | 'MMMM D' |

### Events

|                    |                      Description                      |                   Type                   |
|:------------------:| :---------------------------------------------------: | :--------------------------------------: |
|      Message       |                     Message click                     |          `(id: string) => void`          |
| onMessageDblClick  |                 Message double click                  |          `(id: string) => void`          |
| onMessageItemClick | Message item click callback<br/> (e.g Multi messages) | `(message: string, id: string) => void;` |
| onMessageLongClick |              Message long Touch (mobile)              |          `(id: string) => void`          |
|      onPulled      |                Message Pulled (mobile)                |          `(id: string) => void`          |
|  onMessageContext  |               On message context click                |          `(id: string) => void`          |
|    onEdgeReach     |                Edge reach by scrolling                |               `() => void`               |

### Message types
1. MessageProps - common message type.
2. MessageTextProps;
```typescript
interface MessageTextProps {
  text: string;
  id: string;
  title: string;
  avatar?: string;
  position: "left" | "right";
  status: MessageStatus;
  pending?: boolean;
  edited?: boolean;
  date: Date;
  dateFormat?: string;
  type: "text";
  repliedMessage?: MessageProps;
  owner: string;
}
```
3. MessageFileProps
```typescript
interface MessageFileProps {
  id: string;
  type: "img" | "doc";
  url: string;
  title: string;
  secondary?: string;
  
  id: string;
  title: string;
  avatar?: string;
  position: "left" | "right";
  status: MessageStatus;
  pending?: boolean;
  edited?: boolean;
  date: Date;
  dateFormat?: string;
  type: "file";
  repliedMessage?: MessageProps;
  owner: string;
}
```
4. MessageImageProps
```typescript
interface MessageImageProps {
  id: string;
  title: string;
  url: string;
  width: number;
  height: number;
  
  id: string;
  title: string;
  avatar?: string;
  position: "left" | "right";
  status: MessageStatus;
  pending?: boolean;
  edited?: boolean;
  date: Date;
  dateFormat?: string;
  type: "img";
  repliedMessage?: MessageProps;
  owner: string;
}
```

|      Types       |                      Description                      |
|:----------------:|:-----------------------------------------------------:| 
|   MessageProps   | Common Message type (currenly - text, images, files.) |
| MessageTextProps |                <code>let a = 10</code>                |  
|   MessageProps   | Common Message type (currenly - text, images, files.) |  

### Custom renders

|                    |     Description      |                     Type                     | 
| :----------------: | :------------------: |:--------------------------------------------:| 
| renderTextMessage  | Custom text message  | `(message: MessageTextProps, order: "start"  <br/>| "end" | "middle" | "single") => JSX.Element` |
| renderImageMessage | Custom image message | `(message: MessageImageProps, order: "start" <br/>| "end" | "middle" | "single") => JSX.Element` |
| renderFileMessage  | Custom file message  | `(message: MessageFileProps, order: "start"  <br/>| "end" | "middle" | "single") => JSX.Element` |

### useChatApi

|          |       Description       |          Type          |
| :------: | :---------------------: | :--------------------: |
| scrollTo | Scroll to exact message | `(id: string) => void` |

## Plans

|                                   |             |
| :-------------------------------: | :---------: |
|           Multi images            | In progress |
|         Messenger header          |    Idle     |
| Messenger header typing animation |    Idle     |

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)



## P.S. 
I am open for job offers :)
{
mail: zey.verdiyev@gmail.com,
telegram: @mirluiz
}
