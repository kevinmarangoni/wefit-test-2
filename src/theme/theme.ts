export interface ThemeColor {
  main: string;
  lighter: string;
  darker: string;
}

export interface ThemeFontSizes {
  xs: string;
  s: string;
  m: string;
  l: string;
  xl: string;
  xxl: string;
}

export interface ThemeFonts {
  primary: string;
  secondary: string;
  family: string;
  size: ThemeFontSizes;
}

export interface ThemeColors {
  primary: ThemeColor;
  secondary: ThemeColor;
  highlight: ThemeColor;
  font: {
    primary: string;
    secondary: string;
    family: string;
    size: ThemeFontSizes;
  };
  images: Record<string, string>;
}

export interface Theme {
  color: ThemeColors;
}

export const dark = {
  color: {
    primary: {
      main: "#2F2E41",
      lighter: "#4A5A67",
      darker: "#1E1E26",
    },
    secondary: {
      main: "#FFFFFF",
      lighter: "#999999",
      darker: "#333333",
    },
    highlight: {
      main: "#009EDD",
      lighter: "#5EB4E7",
      darker: "#007BB3",
      selected:"#039B00",
    },
    font: {
      primary: "#fff",
      secondary: "#333333",
      family: "Open Sans",
      size: {
        xs:"10px",
        s:"12px",
        m:"14px",
        l:"18px",
        xl:"20px",
        xxl:"24px",
      }
    },
    images:{
      
    }
  },
};

export const light = {
    color: {
      primary: {
        main: "#1e1e20",
        lighter: "#29292b",
        darker: "#1b1b1c",
      },
      secondary: {
        main: "#18181a",
        lighter: "#262424",
        darker: "#141414",
      },
      highlight: {
        main: "#DB073D",
        lighter: "#EE2A5C",
        darker: "#AD032F",
      },
      font: {
        primary: "#fff",
        secondary: "#6f6f76",
      },
    },
  };
  
