window.addEventListener("load", () => {
  const canvas = document.querySelector("#draw-area");
  const context = canvas.getContext("2d");
  const allclearButton = document.querySelector("#allClear");
  const lastPosition = { x: null, y: null };
  let isDrag = false;

  const draw = (x, y) => {
    if (!isDrag) {
      return;
    }

    context.lineWidth = 3;

    // まだ何も描いていなければ
    if (lastPosition.x == null || lastPosition.y === null) {
      context.moveTo(x, y);
    } else {
      context.moveTo(lastPosition.x, lastPosition.y);
    }

    context.lineTo(x, y);

    context.stroke();

    lastPosition.x = x;
    lastPosition.y = y;
  };

  const dragStart = () => {
    isDrag = true;
  };

  const dragEnd = () => {
    isDrag = false;

    lastPosition.x = null;
    lastPosition.y = null;
  };

  const allClear = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const initEventHandler = () => {
    allclearButton.addEventListener("click", allClear);
    canvas.addEventListener("mousedown", dragStart);
    canvas.addEventListener("mouseup", dragEnd);
    canvas.addEventListener("mouseout", dragEnd);
    canvas.addEventListener("mousemove", (event) => {
      draw(event.layerX, event.layerY);
    });
  };

  initEventHandler();
});
