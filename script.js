const result = document.getElementById("result");
result.value = "";

// var res = eval(result.value);

const opes = ["*", "/", "+", "-"];

function precedence(ope) {
    if (ope == '*' || ope == '/') return 2;
    if (ope == '+' || ope == '-') return 1;
    return 0;
}

function performOpe(a, b, ope) {
    switch (ope) {
        case '+':
            return Number(a) + Number(b);
        case '-':
            return Number(a) - Number(b);
        case '*':
            return Number(a) * Number(b);
        case '/':
            return Number(a) / Number(b);
        case '(':
            // return Number(a) * Number(b);
    }
}

document.querySelectorAll("button").forEach(
    (item) => {
        item.addEventListener("click", function() {
            disp(this);
        });
    }
);

const keyCodes = {
    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    // 187: '+',
    // 189: '-',
    // 191: '/',
    // 190: '.',
    96: '0',
    97: '1',
    98: '2',
    99: '3',
    100: '4',
    101: '5',
    102: '6',
    103: '7',
    104: '8',
    105: '9'
        // ,
        // 107: '+',
        // 109: '-',
        // 106: '*',
        // 111: '/',
        // 110: '.',
        // 13: 'enter',
        // 8: 'backspace',
        // 27: 'ac'
}

document.addEventListener("keydown", (e) => {
    dispClick(e.keyCode);
    // console.log(e.keyCode)
});

function dispClick(keyCode) {
    if (keyCode in keyCodes) {
        result.value += keyCodes[keyCode]
    } else {
        switch (keyCode) {
            case 187:
            case 107:
                appendOperators('+');
                break;
            case 189:
            case 109:
                appendOperators('-');
                break;
            case 106:
                appendOperators('*');
                break
            case 191:
            case 111:
                appendOperators('/');
                break;
            case 190:
            case 110:
                if (!splitArr(result.value)) {
                    result.value += '.'
                }
                break;
            case 13:
                result.value = calc(result.value);
                break;
            case 8:
                var res = result.value;
                res = res.substring(0, res.length - 1);
                result.value = res;
                break;
            case 27:
                result.value = ""
                break;
            default:
                // alert("Please enter a valid number or operator");
        }
    }
}

function appendOperators(ope) {
    if (!result.value) return;
    var res = result.value.substring(result.value.length - 1);
    if (res == '(') {
        alert('Invalid Input')
        return;
    }
    if (opes.includes(res)) {
        result.value =
            result.value.substring(0, result.value.length - 1) + ope;
        return;
    } else {
        result.value += ope;
    }
}

function disp(btn) {
    if (btn.classList.contains("ope")) {
        if (!result.value) return;
        var res = result.value.substring(result.value.length - 1);
        if (res == '(') {
            alert('Invalid Input')
            return;
        }
        if (opes.includes(res)) {
            result.value =
                result.value.substring(0, result.value.length - 1) + btn.value;
            return;
        }
    }

    switch (btn.value) {
        case 'C':
            var res = result.value;
            res = res.substring(0, res.length - 1);
            result.value = res;
            break;
        case 'AC':
            result.value = "";
            break;
        case '=':
            if (result.value) {
                result.value = calc(result.value);
            }
            break;
        case '(':
            result.value += '(';
            break;
        case ')':
            if (opes.some(ope => result.value.slice(-1) == ope) || result.value.slice(-1) == '(')
                alert("Invalid Input")
            else if (checkOpenBracket(result.value) > 0) {
                result.value += ')'
            }
            break;
        case '.':
            if (splitArr(result.value)) {
                break;
            }
        default:
            result.value += btn.value;
    }
}

function checkOpenBracket(res) {
    var cntOpen = 0,
        cntClose = 0,
        i;
    for (i = 0; i < res.length; ++i) {
        if (res.charAt(i) == '(') cntOpen++;
        if (res.charAt(i) == ')') cntClose++;
    }
    return cntOpen - cntClose;
}

function splitArr(arr) {
    opes.forEach((ope) => {
        arr = arr.split(ope).join();
    });
    arr = arr.split(",");
    return arr[arr.length - 1].includes(".");
}

function calc(res) {
    var values = [],
        ope = [],
        i;
    for (i = 0; i < res.length; ++i) {
        var ch = res.charAt(i);
        if (ch == ' ')
            continue;
        else if (ch == '(') {
            var chh = res.charAt(i - 1);
            if (chh && !(opes.some(ele => ele == chh))) ope.push('*');
            ope.push(ch);
        } else if (!isNaN(ch)) {
            var val = 0;
            var decimal = 0;
            var cnt = 0;
            while (i < res.length && (!isNaN(res.charAt(i)) || res.charAt(i) == '.')) {
                var dec = res.charAt(i);
                dec == '.' ? decimal++ : decimal;
                // console.log(decimal)
                if (decimal > 0) {
                    cnt++;
                    dec = res.charAt(i + 1);
                    if (!isNaN(dec))
                        val = (Number(val)) + (dec / (Math.pow(10, cnt)));
                } else {
                    val = (val * 10) + (dec - '0');
                }
                i++;
            }
            values.push(val);
            i--;
        } else if (ch == ')') {
            while (ope.length > 0 && ope.slice(-1) != '(') {
                var op = ope.pop();
                var val2 = values.pop();
                var val1 = values.pop();
                values.push(performOpe(val1, val2, op));
            }
            if (ope.length > 0) {
                ope.pop();
            }
            // var chh = res.charAt(i + 1);
            // if (!(opes.some(ele => ele == chh))) ope.push('*');
        } else {
            while (ope.length > 0 && (precedence(ope.slice(-1)) >= precedence(ch))) {
                var val2 = values.pop();
                var val1 = values.pop();
                var op = ope.pop();
                values.push(performOpe(val1, val2, op));
            }
            ope.push(ch);
        }
    }
    // console.log(ope.length > 0)
    while (ope.length > 0) {
        var val2 = values.pop();
        var val1 = values.pop();
        var op = ope.pop();
        values.push(performOpe(val1, val2, op));
    }

    if (isNaN(values.slice(-1))) {
        alert('Invalid Expression')
        return res;
    } else
        return (values.slice(-1));
}