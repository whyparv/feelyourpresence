/**
 * Global configuration for Feel Your Presence
 * Brand colors and theme settings
 */

export const brandColors = {
  ivory: "#f2ede0",
  deepBlue: "#0b1c2d",
  gold: "#c9a24d",
} as const;

export const theme = {
  colors: {
    background: brandColors.ivory,
    primary: brandColors.deepBlue,
    secondary: brandColors.gold,
  },
} as const;

export type BrandColors = typeof brandColors;
export type Theme = typeof theme;
