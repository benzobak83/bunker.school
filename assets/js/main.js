let submited = false;

function main() {
  function burgerMenu(selector) {
    const burger = document.querySelector(selector);

    burger.addEventListener("click", () => {
      burger.classList.toggle("change");
    });
  }

  function popupForm(
    selector_triger,
    selector_popup,
    selector_close,
    active_class
  ) {
    const popup = document.querySelector(selector_popup);
    const close = document.querySelector(selector_close);
    const triger = document.querySelectorAll(selector_triger);

    const handlePopup = () => {
      if (popup.classList.contains(active_class)) {
        popup.style.opacity = "0";
        document.querySelector("html").style.overflowY = "visible";
        setTimeout(() => {
          popup.classList.remove(active_class);
        }, 300);
      } else {
        popup.classList.add(active_class);
        document.querySelector("html").style.overflowY = "hidden";
        setTimeout(() => {
          popup.style.opacity = "1";
        }, 0);
      }
    };

    triger.forEach((item) => {
      item.addEventListener("click", handlePopup);
    });
    close.addEventListener("click", handlePopup);
  }

  function burgerMenuOpen(triger_selector, selector_menu) {
    const triger = document.querySelector(triger_selector);
    const menu = document.querySelector(selector_menu);

    const handleMenu = () => {
      if (menu.classList.contains("active")) {
        menu.classList.remove("active");
      } else menu.classList.add("active");
    };

    triger.addEventListener("click", handleMenu);
  }

  function submitForm(triger_selector, selector_form, active_class) {
    const triger = document.querySelector(triger_selector);
    const form = document.querySelector(selector_form);

    const onSubmit = (name, phone) => {
      if (name.value.length <= 1 || phone.value.length < 11) return false;
      else return true;
    };
    const sendForm = (e) => {
      e.preventDefault();

      const createDiv = (msg) => {
        let div = document.createElement("div");
        div.style.color = "red";
        div.innerHTML = msg;
        div.classList.add(active_class);
        form.append(div);
        setTimeout(() => {
          div.remove();
        }, 4000);
      };

      if (
        !onSubmit(
          e.target.parentNode.querySelector("#name"),
          e.target.parentNode.querySelector("#phone")
        )
      ) {
        createDiv("Некорректно заполненны данные");
        return null;
      }
      const formData = new FormData(form);

      fetch("http://localhost/send.php", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (res.status == "200") {
            let div = document.createElement("div");
            div.innerHTML =
              "Заявка отправлена! Скоро с вами свяжется наш консультант";
            div.classList.add(active_class);
            form.append(div);
            setTimeout(() => {
              div.remove();
            }, 4000);
          } else {
            createDiv("Что-то пошло не так!");
          }
        })
        .catch((err) => {
          console.log(err);
          createDiv("Что-то пошло не так!");
        });
    };

    triger.addEventListener("click", (e) => sendForm(e));
  }

  burgerMenu(".burger-menu");
  popupForm(
    ".btn-for-form",
    ".popup-form",
    ".popup-form-close",
    "popup-form_active"
  );
  burgerMenuOpen(".burger-menu", ".header__menu_hidden");
  submitForm(".form__btn", ".contacts__form", "form__status_active");
  submitForm(".form__btn-popup", ".form__popup", "form__status_active");
}

document.addEventListener("DOMContentLoaded", (e) => {
  main();
});
