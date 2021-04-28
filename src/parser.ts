const fs = require("fs")

class Yaml {
    constructor(string: string) { this.string = string }
    string: string
    toString() { return this.string }
    toJson() { return toJson(this.string) }
}

class Json {
    constructor(json: JSON) { this.json = json }
    json: JSON
    toString() { return this.json.toString() }
    toYaml() { return toYaml(this.json) }

    parse(text: string, reviver?: (this: any, key: string, value: any) => any) { return JSON.parse(text, reviver) }
    stringify(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string
    stringify(value: any, replacer?: (string | number)[], space?: string | number): string
    stringify(value: any, replacer?: any, space?: any) { return JSON.stringify(value, replacer, space) }
}

class YamlOptions {
    propertiesCompatability: boolean
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

    return new Json(json)*/
}

function toJsonFromFile(yamlFile: string, options?: FileOptions) { return toJson(fs.readFileSync(yamlFile, options.encoding)) }

function toYaml(json: JSON, options?: YamlOptions) {
    if (json instanceof Array) throw new Error("You currently can't input json arrays unless they are a subvalue")

    var yaml = ""

    function parse(json: JSON, indent: string) {
        if (!options.propertiesCompatability) {
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
        } else {
            Object.keys(json).forEach((key: any) => {
                var value = json[key]

                if (typeof value == "string") yaml += indent + key + ": " + value + "\n"
                else if (value instanceof Array || value instanceof Object) console.warn("Arrays and Objects are disabled because properties compatability is enabled")
            })
        }
    }
    parse(json, "")

    return new Yaml(yaml)
}

function toYamlFromFile(jsonFile: string, options?: FileOptions) { return toYaml(JSON.parse(fs.readFileSync(jsonFile, options.encoding))) }

module.exports = {
    toJson,
    toJsonFromFile,
    toYaml,
    toYamlFromFile,
    Yaml,
    Json,
    YamlOptions,
    FileOptions,
    Encoding
}