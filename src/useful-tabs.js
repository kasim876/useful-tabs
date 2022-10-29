export default class UsefulTabs {
  constructor(selector) {
    this.tabs = typeof selector === 'string' ? document.querySelector(selector) : selector;
    this.tabsNav = this.tabs.querySelector('.tabs__nav')
    this.tabsBtns = this.tabs.querySelectorAll('.tabs__btn');
    this.tabsPanels = this.tabs.querySelectorAll('.tabs__panel');
    this.activeBtn = this.tabs.querySelector('.tabs__btn_current');
    this.activePanel = this.tabs.querySelector('.tabs__panel_current');
    this.init();
    this.events();
  }

  init() {
    this.tabsNav.setAttribute('role', 'tablist');
    this.tabsBtns.forEach((btn, id) => {
      btn.setAttribute('role', 'tab');
      btn.dataset.btn = id;

      if (btn === this.activeBtn) {
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.setAttribute('tabindex', '-1');
      }
    })
    this.tabsPanels.forEach((panel, id) => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('tabindex', '-1');
      panel.dataset.content = id;
    })
  }

  events() {
    document.addEventListener('click', function(e) {
      if (e.target.closest('.tabs__btn')) {
        this.toggle(e.target.closest('.tabs__btn'));
      }
    }.bind(this))

    window.addEventListener('keydown', function(e) {
      if (document.activeElement === this.activeBtn) {
        if ((e.key === 'ArrowRight')) {
          let btn = this.tabs.querySelector(`[data-btn="${+this.activeBtn.dataset.btn + 1}"]`);

          if (btn) {
            btn.focus();

            this.toggle(btn);
          }
        }

        if (e.key === 'ArrowLeft') {
          let btn = this.tabs.querySelector(`[data-btn="${this.activeBtn.dataset.btn - 1}"]`);

          if (btn) {
            btn.focus();

            this.toggle(btn);
          }
        }
      }
    }.bind(this))
  }

  toggle(btn) {
    this.activeBtn.classList.remove('tabs__btn_current');
    this.activeBtn = btn;
    this.activeBtn.classList.add('tabs__btn_current');

    this.activePanel.classList.remove('tabs__panel_current');
    this.activePanel = document.querySelector(`[data-content="${this.activeBtn.dataset.btn}"]`);
    this.activePanel.classList.add('tabs__panel_current');

    this.tabsBtns.forEach(btn => {
      if (btn === this.activeBtn) {
        btn.setAttribute('aria-selected', 'true');
        btn.removeAttribute('tabindex');
      } else {
        btn.setAttribute('tabindex', '-1');
        btn.removeAttribute('aria-selected');
      }
    })
  }
}