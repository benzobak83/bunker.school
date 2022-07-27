function Validation() {
  const validateForm = (selectorForm, selectorInputs) => {
    const form = document.querySelector(selectorForm);
    const inputs = document.querySelectorAll(selectorInputs);

    const handleInput = (e) => {
      switch (e.target.getAttribute("id")) {
        case "phone":
          if (e.target.value.length < 11)
            e.target.style.border = "2px solid red";
          else e.target.style.border = "2px solid green";
          break;

        case "name":
          if (e.target.value.length <= 1 || /[\d]/g.test(e.target.value))
            e.target.style.border = "2px solid red";
          else e.target.style.border = "2px solid green";
          break;

        default:
          break;
      }
    };

    const replacePhone = (e) => {
      e.target.value = e.target.value.replace(/\D/, "");
    };

    inputs.forEach((input) => {
      input.addEventListener("change", (e) => handleInput(e));
      if (input.getAttribute("id") == "phone")
        input.addEventListener("input", (e) => replacePhone(e));
    });
  };
  validateForm(".contacts__form", ".form__input");
}

document.addEventListener("DOMContentLoaded", (e) => {
  Validation();
});
