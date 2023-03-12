export const clearSeparator = (elem: HTMLDivElement) => {
  elem.classList.remove("withSeparatorTop", "withSeparatorBottom");
};

export const addTopSeparator = (elem: HTMLDivElement) => {
  elem.classList.add("withSeparatorTop");
};

export const addBottomSeparator = (elem: HTMLDivElement) => {
  elem.classList.add("withSeparatorBottom");
};

export const clearAllDragElem = () => {
  const dragList = document.querySelectorAll(".styledDrag");
  const dragArray = Array.from(dragList);

  for (const dragElem of dragArray) {
    (dragElem as HTMLDivElement).classList.remove(
      "withSeparatorTop",
      "withSeparatorBottom"
    );
  }
};

export const clearDropUnderline = () => {
  const elemForUnderline = document.getElementById("styledDropBlock");
  const dragNodeList = elemForUnderline?.querySelectorAll(".styledDrag");

  const lastDrag =
    dragNodeList && (Array.from(dragNodeList).pop() as HTMLDivElement);

  if (lastDrag) {
    lastDrag.classList.remove("withSeparatorTop");
    lastDrag.classList.add("withSeparatorBottom");
  }
};
