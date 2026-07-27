// 色彩系统 - 根据用户提供的色盘
export const COLORS = {
  // 主色系（蓝色）
  primary: {
    dark: '#1B202B',      // Hei Sè Black / 深蓝
    main: '#93A4C1',      // Wild Clary / 主蓝
    light: '#D3DFF2',     // Puffy Cloud / 浅蓝
    lighter: '#E7E8E4',   // Silver White / 最浅
  },
  
  // 强调色（粉色系）
  accent: {
    rose: '#C96D8A',      // Puce Red / 粉红
    champagne: '#F5E6D1', // Champagne / 香槟
    muted: '#B5ACA3',     // Silver Chalice / 中性
  },
  
  // 功能色
  status: {
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
  },
  
  // 中性色
  neutral: {
    white: '#FFFFFF',
    gray100: '#F5F5F5',
    gray200: '#E0E0E0',
    gray500: '#9E9E9E',
    black: '#000000',
  },
};

export const GRADIENTS = {
  primary: `linear-gradient(135deg, ${COLORS.primary.main}, ${COLORS.primary.light})`,
  accent: `linear-gradient(135deg, ${COLORS.accent.rose}, ${COLORS.accent.champagne})`,
  dark: `linear-gradient(135deg, ${COLORS.primary.dark}, ${COLORS.primary.main})`,
};
