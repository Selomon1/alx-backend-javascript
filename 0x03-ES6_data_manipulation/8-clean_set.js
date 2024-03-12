export default function cleanSet(set, startString) {
  if (!startString || typeof startString !== 'string') {
    return '';
  }

  let result = '';

  set.forEach((value) => {
    if (typeof value === 'string' && value.startsWith(startString)) {
      result += `${value.substring(startString.length)}-`;
    }
  });

  if (result.endsWith('-')) {
    result = result.slice(0, -1);
  }

  return result;
}
