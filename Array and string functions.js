// String Functions in java script

// 1- toUpperCase()
const str = "ayesha";
const uppercaseStr = str.toUpperCase();
console.log(uppercaseStr); // AYESHA

// 2- toLowerCase()
const str1 = "AYESHA";
const lowercaseStr = str.toLowerCase();
console.log(lowercaseStr); // "ayeshad"

// 3- trim()
const str2 = "   ayesha   ";
const trimmedStr = str.trim();
console.log(trimmedStr); // "ayesha"

// 4- indexOf()
const str3 = "ayesha malik";
const index = str.indexOf("malik");
console.log(index); // 7

// 5- substring()
const str4 = "ayesha malik";
const substring = str.substring(0, 6);
console.log(substring); // "ayesha"

// 6- split()
const str5 = "ayesha,malik";
const arr8 = str.split(",");
console.log(arr); // ["ayesha", "malik"]

// 7- replace()
const str6 = "ayesha";
const newStr = str.replace("heyy", "hellow");
console.log(newStr); // "hello hellow"

//-----------------------------------------------------------------------------------------------------------------

// Array Functions

// 1- map()
const arr = [1, 2, 3, 4, 5];
const squaredArr = arr.map((num) => num ** 2);
console.log(squaredArr); // [1, 4, 9, 16, 25]

// 2- filter()
const arr1 = [1, 2, 3, 4, 5];
const evenArr = arr.filter((num) => num % 2 === 0);
console.log(evenArr); // [2, 4]

// 3- reduce()
const arr2 = [1, 2, 3, 4, 5];
const sum = arr.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15

// 4- concat()
const arr3 = [1, 2, 3];
const arr4 = [4, 5, 6];
const mergedArr = arr1.concat(arr2);
console.log(mergedArr); // [1, 2, 3, 4, 5, 6]

// 5- find()
const arr5 = [1, 2, 3, 4, 5];
const evenNum = arr.find((num) => num % 2 === 0);
console.log(evenNum); // 2

// 6- every()
const arr6 = [2, 4, 6, 8];
const allEven = arr.every((num) => num % 2 === 0);
console.log(allEven); // true

// 7- slice()
const arr7 = [1, 2, 3, 4, 5];
const slicedArr = arr.slice(1, 4);
console.log(slicedArr); // [2, 3, 4]
