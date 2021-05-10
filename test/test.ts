const yamlParser = require("../bin/parser.js")

var yaml = yamlParser.toYamlFromFile("./test/test.json", { encoding: "utf8" })
var json = yamlParser.toJsonFromFile("./test/test.yml", { encoding: "utf8" })

if (yaml.toString() == "string: String\nobject:\n  subString: Sub String\n  subObject:\n    subSubString: Sub Sub String\n  subArray:\n    - Sub 1.\n    - Sub 2.\n    - Sub 3.\narray:\n  - 1.\n  - 2.\n  - 3.\n") console.log("toYaml Working")
if (JSON.stringify(json.toNormal()) == JSON.stringify({ string: "String", object: { subString: "SubString", subObject: { subSubString: "SubSubString" }, subArray: ["Sub1.", "Sub2.", "Sub3."] }, array: ["1.", "2.", "3."] })) console.log("toJson Working")