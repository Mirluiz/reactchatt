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

|                   |         Description          |          Type          | Default |
|:-----------------:|:----------------------------:|:----------------------:|:-------:|
|     messages      |      Array of messages       | `Array<MessageProps>`  |   []    |
|    placeholder    |     Composer placeholder     |        `string`        |  Write  |
|      typing       |       Typing animation       |       `boolean`        |  false  |
|       icon        |      Show user's icons       |       `boolean`        |  false  |
|       title       |      Show user's titles      |       `boolean`        |  false  |
|     threshold     | Edge reach threshold trigger |        `number`        |    0    |
|      loading      |      Loading animation       |       `boolean`        |  false  |

### Events
|                    |                      Description                      |                   Type                   |
|:------------------:|:-----------------------------------------------------:|:----------------------------------------:|
|   onMessageClick   |                     Message click                     |          `(id: string) => void`          |
| onMessageDblClick  |                 Message double click                  |          `(id: string) => void`          |
| onMessageItemClick | Message item click callback<br/> (e.g Multi messages) | `(message: string, id: string) => void;` |
| onMessageLongClick |              Message long Touch (mobile)              |          `(id: string) => void`          |
|      onPulled      |                Message Pulled (mobile)                |          `(id: string) => void`          |
|  onMessageContext  |               On message context click                |          `(id: string) => void`          |
|    onEdgeReach     |                Edge reach by scrolling                |               `() => void`               |

### Custom renders

|                    |     Description      |                     Type                     |
|:------------------:|:--------------------:|:--------------------------------------------:|
| renderTextMessage  | Custom text message  | `(message: MessageTextProps, order: "start"  | "end" | "middle" | "single") => JSX.Element`          |
| renderImageMessage | Custom image message | `(message: MessageImageProps, order: "start" | "end" | "middle" | "single") => JSX.Element`          |
| renderFileMessage  | Custom file message  | `(message: MessageFileProps, order: "start"  | "end" | "middle" | "single") => JSX.Element`          |

### Functions 
|          |       Description       |          Type          |
|:--------:|:-----------------------:|:----------------------:|
| scrollTo | Scroll to exact message | `(id: string) => void` |

## Plans
|                                   |             |
|:---------------------------------:|:-----------:|
|           Multi images            | In progress |
|         Messenger header          |    Idle     |
| Messenger header typing animation |    Idle     |


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
