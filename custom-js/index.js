const { Dahlia } = require('../../dahlia/dahlia/js/target/scala-2.13/dahlia-fastopt.js');
const { setupAll } = require('./examples.js');

const ace = require('brace');
require('brace/mode/ocaml')
require('brace/mode/c_cpp')
require('brace/theme/monokai');

const Range = ace.acequire('ace/range').Range;

// input container
const editor = ace.edit("editor");
editor.session.setMode("ace/mode/ocaml");
editor.session.setUseWrapMode("ace/mode/c_cpp");
editor.setOptions({
  fontSize: 18,
  showPrintMargin: false,
})

// Output container
const result = ace.edit("result");
result.session.setMode("ace/mode/c_cpp");
result.session.setUseWrapMode("ace/mode/c_cpp");
result.setOptions({
  readOnly: true,
  highlightActiveLine: false,
  highlightGutterLine: false,
  showGutter: false,
  fontSize:14,
  showPrintMargin: false,
});


// Id of the last marker set in the editor.
let marker;
function compile() {
  const prog = editor.getValue();
  // Returns a tuple with either the result or an error.
  let [res, [pos, err]] = Dahlia.compileString(prog);

  // Remove any previous markers
  editor.session.removeMarker(marker)

  let out;
  // If there is no result, report error message.
  if (res === "") {
    out = err;
    marker = editor.session.addMarker(new Range(pos - 1, 0, pos - 1, 2000), "warning", "fullLine")
  } else {
    out = res;
  }
  result.setValue(out);
  result.clearSelection();
}
window.compile = compile;

// Cleanup the UI for a new example load.
function updateFunc(input) {
  editor.session.removeMarker(marker);
  editor.session.setValue(input);
  result.setValue("");
}

// Setup example buttons
setupAll(updateFunc)
