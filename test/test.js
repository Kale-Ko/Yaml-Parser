const yamlParser = require("../bin/parser.js")

var toYaml = yamlParser.toYamlFromFile("./test/test.json", { encoding: "utf8" })
var toJson = toYaml.toJson()

//console.log(toYaml.toString())
console.log(toJson)

if (toYaml.toString() == "string: String\nobject:\n  subString: Sub String\n  subObject:\n    subSubString: Sub Sub String\n  subArray:\n    - Sub 1.\n    - Sub 2.\n    - Sub 3.\narray:\n  - 1.\n  - 2.\n  - 3.\n") console.log("toYaml Working")
//if (toJson == {}) console.log("toJson Working")