


function genRegExp(matches, type){
  if (type === 'integer') return new RegExp(`^((\\-|\\+)?[0-9]+(${matches.join('|')}?))$`);
  if (type === 'float')   return new RegExp(`^((\\-|\\+)?[0-9]+(\\.[0-9]+)?)(${matches.join('|')}?)$`);
  return new RegExp(`^((\\-|\\+)?[0-9]+(\\.[0-9]+)?)(${matches.join('|')})$`);
}

function genMatch (matches, type) {
  const reg = genRegExp(matches);
  return str => {
    if (!str) return false;
    return reg.test(str);
  }
}

function genParse (matches, type) {
  const reg = genRegExp(matches, type);
  return str => {
    if (!str) return false;
    const mas = str.match(reg);
    if(!mas) return false;
    const ml  = mas.length;
    if (!ml) return false; 
    const v = parseFloat(mas[1], 10);
    const unit = mas[ml - 1];
    return { value: v, unit };
  };
}


module.exports = { genRegExp, genMatch, genParse };