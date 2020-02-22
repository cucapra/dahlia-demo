const md = require('markdown-it')();
const examples = [
  {
    name: "Affine Memory",
    code: `
let a: float[10];
a[0];
a[1];
    `,
    explanation: `
    Memories in Dahlia are Affine, i.e., they can only be used up to one time.
    In this program, a[0] and a[1] are read in the same *logical time step*.
    `,
  },
  {
    name: "Logical Time Steps",
    code: `
let a: float[10];
a[0];
---
a[1];
    `,
    explanation: `
    A \`---\` is Dahlia creates a *logical time step*. Resources can be
    reused across time steps. Since a[0] and a[1] are in different type steps,
    the program can read them.
    `,
  },
]


// Make sure all required fields of an example are defined.
function validateExample(example) {
  const exampleKeys = ['name', 'code', 'explanation'];
  let isValid = true;
  for (let k of exampleKeys) {
    if (typeof example[k] !== 'string') {
      console.warn("Not a valid example:" + JSON.stringify(example))
      isValid = false;
    }
  }
  return isValid;
}

// Setup button for an example. Update function cleans up the UI for the new
// example.
function addExample(example, updateFunc) {
  const buttonClasses = ["btn", "btn-secondary"];
  // The document element for the button:
  const el = document.createElement('BUTTON')
  for (let cls of buttonClasses) {
    el.classList.add(cls);
  }
  el.type = "button"
  el.innerHTML = example.name;
  // On clicking the button, update the editor and the explanation box.
  el.onclick = function () {
    updateFunc(example.code.trim());
    document.getElementById('explain').innerHTML =
      md.render(example.explanation.trim());
  }

  document.getElementById('examples').appendChild(el);
}

function setupAll(updateFunc) {
  for (ex of examples) {
    if (validateExample(ex)) {
      addExample(ex, updateFunc);
    }
  }
}

exports.setupAll = setupAll;
