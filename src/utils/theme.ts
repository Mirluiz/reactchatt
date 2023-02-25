import {
  PaletteProps,
  ThemeOptions,
  ThemeProps,
  TypographyProps,
} from "../@types/theme";
import {
  MessageFileStyle,
  MessageMetaStyle,
  MessageReplyStyle,
  MessageStyle,
} from "../components";
import { MessengerComposerStyle } from "../MessengerComposer";
import { MessengerBodyStyle } from "../MessengerBody";
import { MessengerStyle } from "../Messenger";
import {
  AvatarStyle,
  IconButtonStyle,
  LoaderStyle,
  TypographyStyle,
} from "../elements";

const defaultThemeValues = {
  palette: {
    background: "#95c48a",
    paper: "#fff",
    left: "#ffffff",
    leftTitle: "#e17076",
    onLeft: "#000000",
    onLeftSecondary: "#95c48a",
    right: "#eeffde",
    rightTitle: "#6ec9cb",
    onRight: "#000000",
    onRightSecondary: "#4fae4e",
    chip: "#b2b2b2",
    onChip: "#fff",
  },
  shape: {
    borderRadius: 1,
  },
  spacing: 8,
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontSize: "1.4rem",
  },
};

export const setThemeToDocument = (
  theme: ThemeOptions | undefined,
  document: Document
) => {
  let _theme: ThemeProps = setTheme(theme);
  const rootElement = document.querySelector<HTMLElement>(":root");

  if (!rootElement) return;

  for (const key in _theme) {
    if (Object.prototype.hasOwnProperty.call(_theme, key)) {
      const element = _theme[key as keyof ThemeProps];

      switch (key as keyof ThemeProps) {
        case "palette":
          let palette = element as PaletteProps;
          for (const paletteKey in palette) {
            if (Object.prototype.hasOwnProperty.call(palette, paletteKey)) {
              const pValue = palette[paletteKey as keyof PaletteProps];
              const pName =
                THEME_NAMES.palette[paletteKey as keyof PaletteProps];
              rootElement.style.setProperty(pName, pValue);
            }
          }
          break;
        case "shape":
          rootElement.style.setProperty(
            THEME_NAMES.shape.borderRadius,
            `${_theme.shape.borderRadius * _theme.spacing}px`
          );
          break;
        case "typography":
          rootElement.style.setProperty(
            THEME_NAMES.typography.fontFamily,
            _theme.typography.fontFamily
          );
          rootElement.style.setProperty(
            THEME_NAMES.typography.fontSize,
            _theme.typography.fontSize
          );
          break;
      }
    }
  }

  for (const sxKey in THEME_NAMES.sx) {
    const element = THEME_NAMES.sx[sxKey];

    rootElement.style.setProperty(element.name, element.fn(_theme.spacing));
  }
};

export const setTheme = (theme?: ThemeOptions): ThemeProps => {
  return {
    palette: {
      background:
        theme?.palette?.background ?? defaultThemeValues.palette.background,
      paper: theme?.palette?.paper ?? defaultThemeValues.palette.paper,

      left: theme?.palette?.left ?? defaultThemeValues.palette.left,
      leftTitle:
        theme?.palette?.leftTitle ?? defaultThemeValues.palette.leftTitle,
      onLeft: theme?.palette?.onLeft ?? defaultThemeValues.palette.onLeft,

      onLeftSecondary:
        theme?.palette?.onLeftSecondary ??
        defaultThemeValues.palette.onLeftSecondary,
      right: theme?.palette?.right ?? defaultThemeValues.palette.right,
      rightTitle:
        theme?.palette?.rightTitle ?? defaultThemeValues.palette.rightTitle,
      onRight: theme?.palette?.onRight ?? defaultThemeValues.palette.onRight,
      onRightSecondary:
        theme?.palette?.onRightSecondary ??
        defaultThemeValues.palette.onRightSecondary,
    },
    shape: {
      borderRadius:
        theme?.shape?.borderRadius ?? defaultThemeValues.shape.borderRadius,
    },
    spacing: theme?.spacing ?? defaultThemeValues.spacing,
    typography: {
      fontFamily:
        theme?.typography?.fontFamily ??
        defaultThemeValues.typography.fontFamily,
      fontSize:
        theme?.typography?.fontSize ?? defaultThemeValues.typography.fontSize,
    },
    space: (v: number) => {
      return `${v * (theme?.spacing ?? defaultThemeValues.spacing)}px`;
    },
  };
};

const THEME_NAMES: {
  palette: {
    [key in keyof PaletteProps]: string;
  };
  typography: {
    [key in keyof TypographyProps]: string;
  };
  shape: {
    borderRadius: string;
  };
  sx: {
    [key: string]: { name: string; fn: (spacing: number) => string };
  };
} = {
  palette: {
    background: "--rc-palette-background",
    paper: "--rc-palette-paper",
    right: "--rc-palette-right-message",
    rightTitle: "--rc-palette-right-message-title",
    onRight: "--rc-palette-on-right-message",
    onRightSecondary: "--rc-palette-on-right-message-secondary",
    left: "--rc-palette-left-message",
    leftTitle: "--rc-palette-left-message-title",
    onLeft: "--rc-palette-on-left-message",
    onLeftSecondary: "--rc-palette-on-left-message-secondary",
  },
  typography: {
    fontFamily: "--rc-typography-font-family",
    fontSize: "--rc-typography-font-size",
  },
  shape: {
    borderRadius: "--rc-shape-border-radius",
  },
  sx: {
    sx0_5: {
      name: "--rc-sx-0.5",
      fn: (spacing: number) => `${spacing / 2}px`,
    },
    sx1: {
      name: "--rc-sx-1",
      fn: (spacing: number) => `${spacing}px`,
    },
    sx2: {
      name: "--rc-sx-2",
      fn: (spacing: number) => `${spacing * 2}px`,
    },
    sx3: {
      name: "--rc-sx-3",
      fn: (spacing: number) => `${spacing * 3}px`,
    },
    sx1_no_px: {
      name: "--rc-sx-1-no_px",
      fn: (spacing: number) => `${spacing}`,
    },
  },
};

export const borderByOrder = (
  theme: ThemeProps,
  position: "left" | "right",
  order: "start" | "middle" | "end" | "single"
): {
  borderTopLeftRadius: number;
  borderBottomLeftRadius: number;
  borderBottomRightRadius: number;
  borderTopRightRadius: number;
} => {
  let ret = {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  };

  if (position === "right") {
    ret.borderTopLeftRadius = 10 * theme.shape.borderRadius;
    ret.borderBottomLeftRadius = 10 * theme.shape.borderRadius;

    switch (order) {
      case "single":
        ret.borderTopRightRadius = 15 * theme.shape.borderRadius;
        ret.borderBottomRightRadius = 0;
        break;
      case "start":
        ret.borderTopRightRadius = 15 * theme.shape.borderRadius;
        ret.borderBottomRightRadius = 5 * theme.shape.borderRadius;
        break;
      case "middle":
        ret.borderTopRightRadius = 5 * theme.shape.borderRadius;
        ret.borderBottomRightRadius = 5 * theme.shape.borderRadius;
        break;
      case "end":
        ret.borderTopRightRadius = 5 * theme.shape.borderRadius;
        ret.borderBottomRightRadius = 0;
        break;
    }
  }

  if (position === "left") {
    ret.borderTopRightRadius = 10 * theme.shape.borderRadius;
    ret.borderBottomRightRadius = 10 * theme.shape.borderRadius;

    switch (order) {
      case "single":
        ret.borderTopLeftRadius = 15 * theme.shape.borderRadius;
        ret.borderBottomLeftRadius = 0;
        break;
      case "start":
        ret.borderTopLeftRadius = 15 * theme.shape.borderRadius;
        ret.borderBottomLeftRadius = 5 * theme.shape.borderRadius;
        break;
      case "middle":
        ret.borderTopLeftRadius = 5 * theme.shape.borderRadius;
        ret.borderBottomLeftRadius = 5 * theme.shape.borderRadius;
        break;
      case "end":
        ret.borderTopLeftRadius = 5 * theme.shape.borderRadius;
        ret.borderBottomLeftRadius = 0;
        break;
    }
  }

  return ret;
};
