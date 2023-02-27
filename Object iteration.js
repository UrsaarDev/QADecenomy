const obj = {
    "name": "John Doe",
    "age": "34",
    "country": "United States"
}

var copiedObj = Object.assign({}, obj)

copiedObj.age = "57"
copiedObj.country = "Unitied Kingdom"

// Object.keys
const keys = Object.keys(copiedObj)
keys.forEach(key => console.log(`${key}: ${copiedObj[key]}`))

// for ... in
for (const property in copiedObj) {
    console.log(`${property}: ${copiedObj[property]}`);
}