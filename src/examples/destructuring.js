const book = {
  title: "Ego is the new enemy",
  author: "Ryan Holiday",
  publisher: {
    name: "Penguin"
  }
};
// using destructuring
// PS can be const, let or even var
const { author, publisher } = book;

// renaming destructured variables
const { title: titleOfBook } = book;

// setting default value and renaming at the same time

// const { name = "Self Publish"} = publisher
const { name: publisherName = "Self Publish" } = publisher;
const { name: publisherDefault = "Self Publish" } = {};

console.log(publisherName, publisherDefault);


// Array destructuring

const address = ["1299 5 Juniper Street", "Philadelphia", "Pennsylvania", "19147"];
// Object destructuring: here properties are being matched up by name as shown above
/*
  Array destructuring: Items in the array are being matched by position
*/


// the variables street, city, state, zip do not exist anywhere inside the array but the array assigns
// the items based on their position
// for e.g
/*
  street matches 1299 5 Juniper Street, then street = 1299 5 Juniper Street
  zip matches 19147, then zip = 19147
*/


/*
  here, both first and last elements were omitted.
  the , before city is not a mistake. it represents the first item, just that we do not 
  want to use 
  to omit the last item, you can just leave it off



  it is perfectly fine to set default values to the destructured elements as shown below
*/

// const [street, city, state, zip] = address;
// const [, city, state] = address;
const [state = 'Anambra'] = address;

//address also could have been an empty array


const item = ["Coffee (hot)", "$2.00", "$2.50", "$3.00"];

const [coffee, , price] = item;
console.log(`A medium ${coffee} costs ${price}`);

// ... can be a spread operator or a rest parameter
// spread operator ==> when used on an iterable like an array, object or string/.
// it simply unpacks the elements of that iterable into individual elements. this is further explained below

// For Array
// copies the content of an array into a new array without mutating the old array
// spread does not create an array, I must first declare an empty array and then spread the content
// of the old array into the new one
const names = ['Ada', 'Ike'];
const newNames = [...names, 'Mike'];

// For Objects
/*
  first install a babel plugin 
*/
const user = {
  name: 'ugo',
  age: 22
};

const newUser = {
  ...user
}
console.log(newUser, 'newUser');//
/*
  {
    name: 'ugo',
    age: 22
  };
*/

const newUser2 = {
  ...user,
  location: 'Abuja'
}
console.log(newUser2, 'new User 2');//
/*
  {
    name: 'ugo',
    age: 22,
    location: 'Abuja'
  };
*/

const newUser3 = {
  ...user,
  location: 'Abuja',
  name:'Tosin'
}
console.log(newUser3, 'new User 3');//
/*
  {
    name: 'Tosin',
    age: 22,
    location: 'Abuja'
  };
*/

/*
  ... as a rest parameter, packs the remaining elements into an array
*/