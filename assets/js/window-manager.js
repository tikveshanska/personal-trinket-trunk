/**
 * Window Manager — Dependency-Free Vanilla JS Windowing System
 * Handles dragging, z-index elevation, closing, minimizing, maximizing, and tiling.
 */

class WindowManager {
  constructor() {
    this.windows = [];
    this.highestZIndex = 100;
    this.activeWindow = null;
    this.draggedWindow = null;
    this.dragOffset = { x: 0, y: 0 };
    this.isDragging = false;
    this.onActiveChange = null;

    this.init();
  }

  init() {
    // Collect all windows on the page
    const windowEls = document.querySelectorAll('.os-window');
    windowEls.forEach((winEl, index) => {
      this.registerWindow(winEl, index);
    });

    // Global drag move and up listeners
    window.addEventListener('mousemove', (e) => this.handleDragMove(e));
    window.addEventListener('mouseup', () => this.handleDragEnd());

    // Window resize handler: ensure windows don't get stuck out of bounds
    window.addEventListener('resize', () => {
      if (window.innerWidth > 960) {
        this.clampAllWindows();
      }
    });
  }

  registerWindow(winEl, index = 0) {
    if (this.windows.some(w => w.el === winEl)) return;

    const winId = winEl.id || `window-${index}`;
    const titlebar = winEl.querySelector('.window-titlebar');
    const closeBtn = winEl.querySelector('.win-close');
    const minimizeBtn = winEl.querySelector('.win-minimize');
    const maximizeBtn = winEl.querySelector('.win-maximize');

    const winObj = {
      id: winId,
      el: winEl,
      titlebar: titlebar,
      title: winEl.querySelector('.window-title')?.innerText.trim() || winId,
      initialPos: {
        top: winEl.offsetTop || 60 + (index * 30),
        left: winEl.offsetLeft || 120 + (index * 40)
      }
    };

    this.windows.push(winObj);

    // Bring to front on click anywhere inside window
    winEl.addEventListener('mousedown', () => {
      this.focusWindow(winObj);
    });

    // Dragging initiation via titlebar
    if (titlebar) {
      titlebar.addEventListener('mousedown', (e) => {
        // Ignore if clicking window control buttons
        if (e.target.closest('.win-btn') || e.target.closest('.window-action-btn')) return;
        this.handleDragStart(e, winObj);
      });
    }

    // Window controls
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeWindow(winObj.id);
      });
    }

    if (minimizeBtn) {
      minimizeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.minimizeWindow(winObj.id);
      });
    }

    if (maximizeBtn) {
      maximizeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMaximizeWindow(winObj.id);
      });
    }
  }

  focusWindow(winObj) {
    if (!winObj || !winObj.el) return;
    
    this.highestZIndex += 1;
    winObj.el.style.zIndex = this.highestZIndex;

    this.windows.forEach(w => {
      w.el.classList.remove('is-focused');
    });

    winObj.el.classList.add('is-focused');
    this.activeWindow = winObj;

    if (typeof this.onActiveChange === 'function') {
      this.onActiveChange(winObj);
    }
  }

  openWindow(winId) {
    const winObj = this.windows.find(w => w.id === winId);
    if (!winObj) return;

    winObj.el.classList.remove('is-closed');
    winObj.el.classList.remove('is-minimized');
    
    // Add pop-in animation
    winObj.el.classList.add('animate-in');
    setTimeout(() => {
      winObj.el.classList.remove('animate-in');
    }, 400);

    this.focusWindow(winObj);

    // Scroll to it on mobile screens
    if (window.innerWidth <= 960) {
      winObj.el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  closeWindow(winId) {
    const winObj = this.windows.find(w => w.id === winId);
    if (!winObj) return;

    winObj.el.classList.add('is-closed');
    winObj.el.classList.remove('is-focused');

    if (this.activeWindow === winObj) {
      this.activeWindow = null;
      // Focus the next available open window
      const openWins = this.windows.filter(w => !w.el.classList.contains('is-closed') && !w.el.classList.contains('is-minimized'));
      if (openWins.length > 0) {
        this.focusWindow(openWins[openWins.length - 1]);
      } else if (typeof this.onActiveChange === 'function') {
        this.onActiveChange(null);
      }
    }
  }

  minimizeWindow(winId) {
    const winObj = this.windows.find(w => w.id === winId);
    if (!winObj) return;

    winObj.el.classList.add('is-minimized');
    winObj.el.classList.remove('is-focused');

    if (this.activeWindow === winObj) {
      this.activeWindow = null;
      const openWins = this.windows.filter(w => !w.el.classList.contains('is-closed') && !w.el.classList.contains('is-minimized'));
      if (openWins.length > 0) {
        this.focusWindow(openWins[openWins.length - 1]);
      } else if (typeof this.onActiveChange === 'function') {
        this.onActiveChange(null);
      }
    }
  }

  toggleMaximizeWindow(winId) {
    const winObj = this.windows.find(w => w.id === winId);
    if (!winObj) return;

    winObj.el.classList.toggle('is-maximized');
    this.focusWindow(winObj);
  }

  handleDragStart(e, winObj) {
    // Only allow drag on desktop viewports
    if (window.innerWidth <= 960) return;
    if (winObj.el.classList.contains('is-maximized')) return;

    this.isDragging = true;
    this.draggedWindow = winObj;
    this.focusWindow(winObj);

    const rect = winObj.el.getBoundingClientRect();
    this.dragOffset.x = e.clientX - rect.left;
    this.dragOffset.y = e.clientY - rect.top;

    e.preventDefault();
  }

  handleDragMove(e) {
    if (!this.isDragging || !this.draggedWindow) return;

    const winEl = this.draggedWindow.el;
    const menuHeight = 36;
    const padding = 10;

    let newX = e.clientX - this.dragOffset.x;
    let newY = e.clientY - this.dragOffset.y;

    // Viewport boundaries
    const maxX = window.innerWidth - winEl.offsetWidth - padding;
    const maxY = window.innerHeight - 60; // Leave titlebar visible

    newX = Math.max(padding, Math.min(newX, maxX));
    newY = Math.max(menuHeight + padding, Math.min(newY, maxY));

    winEl.style.left = `${newX}px`;
    winEl.style.top = `${newY}px`;
    winEl.style.right = 'auto';
    winEl.style.bottom = 'auto';
    winEl.style.margin = '0';
  }

  handleDragEnd() {
    this.isDragging = false;
    this.draggedWindow = null;
  }

  clampAllWindows() {
    const menuHeight = 36;
    const padding = 12;

    this.windows.forEach(w => {
      const el = w.el;
      if (el.classList.contains('is-closed') || el.classList.contains('is-maximized')) return;

      const rect = el.getBoundingClientRect();
      let left = rect.left;
      let top = rect.top;

      if (left + el.offsetWidth > window.innerWidth) {
        left = Math.max(padding, window.innerWidth - el.offsetWidth - padding);
        el.style.left = `${left}px`;
      }
      if (top < menuHeight) {
        el.style.top = `${menuHeight + padding}px`;
      }
    });
  }

  cascadeWindows() {
    if (window.innerWidth <= 960) return;

    let startX = 60;
    let startY = 60;
    const offset = 32;

    this.windows.forEach((winObj, index) => {
      if (!winObj.el.classList.contains('is-closed')) {
        winObj.el.classList.remove('is-maximized');
        winObj.el.classList.remove('is-minimized');
        winObj.el.style.left = `${startX + (index * offset)}px`;
        winObj.el.style.top = `${startY + (index * offset)}px`;
        winObj.el.style.transform = 'none';
        this.focusWindow(winObj);
      }
    });
  }

  tileWindows() {
    if (window.innerWidth <= 960) return;

    const openWins = this.windows.filter(w => !w.el.classList.contains('is-closed') && !w.el.classList.contains('is-minimized'));
    if (openWins.length === 0) return;

    const count = openWins.length;
    const menuHeight = 36;
    const availWidth = window.innerWidth - 40;
    const availHeight = window.innerHeight - menuHeight - 40;

    if (count === 1) {
      openWins[0].el.style.left = '20px';
      openWins[0].el.style.top = `${menuHeight + 20}px`;
      openWins[0].el.style.width = `${availWidth}px`;
      openWins[0].el.style.height = `${availHeight}px`;
    } else if (count === 2) {
      const halfW = (availWidth - 20) / 2;
      openWins[0].el.style.left = '20px';
      openWins[0].el.style.top = `${menuHeight + 20}px`;
      openWins[0].el.style.width = `${halfW}px`;

      openWins[1].el.style.left = `${20 + halfW + 20}px`;
      openWins[1].el.style.top = `${menuHeight + 20}px`;
      openWins[1].el.style.width = `${halfW}px`;
    } else {
      this.cascadeWindows();
    }
  }

  closeAllWindows() {
    this.windows.forEach(w => {
      this.closeWindow(w.id);
    });
  }

  resetPositions() {
    if (window.innerWidth <= 960) return;

    const defaults = {
      'window-welcome': { top: '50px', left: '260px', transform: 'rotate(-1.2deg)' },
      'window-about': { top: '70px', left: '380px', transform: 'none' },
      'window-projects': { top: '90px', left: '220px', transform: 'none' },
      'window-case-study': { top: '60px', left: '260px', transform: 'none' },
      'window-contact': { top: '120px', left: '440px', transform: 'none' },
      'window-resume': { top: '80px', left: '340px', transform: 'none' }
    };

    this.windows.forEach(w => {
      const def = defaults[w.id];
      if (def) {
        w.el.style.top = def.top;
        w.el.style.left = def.left;
        w.el.style.transform = def.transform;
      }
    });
  }
}

// Export singleton instance or class
window.WindowManager = WindowManager;
