const getNextEnabledOptionIndex = (index, filteredOptionsSig) => {
  let offset = 1;
  let currentIndex = index;
  const opts = filteredOptionsSig.value;
  const len = opts.length;
  while (opts[(currentIndex + offset) % len]?.disabled) {
    offset++;
    if (offset + currentIndex > len - 1) {
      currentIndex = 0;
      offset = 0;
    }
    if (offset >= len)
      return -1;
  }
  return (currentIndex + offset) % len;
};
const getPrevEnabledOptionIndex = (index, filteredOptionsSig) => {
  let offset = 1;
  let currentIndex = index;
  const opts = filteredOptionsSig.value;
  const len = opts.length;
  while (opts[(currentIndex - offset + len) % len]?.disabled) {
    offset++;
    if (currentIndex - offset < 0) {
      currentIndex = len - 1;
      offset = 0;
    }
  }
  return (currentIndex - offset + len) % len;
};
const getActiveDescendant = (highlightedIndexSig, filteredOptionsSig, localId) => {
  const highlightedIndex = highlightedIndexSig.value;
  const option = filteredOptionsSig.value[highlightedIndex];
  if (highlightedIndex === -1 || option?.disabled)
    return "";
  return `${localId}-${option?.key}`;
};
export {
  getActiveDescendant,
  getNextEnabledOptionIndex,
  getPrevEnabledOptionIndex
};
