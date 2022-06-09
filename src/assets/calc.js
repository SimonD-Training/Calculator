let calculator = {
  runpow: function(expression) {
    let expr2 = [];
    if (!expression.includes("^")) {
      return expression;
    }
    while (expression.includes("^")) {
      for (let i = 0; i < expression.length; i++) {
        if (expression[i + 1] == "^") {
          expr2.push(expression[i] ** expression[i + 2]);
          if (i + 3 < expression.length) {
            for (let a = i + 3; a < expression.length; a++) {
              expr2.push(expression[a]);
            }
          }
          break;
        } else {
          expr2.push(expression[i]);
        }
      }
      expression = expr2;
      expr2 = [];
    }
    return expression;
  },
  rundiv: function(expression) {
    let expr2 = [];
    if (!expression.includes("/")) {
      return expression;
    }
    while (expression.includes("/")) {
      for (let i = 0; i < expression.length; i++) {
        if (expression[i + 1] == "/") {
          expr2.push(expression[i] / expression[i + 2]);
          if (i + 3 < expression.length) {
            for (let a = i + 3; a < expression.length; a++) {
              expr2.push(expression[a]);
            }
          }
          break;
        } else {
          expr2.push(expression[i]);
        }
      }
      expression = expr2;
      expr2 = [];
    }
    return expression;
  },
  runmult: function(expression) {
    let expr2 = [];
    if (!expression.includes("*")) {
      return expression;
    }
    while (expression.includes("*")) {
      for (let i = 0; i < expression.length; i++) {
        if (expression[i + 1] == "*") {
          expr2.push(expression[i] * expression[i + 2]);
          if (i + 3 < expression.length) {
            for (let a = i + 3; a < expression.length; a++) {
              expr2.push(expression[a]);
            }
          }
          break;
        } else {
          expr2.push(expression[i]);
        }
      }
      expression = expr2;
      expr2 = [];
    }
    return expression;
  },
  runplus: function(expression) {
    let expr2 = [];
    if (!expression.includes("+")) {
      return expression;
    }
    while (expression.includes("+")) {
      for (let i = 0; i < expression.length; i++) {
        if (expression[i + 1] == "+") {
          expr2.push(expression[i] + expression[i + 2]);
          if (i + 3 < expression.length) {
            for (let a = i + 3; a < expression.length; a++) {
              expr2.push(expression[a]);
            }
          }
          break;
        } else {
          expr2.push(expression[i]);
        }
      }
      expression = expr2;
      expr2 = [];
    }
    return expression;
  },
  brackclear: function(expression) {
    let lis = expression;
    let expr2 = [];
    let expr3 = [];
    let pos1 = 0;
    let pos2 = 0;
    let extrabrack = 0;
    if (lis.includes("(")) {
      for (let i = 0; i < lis.length; i++) {
        if (lis[i] == "(") {
          pos1 = i;
          for (let a = i; a < lis.length; a++) {
            if (lis[a] == "(") {
              extrabrack++;
            }
            if (lis[a] == ")") {
              pos2 = a;
              if (extrabrack == 0) {
                break;
              } else {
                extrabrack--;
              }
            }
          }
          break;
        }
      }
      for (let i = 0; i < pos1; i++) {
        expr2.push(lis[i]);
      }
      if (pos1 >= 1) {
        if (!["-", "+", "/", "*", "^", "("].includes(lis[pos1 - 1])) {
          expr2.push("*");
        }
      }
      for (let i = pos1 + 1; i < pos2; i++) {
        expr3.push(lis[i]);
      }
      expr2.push(String(this.calculator.calculate(expr3.join(""))));
      if (pos2 + 1 < lis.length) {
        if (!["-", "+", "/", "*", "^", "("].includes(lis[pos2 + 1])) {
          expr2.push("*");
        }
        for (let i = pos2 + 1; i < lis.length; i++) {
          expr2.push(lis[i]);
        }
      }
      expr2 = this.calculator.brackclear(expr2.join("").split(""));
      return expr2;
    } else {
      return lis;
    }
  },
  minclear: function(expression) {
    let expr2 = [];
    if (expression.includes("-")) {
      for (let i = 0; i < expression.length; i++) {
        if (expression[i] == "-") {
          expression[i + 1] = expression[i] + expression[i + 1];
          if (!["+", "/", "*", "^"].includes(expression[i - 1])) {
            if (i > 0) {
              expression[i] = "+";
            } else {
              expression[i] = null;
            }
          } else {
            expression[i] = null;
          }
        }
      }
    }
    for (let i = 0; i < expression.length; i++) {
      if (expression[i] == null) {
      } else if (!["+", "/", "*", "^"].includes(expression[i])) {
        expr2.push(parseFloat(expression[i]));
      } else {
        expr2.push(expression[i]);
      }
    }
    return expr2;
  },
  digits: function(expression) {
    let expr2 = [];
    expr2[0] = "";
    let q = 0;
    let justnum = false;
    for (let i = 0; i < expression.length; i++) {
      if (!["-", "+", "/", "*", "^"].includes(expression[i])) {
        expr2[q] += expression[i];
        justnum = true;
      } else {
        if (justnum) {
          justnum = false;
          expr2.push("");
          q++;
        }
        expr2[q] += expression[i];
        expr2.push("");
        q++;
      }
    }
    return expr2;
  },
  calculate: function(expression) {
    expression = this.brackclear(expression);
    expression = this.digits(expression);
    expression = this.minclear(expression);
    expression = this.runpow(expression);
    expression = this.runmult(expression);
    expression = this.rundiv(expression);
    expression = this.runplus(expression);
    return expression;
  },
};

export {calculator};