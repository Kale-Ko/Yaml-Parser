const fs = require("fs")

module.exports = {
    toJson,
    toJsonFromFile,
    toYaml,
    toYamlFromFile
}

class FileOptions {
    encoding: Encoding
}

enum Encoding {
    "us-ascii",
    "utf8",
    "utf-8",
    "ebcdic",
    "utf16",
    "utf-16",
    "utf32",
    "utf-32"
}

function toJson(yaml: string) {
    throw new Error("toJson is not currently working")

    /*var json = {}

    function parse(yaml: string, indent: string) {

    }
    parse(yaml, "")

    return json*/
}

function toJsonFromFile(yamlFile: string, options?: FileOptions) { return toJson(fs.readFileSync(yamlFile, options.encoding)) }

function toYaml(json: JSON) {
    if (json instanceof Array) throw new Error("You currently can't input json arrays unless they are a subvalue")

    var yaml = ""

    function parse(json: JSON, indent: string) {
        Object.keys(json).forEach((key: any) => {
            var value = json[key]

            if (typeof value == "string") yaml += indent + key + ": " + value + "\n"
            else if (value instanceof Array) {
                yaml += indent + key + ":\n"; value.forEach(value => {
                    if (typeof value == "string") yaml += indent + "  - " + value + "\n"
                    else if (value instanceof Array) console.warn("Arrays in arrays don't work")
                    else if (value instanceof Object) console.warn("Objects in arrays don't work")
                })
            }
            else if (value instanceof Object) { yaml += indent + key + ":\n"; parse(value, indent + "  ") }
        })
    }
    parse(json, "")

    return yaml
}

function toYamlFromFile(jsonFile: string, options?: FileOptions) { return toYaml(JSON.parse(fs.readFileSync(jsonFile, options.encoding))) }