const fs = require("fs")

class Json {
    constructor(json: JSON | Json) { if (json instanceof Json) this.json = json.json; else this.json = json }
    json: JSON
    toString() { return JSON.stringify(this.json) }
    toJson() { return this.json }
    toYaml() { return YAML.parse(this.json) }
}

class Yaml {
    constructor(string: string) { this.string = string }
    string: string
    toString() { return YAML.stringify(this) }
    toJson() { return YAML.jsonify(this) }
}

class YAML {
    static parse(json: JSON | Json) { if (json instanceof Json) return toYaml(json.json); else return toYaml(json) }
    static stringify(yaml: Yaml) { return yaml.string }
    static jsonify(yaml: Yaml) { return toJson(YAML.stringify(yaml)) }
}

class JsonOptions {
    indentAmount: number
}

class YamlOptions {
    indentAmount: number
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

function toJson(yaml: string, options?: JsonOptions) {
    throw new Error("toJson is not currently working. I am working on it though!")

    /*var json = {}

    function parse(yaml: string, indent: string) {

    }
    parse(yaml, "")

    return new Json(JSON.parse(JSON.stringify(json)))*/
}

function toJsonFromFile(yamlFile: string, options?: FileOptions, jsonOptions?: JsonOptions) { return toJson(fs.readFileSync(yamlFile, options.encoding), jsonOptions) }

function toYaml(json: JSON, options?: YamlOptions) {
    if (json instanceof Array) throw new Error("You currently can't input json arrays unless they are a subvalue")

    var yaml = ""
    var indentT = "  "
    if (options != null) { indentT = ""; for (var index = 0; index < (options.indentAmount || 2); index++) indentT += " " }

    function parse(json: JSON, indent: string) {
        var propertiesCompatability = false
        if (options != null) { if (options.propertiesCompatability) propertiesCompatability = true }

        if (!propertiesCompatability) {
            Object.keys(json).forEach((key: any) => {
                var value = json[key]

                if (typeof value == "string") yaml += indent + key + ": " + value + "\n"
                else if (value instanceof Array) {
                    yaml += indent + key + ":\n"; value.forEach(value => {
                        if (typeof value == "string") yaml += indent + indentT + "- " + value + "\n"
                        else if (value instanceof Array) console.warn("Arrays in arrays don't work")
                        else if (value instanceof Object) console.warn("Objects in arrays don't work")
                    })
                }
                else if (value instanceof Object) { yaml += indent + key + ":\n"; parse(value, indent + indentT) }
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

function toYamlFromFile(jsonFile: string, options?: FileOptions, yamlOptions?: YamlOptions) { return toYaml(JSON.parse(fs.readFileSync(jsonFile, options.encoding)), yamlOptions) }

module.exports = {
    toJson,
    toJsonFromFile,
    toYaml,
    toYamlFromFile,
    Json,
    Yaml,
    YAML,
    JsonOptions,
    YamlOptions,
    FileOptions,
    Encoding
}