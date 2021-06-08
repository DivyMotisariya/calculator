function add(a, b) {
    if (isNaN(a) || isNaN(b)) {
        console.log("Both inputs are not numbers");
        return;
    }
    console.log("Sum : " + (Number(a) + Number(b)));
}

// add(10, 20);

function oddeven(n) {
    if (isNaN(n)) {
        console.log("Enter a number");
        return;
    }
    var num = Number(n);
    if (num % 2 == 0) {
        console.log(num + " is Even Number");
    } else {
        console.log(num + " is Odd Number");
    }
}

// oddeven(11)

function concatStr(...str) {
    var txt = "";
    str.forEach((s) => (txt += " " + s));
    console.log(txt);
}

// concatStr('Hello', "World", "Tuesday");

function firstArr(arr) {
    console.log(arr[0]);
}
var arr = [9, 8, 7, 6, 5, 4, 1, 2, 3, 0, 10, 89, 56, 78, 12, 32, 65, 48];
// console.log(...arr)
// firstArr(arr);

function numTo10() {
    var i;
    for (i = 1; i <= 10; ++i) {
        console.log(i);
    }
}
// numTo10();

function MinMax(arr) {
    var max = -Infinity,
        min = Infinity;
    arr.forEach((ele) => {
        if (ele > max) {
            max = ele;
        }
        if (ele < min) {
            min = ele;
        }
    });
    console.log("Minimum : " + min);
    console.log("Maximum : " + max);
}
// MinMax(arr);

function sumArr(arr) {
    var sum = 0;
    arr.forEach((ele) => {
        if (!isNaN(ele)) {
            sum += Number(ele);
        }
    });
    console.log("Sum : " + sum);
}
// sumArr(arr);

function sortArray(arr) {
    var i, j;
    var len = arr.length;
    for (i = 0; i < len; ++i) {
        for (j = i; j < len; ++j) {
            if (arr[i] > arr[j]) {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
    // console.log("Sorted Array :", ...arr);
}
// console.log(sortArray(arr))

var arr1 = [1, 2, 3, 4, 5],
    arr2 = [10, 9, 8, 7, 6];

var arr3 = mergeArr(arr1, arr2);
console.log(arr3);

function mergeArr(...arr) {
    var res = [];
    arr.forEach((ele) => {
        ele.forEach(arrEle => {
            res.push(arrEle);
        });
    });
    return sortArray(res)
}