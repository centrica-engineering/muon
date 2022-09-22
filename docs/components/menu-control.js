class MenuControl extends HTMLElement {
  constructor() {
    super();
    this._observer = new MutationObserver(this._init.bind(this));
  }

  connectedCallback() {
    if (this.children.length) {
      this._init();
    }
    this._observer.observe(this, { childList: true });
  }

  get viewportType() {
    const width = window.innerWidth > window.screen.width ? window.screen.width : window.innerWidth;

    return width >= 760;
  }

  _init() {
    this.viewport = this.viewportType;
    let details = this.querySelector("details");
    if (!details) {
      return;
    }

    function forceState(isOpen) {
      if (isOpen) {
        details.setAttribute("open", "open");
      } else {
        details.removeAttribute("open");
      }
    }

    forceState(this.viewport);

    window.addEventListener('resize', () => {
      if (this.viewport !== this.viewportType) {
        this.viewport = this.viewportType;
        forceState(this.viewport);
      }
    });
  }
}

if ("customElements" in window) {
  customElements.define("menu-control", MenuControl);
}