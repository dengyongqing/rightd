
function getStyles(props, state, context) {
  const border = '1px solid rgba(150, 150, 150, 0.2)';
  return {
    colorLine: {
      width: '100%',
      height: '100%',
    },
    swatchWrapper: {
      cursor: 'pointer',
      border,
      padding: 0,
      flexGrow: 1,
      display: 'flex',
      borderRadius: '1px',
      alignItems: 'center',
      justifyContent: 'center',
    },
    swatchBg: {
      cursor: 'pointer',
      height: 'calc(100% - 6px)',
      width: 'calc(100% - 6px)',
      transition: 'background-color 0.2s',
      borderRadius: '2px',
      display: 'flex',
      boxSizing: 'border-box',
      border: '1px solid rgba(150, 150, 150, 0.2)',
      //
      backgroundSize: '75% 75%',
      backgroundPosition: '50% 50%',
      backgroundRepeat: 'no-repeat',
      background: ' url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==") left center',
    },
  };
}
export default getStyles;
