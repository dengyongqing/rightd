
function getStyles(props, state, context) {
  const border = '1px solid rgba(150, 150, 150, 0.2)';
  return {
    line: {
      position: 'relative',
      display: 'inline-block',
      verticalAlign: 'bottom',
      width: '16px',
      height: '100%',
      margin: '0px 4px 0px 0px',
    },
    recent_line: {
      display: 'flex',
    },
    colorGrid: {
      padding: '8px',
    },
    grid: {
      boxSizing: 'border-box',
      width: '16px',
      height: '16px',
      zIndex: 0,
      position: 'relative',
      overflow: 'hidden',
    },
    alpha: {
      padding: '6px 0',
    },
  };
}
export default getStyles;
