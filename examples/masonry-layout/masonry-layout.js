class MasonryLayout {
  constructor(container, data) {
    this.container = container;
    this.data = data;
    this.masonryContainer;

    this.options = {
      pinWidthPx: 252,
      verticalGapPx: 16,
      resizeDebounceMs: 300,
      cardsCount: 30,
    };

    this.totalHeight = 0;
    this.totalWidth = 0;
    this.columnsCount = 0;

    this.pinNodes = [];

    this.createLayout();
    this.setDimensions();

    this.createPins();
    this.positionPins();

    window.addEventListener('resize', debounce(() => {
                              this.setDimensions();
                              this.positionPins();
                            }, this.options.resizeDebounceMs), false);
  }

  createLayout() {
    this.masonryContainer = document.createElement('div');
    this.masonryContainer.classList.add('masonry-container');

    this.container.appendChild(this.masonryContainer);
  }

  createPins() {
    const data = this.data.slice(0, this.options.cardsCount);
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < data.length; i++) {
      const pin = this.createPinElement(data[i]);
      fragment.appendChild(pin);
      this.pinNodes.push(pin);
      if (i === this.columnsCount - 1) {
        this.masonryContainer.appendChild(fragment);
        fragment = document.createDocumentFragment();
      }
    }

    if (fragment.children.length > 0) {
      this.masonryContainer.appendChild(fragment);
    }
  }

  positionPins() {
    let offsetX = 0;
    let offsetY = 0;

    for (let i = 0; i < this.pinNodes.length; i++) {
      const pin = this.pinNodes[i];

      if (i < this.columnsCount) {
        offsetY = 0;
      } else {
        offsetY = this.options.verticalGapPx +
            parseInt(this.pinNodes[i - this.columnsCount].style.height) +
            parseTranslateY(
                      this.pinNodes[i - this.columnsCount].style.transform);
      }

      this.totalHeight = Math.max(this.totalHeight, offsetY);

      if (i % this.columnsCount === 0) {
        offsetX = 0;
      } else {
        offsetX += this.options.pinWidthPx;
      }

      pin.style.transform = `translateX(${offsetX}px) translateY(${offsetY}px)`;
    }
  }

  createPinElement({image, height}) {
    const pin = document.createElement('div');
    pin.classList.add('masonry-container__pin');
    pin.style.height = `${height}px`;

    const pinImage = document.createElement('img');
    pinImage.src = image;
    pinImage.classList.add('masonry-container__image');

    pin.style.width = `${this.options.pinWidthPx}px`;
    pin.appendChild(pinImage);

    return pin;
  }

  setDimensions() {
    const containerClientRect = this.container.getBoundingClientRect();

    this.totalWidth = containerClientRect.width;
    this.columnsCount = Math.floor(this.totalWidth / this.options.pinWidthPx);
    this.masonryContainer.style.width =
        `${this.columnsCount * this.options.pinWidthPx}px`;
  }
}

function parseTranslateY(style) {
  const res = /translateY\((\d*)px\)/.exec(style);
  return res ? Number(res[1]) : 0;
}

function debounce(func, timeMs) {
  let timer;

  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.call();
    }, timeMs);
  };
}