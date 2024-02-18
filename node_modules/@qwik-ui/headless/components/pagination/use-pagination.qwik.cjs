"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
function usePagination(totalPages, selectedPage, siblingCount = 1) {
  const page = Math.min(Math.max(1, selectedPage), totalPages);
  const getPageItems = ({ page: page2, totalPages: totalPages2, siblingCount: siblingCount2 = 1 }) => {
    const pageItems2 = [];
    const pagesToShow = /* @__PURE__ */ new Set([
      1,
      totalPages2
    ]);
    const firstItemWithSiblings = 3 + siblingCount2;
    const lastItemWithSiblings = totalPages2 - 2 - siblingCount2;
    if (firstItemWithSiblings > lastItemWithSiblings)
      for (let p = 2; p <= totalPages2 - 1; p++)
        pagesToShow.add(p);
    else if (page2 < firstItemWithSiblings)
      for (let p = 2; p <= Math.min(firstItemWithSiblings, totalPages2); p++)
        pagesToShow.add(p);
    else if (page2 > lastItemWithSiblings)
      for (let p = totalPages2 - 1; p >= Math.max(lastItemWithSiblings, 2); p--)
        pagesToShow.add(p);
    else
      for (let p = Math.max(page2 - siblingCount2, 2); p <= Math.min(page2 + siblingCount2, totalPages2); p++)
        pagesToShow.add(p);
    const addPage = (value) => {
      pageItems2.push({
        type: "page",
        value,
        key: `page-${value}`
      });
    };
    const addEllipsis = () => {
      pageItems2.push({
        type: "ellipsis",
        key: `ellipsis-${pageItems2.length}`
      });
    };
    let lastNumber = 0;
    for (const page3 of Array.from(pagesToShow).sort((a, b) => a - b)) {
      if (page3 - lastNumber > 1)
        addEllipsis();
      addPage(page3);
      lastNumber = page3;
    }
    return pageItems2;
  };
  const pageItems = getPageItems({
    page,
    totalPages,
    siblingCount
  });
  const paginationArray = [];
  for (const item of pageItems)
    if (item.type === "page")
      paginationArray.push(item.value);
    else
      paginationArray.push("...");
  return paginationArray;
}
exports.usePagination = usePagination;
