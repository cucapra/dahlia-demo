const md = require('markdown-it')();
const examples = [
  {
    name: "Affine Memory",
    code: `
let a: float[10];
a[0];
a[0] := 1.0;
    `,
    explanation: `
    In FPGA programming, memories are implemented using physical resources
    which can service a finite number of reads and writes every cycle. In
    Dahlia, memories are affine, i.e., they can only be used up to one time
    in every *logical time step*. The first read to \`a[0]\` consumes the
    affine memory.
    `,
  },
  {
    name: "Logical Time Steps",
    code: `
let a: float[10];
a[0];
---
a[0] := 1.0;
    `,
    explanation: `
    A \`---\` in Dahlia creates a *logical time step*. Resources can be
    reused across time steps. Since a[0] and a[1] are in different time steps,
    the program is accepeted.
    `,
  },
  {
    name: "Memory Ports",
    code:`
let a: float{2}[10];
a[0];
a[0] := 1.0;`,
    explanation: `
    FPGA memories can also support multiple *ports* in order to service multiple
    reads and writes every cycle. Dahlia supports reasoning about multi-ported
    memories. Since in this program the resource \`a\` is given 2 ports, it
    can read the two addresses in the same logical time steps.`
  },
  {
    name: "Memory Banking (1)",
    code:`
let a: float[10 bank 2];
a[0];
a[1] := 1.0;`,
    explanation: `
    FPGA memories can *banked*, i.e., a logical memory can be represented using
    several physical memories containing disjoint elements. This allows parallel
    access to *disjoint elements*. A banked memory stores elements in a striped
    pattern. In this example, it allows for parallel access to two adjacent elements.`
  },
  {
    name: "Memory Banking (2)",
    code:`
let a: float[10 bank 2];
a[0];
a[0] := 1.0;`,
    explanation: `
    Unlike ports, memory banks *do not allow* for access to the same element in
    a single time step.`
  },
  {
    name: "Parallel Loops",
    code:`
let a: float[10 bank 2];
let b: float[10 bank 2];
for (let i = 0 .. 10) unroll 2 {
  a[i] := b[i] * 2.0;
}`,
    explanation: `
    In Dahlia, \`for\` loops can be used to parallelize computation. These
    loop support *DOALL* parallelism and therefore disallow any interloop
    dependencies in the parallel part of the computation. The program creates
    two processing elements (PEs) that execute on disjoint parts of \`a\` and
    \`b\`.
    `
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
