const MAXIMUM_DIGITS = 10;
let screen_value;
let next_number_is_new;
let comma;
let previous_number;
let digits_counter;
let operator;
let two_operators;
let comma_in_negative; //negativeHasComma
let length_with_negative_and_comma;
let all_button_disabled_case;

window.onload = function () {
  screen_display = document.getElementById("textInScreen");
  ResetCalculator();
  two_operators = false;
  comma_in_negative = false; //negativeHasComma
  length_with_negative_and_comma = 0;
};

function IntroduceNumber(new_number) {
  if (digits_counter < MAXIMUM_DIGITS) {
    if ((screen_value == "0" || next_number_is_new == true) && new_number != ",") {
      screen_display.innerHTML = new_number;
      screen_value = new_number;
      digits_counter = digits_counter + 1;
    } else if (screen_value == "0" && new_number == ",") {
      screen_display.innerHTML = "0" + new_number;
      screen_value = 0 + new_number;
      comma = true;
    } else {
      if (new_number == "," && comma == false) {
        screen_display.innerHTML += new_number;
        screen_value += new_number;
        comma = true;
      } else {
        screen_display.innerHTML += new_number;
        screen_value += new_number;
        digits_counter = digits_counter + 1;
      }
    }
  }
  next_number_is_new = false;
  two_operators = false;
  SetButtonsDisabledStatus();
}

function ResetCalculator() {
  screen_value = "0";
  screen_display.innerHTML = "0";
  comma = false;
  previous_number = 0;
  operator = "non_operator_entered_yet";
  next_number_is_new = true;
  RemoveButtonHighlight();
  digits_counter = 0;
  introduced_number = null;
  SetButtonsEnabled();
  SetButtonsDisabledStatus();
  if (all_button_disabled_case == true) {
    document.querySelector("#zero").disabled = true;
    document.querySelector("#comma").disabled = false;
  }
  all_button_disabled_case = false;
}

function IntroduceOperator(operation_sign) {
  if (two_operators == false) {
    GetResult();
  }
  previous_number = screen_value;
  operator = operation_sign;
  next_number_is_new = true;
  two_operators = true;
  digits_counter = 0;
  introduced_number = null;
  comma = false;
  SetButtonsEnabled();
  SetButtonsDisabledStatus();
}

function ChangeSignButtonIsUsed() {
  if (screen_value.includes(",")) {
    comma_in_negative = true;
  }
  screen_value = GetStringToFloat(screen_value);
  screen_value = screen_value * -1;
  screen_value = GetFloatToString(screen_value);
  if (comma_in_negative == true && !screen_value.includes(",")) {
    screen_value = screen_value + ",";
    comma_in_negative = false;
  }
  screen_display.innerHTML = screen_value;
}

function GetResult() {
  if (operator == "non_operator_entered_yet") {
    screen_value = GetStringToFloat(screen_value);
    screen_value = RemoveUnusedDecimals(screen_value);
    screen_value = GetFloatToString(screen_value);
    SetButtonsDisabledStatus();
    screen_display.innerHTML = screen_value;
  } else {
    if (introduced_number == null && next_number_is_new == true) {
      result = "ERROR";
    } else {
      result = DoAnOperation();
    }
    SetResultFormated();
    screen_display.innerHTML = result;
    screen_value = result;
    SetButtonsDisabledStatus();
    operator = "non_operator_entered_yet";
    next_number_is_new = true;
    digits_counter = 0;
    RemoveButtonHighlight();
    two_operators = false;
  }
}

document.addEventListener(
  "keydown",
  (event) => {
    event.preventDefault();
    var keyValue = event.key;

    console.log("keyValue: " + keyValue);

    if (keyValue == "Enter") {
      GetResult();
    } else if (keyValue == "1") {
      IntroduceNumber("1");
    } else if (keyValue == "2") {
      IntroduceNumber("2");
    } else if (keyValue == "3") {
      IntroduceNumber("3");
    } else if (keyValue == "4") {
      IntroduceNumber("4");
    } else if (keyValue == "5") {
      IntroduceNumber("5");
    } else if (keyValue == "6") {
      IntroduceNumber("6");
    } else if (keyValue == "7") {
      IntroduceNumber("7");
    } else if (keyValue == "8") {
      IntroduceNumber("8");
    } else if (keyValue == "9") {
      IntroduceNumber("9");
    } else if (keyValue == "0") {
      IntroduceNumber("0");
    } else if (keyValue == ",") {
      IntroduceNumber(",");
    } else if (keyValue == "Escape") {
      ResetCalculator();
    } else if (keyValue == "+") {
      IntroduceOperator("+");
      SetHighlight(document.getElementById("addition").classList);
    } else if (keyValue == "-") {
      IntroduceOperator("-");
      SetHighlight(document.getElementById("substraction").classList);
    } else if (keyValue == "/") {
      IntroduceOperator("/");
      SetHighlight(document.getElementById("division").classList);
    } else if (keyValue == "*") {
      IntroduceOperator("*");
      SetHighlight(document.getElementById("multiplication").classList);
    } else if (keyValue == "Control") {
      ChangeSignButtonIsUsed();
    }
    console.log("codeValue: " + codeValue);
  },
  false
);
