const fs = require("fs")

module.exports = {
    toJson,
    toJsonFromFile,
    toYml,
    toYmlFromFile
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

function toJson(yml: string) {
    throw new Error("toJson is not currently working")

    /*var json = {}

    function parse(yml: string, indent: string) {

    }
    parse(yml, "")

    return json*/
}

function toJsonFromFile(ymlFile: string, options?: FileOptions) { return toJson(fs.readFileSync(ymlFile, options.encoding)) }

function toYml(json: JSON) {
    if (json instanceof Array) throw new Error("You currently can't input json arrays unless they are a subvalue")

    var yml = ""

    function parse(json: JSON, indent: string) {
        Object.keys(json).forEach((key: any) => {
            var value = json[key]

            if (typeof value == "string") yml += indent + key + ": " + value + "\n"
            else if (value instanceof Array) {
                yml += indent + key + ":\n"; value.forEach(value => {
                    if (typeof value == "string") yml += indent + "  - " + value + "\n"
                    else if (value instanceof Array) console.warn("Arrays in arrays don't work")
                    else if (value instanceof Object) console.warn("Objects in arrays don't work")
                })
            }
            else if (value instanceof Object) { yml += indent + key + ":\n"; parse(value, indent + "  ") }
        })
    }
    parse(json, "")

    return yml
}

function toYmlFromFile(jsonFile: string, options?: FileOptions) { return toYml(JSON.parse(fs.readFileSync(jsonFile, options.encoding))) }