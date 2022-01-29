document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
  $(".js-accordion").accordion({
    collapsible: true,
    active: false,
    icons: false,
    heightStyle: 'content'
  });
  document.querySelectorAll('.tabs__btn').forEach(function (tabsBtn) {
    tabsBtn.addEventListener('click', function (event) {
      document.querySelectorAll('.tabs__btn').forEach(function (tabBtn) {
        tabBtn.classList.remove('tabs__btn-active')
      })
      tabsBtn.classList.add('tabs__btn-active')
      const path = event.currentTarget.dataset.path
      document.querySelectorAll('.tab-content').forEach(function (tabContent) {
        tabContent.classList.remove('tab-content-active')
      })
      document.querySelector(`[data-target="${path}"]`).classList.add('tab-content-active')
    })
  })

  function setBurger(params) {
    const btn = document.querySelector(`.${params.btnClass}`);
    const menu = document.querySelector(`.${params.menuClass}`);

    menu.addEventListener("animationend", function () {
      if (this.classList.contains(params.hiddenClass)) {
        this.classList.remove(params.activeClass);
        this.classList.remove(params.hiddenClass);
      }
    });

    btn.addEventListener("click", function () {
      this.classList.toggle(params.activeClass);

      if (
        !menu.classList.contains(params.activeClass) &&
        !menu.classList.contains(params.hiddenClass)
      ) {
        menu.classList.add(params.activeClass);
        document.body.style.overflow = 'hidden';
      } else {
        menu.classList.add(params.hiddenClass);
        document.body.removeAttribute('style');
      }
    });
  }

  setBurger({
    btnClass: "burger",
    menuClass: "menu-wrap",
    activeClass: "is-opened",
    hiddenClass: "is-closed"
  });

  function setSearch(params) {
    const openBtn = document.querySelector(`.${params.openBtnClass}`);
    const search = document.querySelector(`.${params.searchClass}`);
    const closeBtn = search.querySelector(`.${params.closeBtnClass}`);

    search.addEventListener("animationend", function (evt) {
      if (this._isOpened) {
        this.classList.remove(params.activeClass);
        this.classList.remove(params.hiddenClass);
        this._isOpened = false;
      } else {
        this._isOpened = true;
      }
    });

    search.addEventListener('click', function (evt) {
      evt._isSearch = true;
    });

    openBtn.addEventListener("click", function (evt) {
      this.disabled = true;

      if (
        !search.classList.contains(params.activeClass) &&
        !search.classList.contains(params.hiddenClass)
      ) {
        search.classList.add(params.activeClass);
      }
    });

    closeBtn.addEventListener('click', function () {
      openBtn.disabled = false;
      search.classList.add(params.hiddenClass);
    });

    document.body.addEventListener('click', function (evt) {
      if (!evt._isSearch && search._isOpened) {
        openBtn.disabled = false;
        search.classList.add(params.hiddenClass);
      }
    });
  }

  setSearch({
    openBtnClass: "js-open-search",
    closeBtnClass: "js-close",
    searchClass: "js-form",
    activeClass: "is-opened",
    hiddenClass: "is-closed"
  });

})