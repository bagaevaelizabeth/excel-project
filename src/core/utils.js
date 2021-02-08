export function capitalize(string) {
  if (typeof string != 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end];
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index);
}

export function matrix(target, current) {
  const colls = range(current.col, target.col);
  const rows = range(current.row, target.row);
  return colls.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}