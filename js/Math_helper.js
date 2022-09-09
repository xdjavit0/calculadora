function DoAnOperation() {
  previous_number = GetStringToFloat(previous_number);
  screen_value = GetStringToFloat(screen_value);
  screen_value = RemoveUnusedDecimals(screen_value);
  previous_number = RemoveUnusedDecimals(previous_number);

  if (operator == "*") {
    result = previous_number * screen_value;
  } else if (operator == "/") {
    if (screen_value == 0) {
      result = "ERROR";
    } else {
      result = previous_number / screen_value;
    }
  } else if (operator == "+") {
    result = previous_number + screen_value;
  } else {
    result = previous_number - screen_value;
  }
  return result;
}

function UnusedDecimalDetector(num) {
  if (!num.includes(",")) return false;
  return num[num.length - 1] == "," || num[num.length - 1] == "0";
}

function RemoveUnusedDecimals(number_to_fix) {
  number_to_fix = number_to_fix * 1;
  return number_to_fix;
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

function GetStringToFloat(chain) {
  chain = chain.replace(/,/g, ".");
  float_chain = parseFloat(chain);
  return float_chain;
}

function GetFloatToString(chain) {
  string_chain = chain.toString().replace(/\./g, ",");
  return string_chain;
}
