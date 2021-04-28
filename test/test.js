const yamlParser = require("../bin/parser.js")

var toJson = yamlParser.toJsonFromFile("./test/test.yml", { encoding: "utf8" })
var toYaml = yamlParser.toYamlFromFile("./test/test.json", { encoding: "utf8" })

console.log(toJson)
//console.log(toYaml)

//if (toJson == {}) console.log("toJson Working")
if (toYaml == "string: String\nobject:\n  subString: Sub String\n  subObject:\n    subSubString: Sub Sub String\n  subArray:\n    - Sub 1.\n    - Sub 2.\n    - Sub 3.\narray:\n  - 1.\n  - 2.\n  - 3.\n") console.log("toYaml Working")