
export default function getStyles(props, state, context) {
  const { data } = state;
  const { layout } = data;
  return {
    radioGroup: {
      display: 'flex',
      flexDirection: layout === 'vertical' ? 'column' : 'row',
      alignItems: 'center'
    },
    radio: {
      marginBottom: layout === 'vertical' ? '4px' : '0px',
      flex: 1
    },
    label: {
      fontSize: '12px',
      lineHeight: '16px'
    },
    icon: {
      width: '16px',
      height: '16px', 
      margin: '0px 8px 0px 4px',
    }
    
  };
}
