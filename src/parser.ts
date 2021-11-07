/**
    @license
    MIT License
    Copyright (c) 2021 Kale Ko
    See https://kaleko.ga/license.txt
*/

const fs = require("fs")
const detectIndent = require('detect-indent');

class Json {
    constructor(json: JSON | Json) { if (json instanceof Json) this.json = json.json; else this.json = json }
    json: JSON
    toString() { return JSON.stringify(this.json) }
    toNormal() { return this.json }
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
    static parseString(yaml: string) { return new Yaml(yaml) }
    static stringify(yaml: Yaml) { return yaml.string }
    static jsonify(yaml: Yaml) { return toJson(YAML.stringify(yaml)) }
}

class YamlOptions {
    indentAmount: number
    propertiesCompatability: boolean
}

class FileOptions {
    encoding: Encodings
}

enum Encodings {
    us_ascii = "us-ascii",
    utf8 = "utf8",
    ebcdic = "ebcdic",
    utf16 = "utf16",
    utf32 = "utf32",
}

enum YamlTypes {
    String = "String",
    Object = "Object",
    Array = "Array",
    ArrayValue = "ArrayValue"
}

function toJson(yaml: string) {
    var json = {}

    var fileIndent = detectIndent(yaml).amount

    var lines = yaml.replace(/\r/ig, "").split("\n")
    lines.forEach((line: any) => {
        var key = lines.indexOf(line)

        var indent = detectIndent(lines[key]).amount

        lines[key] = line.replace(/ /ig, "")

        var split = lines[key].split(":")

        lines[key] = {}

        if (split[0].startsWith("-")) {
            lines[key].type = YamlTypes.ArrayValue
            lines[key].value = split[0]
            lines[key].indent = indent
        } else if (split[1] == "") {
            lines[key].type = YamlTypes.Object
            lines[key].key = split[0]
            lines[key].indent = indent
        } else {
            lines[key].type = YamlTypes.String
            lines[key].key = split[0]
            lines[key].value = split[1]
            lines[key].indent = indent
        }
    })

    if (lines[lines.length - 1].key == "") lines.pop()

    lines.forEach((line: any) => { if (line.type == YamlTypes.Object && lines[lines.indexOf(line) + 1].type == YamlTypes.ArrayValue) lines[lines.indexOf(line)].type = YamlTypes.Array })

    lines.forEach((line: any) => {
        function parse(line: any, parent: Object) {
            if (line.type == YamlTypes.String) parent[line.key] = line.value
            else if (line.type == YamlTypes.Object) {
                parent[line.key] = {}

                var started = false
                var theLine = line
                lines.forEach((line: any) => {
                    if (line.key == theLine.key) { started = true; return } if (line.indent == theLine.indent) { started = false } if (!started || line.indent != theLine.indent + fileIndent) return

                    parse(line, parent[theLine.key])
                })
            } else if (line.type == YamlTypes.Array) {
                parent[line.key] = []

                var started2 = false
                var theLine2 = line
                lines.forEach((line: any) => {
                    if (line.key == theLine2.key) { started2 = true; return } if (!started2) return

                    if (line.type == YamlTypes.ArrayValue) { if (line.indent - 2 == theLine2.indent) parent[theLine2.key].push(line.value.replace("-", "")) } else started2 = false
                })
            }
        }
        if (line.indent == 0) parse(line, json)
    })

    return new Json(JSON.parse(JSON.stringify(json)))
}

function toJsonFromFile(yamlFile: string, options?: FileOptions) { return toJson(fs.readFileSync(yamlFile, options.encoding)) }

function toYaml(json: JSON, options?: YamlOptions) {
    if (json instanceof Array) throw new Error("You can't input json arrays unless they are a subvalue")

    var yaml = ""
    var indentT = "  "
    if (options != null) { indentT = ""; for (var index = 0; index < (options.indentAmount || 2); index++) indentT += " " }

    var propertiesCompatability = false
    if (options != null) { if (options.propertiesCompatability) propertiesCompatability = true }

    function parse(json: JSON, indent: string) {
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

    if (propertiesCompatability) yaml = yaml.replace(/:/g, "=")

    return YAML.parseString(yaml)
}

function toYamlFromFile(jsonFile: string, options?: FileOptions, yamlOptions?: YamlOptions) { return toYaml(JSON.parse(fs.readFileSync(jsonFile, options.encoding)), yamlOptions) }

module.exports = {
    toJson,
    toJsonFromFile,
    toYaml,
    toYamlFromFile,
    YAML,
    Encodings
}