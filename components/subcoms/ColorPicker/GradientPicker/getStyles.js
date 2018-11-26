
function getStyles(props, state, context) {
  const border = '1px solid rgba(150, 150, 150, 0.2)';
  return {
    colorLine: {
      padding: '10px 8px',
      borderBottom: '1px solid #E8E8E8'
    },
    swapWrap: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    swap: {
      cursor: 'pointer',
      color: '#ccc',
      marginTop: '10px'
    },
  };
}
export default getStyles;