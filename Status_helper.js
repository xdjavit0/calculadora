function SetButtonsDisabledStatus() {
    if (screen_value == "ERROR") {
        let numbers_buttons = document.querySelectorAll("#keyboard input");
        numbers_buttons.forEach((numbers_buttons) => (numbers_buttons.disabled = true));
        document.querySelector("#clear").disabled = false;
        document.querySelector("#comma").disabled = true;
        document.querySelector("#negative").disabled = true;
        all_disabled_case = true;
    }else if (screen_value.includes(",")) {
        document.querySelector("#comma").disabled = true;
    }else if (next_number_is_new == true) {
        document.querySelector("#comma").disabled = true;
    }else {
        document.querySelector("#comma").disabled = false;
    }
    if (digits_counter == MAXIMUM_DIGITS) {
        let numbers_buttons = document.querySelectorAll(".NormalButton input");
        numbers_buttons.forEach((numbers_buttons) => (numbers_buttons.disabled = true));
        document.querySelector("#comma").disabled = true;
        document.querySelector("#negative").disabled = false;
        all_disabled_case = true;
    }
    changingSingn = screen_value;
    changingSingn = GetStringToFloat(changingSingn);
    if ((changingSingn == 0 || screen_value == "ERROR"||next_number_is_new == true)) {
        document.querySelector("#negative").disabled = true;
    } else {
        document.querySelector("#negative").disabled = false;
    }
}

function SetButtonsEnabled() {
    let numbers_buttons = document.querySelectorAll("#keyboard input");
    numbers_buttons.forEach((numbers_buttons) => (numbers_buttons.disabled = false));
}

function SetHighlight(change_class) {
    RemoveHighlight();
    change_class.add("pressedOperator");
}
  
function RemoveHighlight() {
    let changeClass = document.getElementsByClassName("operator");
    for (let index = 0; index < changeClass.length; index++) {
      changeClass[index].classList.remove("pressedOperator");
    }
}