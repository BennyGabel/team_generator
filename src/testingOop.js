// Test.js was created with the purpose of learning more about OOP functionality,
// filtering, segmentations,  etc.

const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")

const newMgr = new Manager("Andres", 1, "andres@gmail.com", 123);
const newEngOne = new Engineer("Benny", 2, "benny@gmail.com", "test");
const newEngoTwo = new Engineer("John", 3, "john@gmail.com", "testTwo");
const newMgr2 = new Manager("Andres dos", 1, "andres@gmail.com", 123);
const newMgr3= new Manager("AndresTres", 1, "andres@gmail.com", 123);

const arr = [newMgr, newEngOne, newEngoTwo, newMgr2, newMgr3];
// arr.forEach(empl => console.log(empl.getRole()))
arr.forEach(empl => console.log(empl.constructor.name))

const justEng = arr.filter(employees => employees.constructor.name == "Engineer")
const justManager = arr.filter(employees => employees.constructor.name == "Manager")
console.log(justEng)

for(i=0; i<justManager.length; i++){
    console.log(justManager[i].name)
}
for(i=0; i<justEng.length; i++){
    console.log(justEng[i].name)
}

console.log("---")
console.log("***")

console.log("arr", arr.length)
console.log(arr[0].name, arr[1].name, arr[2].name)

console.log("justEng", justEng.length)
console.log(justEng[0].name, justEng[1].name)
console.log(justEng[0].getRole())

// Manager
// Ingeniero
// Interno
// Interno
// Ingeniero
// Interno
// Interno
// Interno
// Ingeniero
// Interno