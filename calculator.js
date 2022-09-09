const MAXIMUM_DIGITS = 10;

window.onload = function () {
  screen_display = document.getElementById("textInScreen");
};

screen_value = "0";
next_number_is_new = true;
comma = false;
first_number = 0;
digits_counter = 0;
operator = "non_operator_entered_yet";
two_operators = false;
comma_in_negative = false; //negativeHasComma
length_with_negative_and_comma = 0;
introduced_number = null;
all_disabled_case = false;

document.querySelector("#negative").disabled = true;

function IntroduceANumber(introduced_number) {
  if (digits_counter < MAXIMUM_DIGITS) {
    if (
      (screen_value == "0" || next_number_is_new == true) &&
      introduced_number != ","
    ) {
      screen_display.innerHTML = introduced_number;
      screen_value = introduced_number;
      digits_counter = digits_counter + 1;
    } else if (
      screen_value == "0" &&
      introduced_number == ","
    ) {
      screen_display.innerHTML = "0" + introduced_number;
      screen_value = 0 + introduced_number;
      comma = true;
    } else {
      if (
        introduced_number == "," &&
        comma == false
      ) {
        screen_display.innerHTML += introduced_number;
        screen_value += introduced_number;
        comma = true;
      }else {
        screen_display.innerHTML += introduced_number;
        screen_value += introduced_number;
        digits_counter = digits_counter + 1;
        
      }
    }
  }

  next_number_is_new = false;
  two_operators = false;
  SetButtonsDisabledStatus();
}

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

function GetAllCleared() {
  screen_display.innerHTML = "0";
  screen_value = "0";
  comma = false;
  first_number = 0;
  operator = "non_operator_entered_yet";
  next_number_is_new = true;
  RemoveHighlight();
  digits_counter = 0;
  introduced_number= null;
  SetButtonsEnabled();
  SetButtonsDisabledStatus()
  if (all_disabled_case == true) {
    document.querySelector("#zero").disabled = true;
    document.querySelector("#comma").disabled = false;
  }
  all_disabled_case = false;
}

function IntroduceAnOperator(operation_sign) {
  if (two_operators == false) {
    GetAResult();
  }
  first_number = screen_value;
  operator = operation_sign;
  next_number_is_new = true;
  two_operators = true;
  digits_counter = 0;
  introduced_number=null;
  comma = false;
  SetButtonsEnabled();
  SetButtonsDisabledStatus()
}

function GetFloatToString(chain) {
  string_chain = chain.toString().replace(/\./g, ",");
  return string_chain;
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

function GetStringToFloat(chain) {
  chain = chain.replace(/,/g, ".");
  float_chain = parseFloat(chain);
  return float_chain;
}
function RemoveUnusedDecimals(number_to_fix) {
  number_to_fix = number_to_fix * 1;
  return number_to_fix;
}

function GetAResult() {
  if (operator == "non_operator_entered_yet") {
    screen_value = GetStringToFloat(screen_value);
    screen_value = RemoveUnusedDecimals(screen_value);
    screen_value = GetFloatToString(screen_value);
    SetButtonsDisabledStatus();
    screen_display.innerHTML = screen_value;
  } else {
    if (introduced_number==null && next_number_is_new == true) {
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
    RemoveHighlight();
    two_operators = false;
  }
}

function SetResultFormated() {
  if (result != "ERROR") {
    length_with_negative_and_comma =
      MAXIMUM_DIGITS +
      (result < 0 ? 1 : 0) +
      (result.toString().includes(".") ? 1 : 0);
    if (result.toString().includes(".")) {
      result = result
        .toFixed(MAXIMUM_DIGITS)
        .replace(/\./g, ",")
        .slice(0, length_with_negative_and_comma);
      while (UnusedDecimalDetector(result)) {
        result = result.slice(0, result.length - 1);
      }
    } else {
      result = result.toString();
    }
  }
  if (result != "ERROR" && result.length > length_with_negative_and_comma) {
    result = "ERROR";
  }
}

function DoAnOperation() {
  first_number = GetStringToFloat(first_number);
  screen_value = GetStringToFloat(screen_value);
  screen_value = RemoveUnusedDecimals(screen_value);
  first_number = RemoveUnusedDecimals(first_number);

  if (operator == "*") {
    result = first_number * screen_value;
  } else if (operator == "/") {
    if (screen_value == 0) {
      result = "ERROR";
    } else {
      result = first_number / screen_value;
    }
  } else if (operator == "+") {
    result = first_number + screen_value;
  } else {
    result = first_number - screen_value;
  }
  return result;
}

function UnusedDecimalDetector(num) {
  if (!num.includes(",")) return false;
  return num[num.length - 1] == "," || num[num.length - 1] == "0";
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

document.addEventListener(
  "keydown",
  (event) => {
    event.preventDefault();
    var keyValue = event.key;

    console.log("keyValue: " + keyValue);

    if (keyValue == "Enter") {
      GetAResult();
    } else if (keyValue == "1") {
      IntroduceANumber("1");
    } else if (keyValue == "2") {
      IntroduceANumber("2");
    } else if (keyValue == "3") {
      IntroduceANumber("3");
    } else if (keyValue == "4") {
      IntroduceANumber("4");
    } else if (keyValue == "5") {
      IntroduceANumber("5");
    } else if (keyValue == "6") {
      IntroduceANumber("6");
    } else if (keyValue == "7") {
      IntroduceANumber("7");
    } else if (keyValue == "8") {
      IntroduceANumber("8");
    } else if (keyValue == "9") {
      IntroduceANumber("9");
    } else if (keyValue == "0") {
      IntroduceANumber("0");
    } else if (keyValue == ",") {
      IntroduceANumber(",");
    } else if (keyValue == "Escape") {
      GetAllCleared();
    } else if (keyValue == "+") {
      IntroduceAnOperator("+");
      SetHighlight(document.getElementById("addition").classList);
    } else if (keyValue == "-") {
      IntroduceAnOperator("-");
      SetHighlight(document.getElementById("substraction").classList);
    } else if (keyValue == "/") {
      IntroduceAnOperator("/");
      SetHighlight(document.getElementById("division").classList);
    } else if (keyValue == "*") {
      IntroduceAnOperator("*");
      SetHighlight(document.getElementById("multiplication").classList);
    } else if (keyValue == "Control") {
      ChangeSignButtonIsUsed();
    }
    console.log("codeValue: " + codeValue);
  },
  false
);
