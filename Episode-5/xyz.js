// how does the js make the functions and variables of file, protected from the another file accessing it ?
// It is done using the same techniques as the function scope. Like in js the variables and functions in function ( yes!, we can create that too) are private and are limited that function block scope only, in the same way the js file are considered to be inside the function and its variable and functions can't be accessed outside directly.

// And the only way to access the functions and variables of the file in the other file is done by the module.exports
// when we write the require("file.js"), then js will take all the functions and variables inside the file and wrap in a function and then execute the function and  we can access it.

// IIFE - Immediately Invoked Function Expression

// summary : All the code of the module will be wrapped inside the function, when we write the require("file.js"); and the function in which all the code is wrapped is known as IIFE - Immediately Invoked Function Expression. (we are created a function and we are invoking it immediately i.e.,invoking on the fly.)
// like :
(function () {
  // all the code will be module will runs inside here.
})();
// we need to wrap the definition inside the () and the call the function with (); and this function does not have a NAME so it is anonymous.
// After the wrap, the code will be passed to V8 engine.

// why we need IIFE?
// 1. Immediately Invokes the code.
// 2. Privacy- Keeps the variable and functions safe. from outside.
// like the variable inside the IIFE and outside with the same name, does not interfere.

// Q- How are variables and functions private in diff. modules?
// because of wrapping code in IIFE and require Statement.

// Q- from where the module.exports come from?
// Node has added the module parameter, it the parameter inside the function definition of IIFE and we can use it in the file, going to be exported.

// as:

(function (module) { // here the module is the parameter, we use to export.
  // all the code will be module will runs inside here. 
  // even the 'module.exports' statement is also inside this IIFE
})(module); // it (module) is passed in the function call of the IIFE as well.


// Also when we require the file from one file in the other then also the require came as parameter in the IIFE as :

(function (module, require) { // here the module is the parameter, we use to export and require to get the file.
  require("./file.js");
  // all the code will be module will runs inside here. 
  module.exports = {};
})(module, require); // it (module) is passed in the function call of the IIFE as well.

// more in notes