// src/styles/theme.js
export const theme = {
  transition: '0.5s',
  iconSize: '48px',
  colors: {
    black: '#000',
    white: '#fff',
    blue: '#0070f3',
    secondary: '#1db954',
    gray: '#f0f0f0',
  },
  fonts: {
    main: 'Arial, sans-serif',
    heading: 'Georgia, serif',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1200px',
  },
  spacing: factor => `${0.25 * factor}rem`, // Example spacing function
};

// export const baseActiveBox = css`
//   background-color: ${root.color.alabaster};
//   border: 1px ${root.color.marine_blue} solid;
// `;
