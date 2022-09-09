function SetButtonsDisabledStatus() {
  if (screen_value == "ERROR") {
    DisableAllImputsByClassOrId("#keyboard");
    ChangeDisableStatusById("#clear",false);
    ChangeDisableStatusById("#comma",true);
    ChangeDisableStatusById("#negative",true);
    all_button_disabled_case = true;
  } else if (screen_value.includes(",")) {
    ChangeDisableStatusById("#comma",true);
  } else if (next_number_is_new == true) {
    ChangeDisableStatusById("#comma",true);
  } else {
    ChangeDisableStatusById("#comma",false);
  }
  if (digits_counter == MAXIMUM_DIGITS) {
    DisableAllImputsByClassOrId(".NormalButton")
    ChangeDisableStatusById("#comma",true);
    ChangeDisableStatusById("#negative",false);
    all_button_disabled_case = true;
  }
  changingSingn = screen_value;
  changingSingn = GetStringToFloat(changingSingn);
  if (changingSingn == 0 || screen_value == "ERROR" || next_number_is_new == true
  ) {
    ChangeDisableStatusById("#negative",true);
  } else {
    ChangeDisableStatusById("#negative",false);
  }
}

function DisableAllImputsByClassOrId(html_id) {
    let numbers_buttons = document.querySelectorAll(html_id+" input");
    numbers_buttons.forEach(
      (numbers_buttons) => (numbers_buttons.disabled = true)
    ); 
}

function ChangeDisableStatusById(html_id,disabled) {
    document.querySelector(html_id).disabled = disabled;  
}

function SetButtonsEnabled() {
  let numbers_buttons = document.querySelectorAll("#keyboard input");
  numbers_buttons.forEach(
    (numbers_buttons) => (numbers_buttons.disabled = false)
  );
}

function SetHighlight(change_class) {
  RemoveButtonHighlight();
  change_class.add("pressedOperator");
}

function RemoveButtonHighlight() {
  let changeClass = document.getElementsByClassName("operator");
  for (let index = 0; index < changeClass.length; index++) {
    changeClass[index].classList.remove("pressedOperator");
  }
}
