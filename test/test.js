const ymlParser = require("../bin/parser.js")

var toJson = ymlParser.toJsonFromFile("./test/test.yml", { encoding: "utf8" })
//var toYml = ymlParser.toYmlFromFile("./test/test.json", { encoding: "utf8" })

console.log(toJson)
//console.log(toYml)

//if (toJson == {}) console.log("toJson Working")
if (toYml == "string: String\nobject:\n  subString: Sub String\n  subObject:\n    subSubString: Sub Sub String\n  subArray:\n    - Sub 1.\n    - Sub 2.\n    - Sub 3.\narray:\n  - 1.\n  - 2.\n  - 3.\n  - 4.\n  - 5.\n") console.log("toYml Working")