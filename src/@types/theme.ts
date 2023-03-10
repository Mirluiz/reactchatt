export interface ThemeProps {
  space: (v: number) => string;
  spacing: number;
  shape: {
    borderRadius: number;
  };
  palette: PaletteProps;
  typography: TypographyProps;
}

export interface ThemeOptions {
  spacing?: number;
  shape?: {
    borderRadius?: number;
  };
  space?: (v: number) => string;
  palette?: Partial<PaletteProps>;
  typography?: Partial<TypographyProps>;
}

export type PaletteProps = {
  right: string;
  rightTitle: string;
  onRight: string;
  onRightSecondary: string;
  left: string;
  leftTitle: string;
  onLeft: string;
  onLeftSecondary: string;
  background: string;
  onBackground: string;
  contrast: string;
  onContrast: string;
  composer: string;
  onComposer: string;
  accent: string;
  onAccent: string;
  text: string;
  reply: string;
  onReply: string;
};

export type TypographyProps = {
  fontSize: string;
  fontFamily: string;
};
