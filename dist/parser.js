/**
    @license
    MIT License
    Copyright (c) 2021 Kale Ko
    See https://kaleko.ga/license.txt
*/
var fs = require("fs");
var detectIndent = require('detect-indent');
var Json = (function () {
    function Json(json) {
        if (json instanceof Json)
            this.json = json.json;
        else
            this.json = json;
    }
    Json.prototype.toString = function () { return JSON.stringify(this.json); };
    Json.prototype.toNormal = function () { return this.json; };
    Json.prototype.toYaml = function () { return YAML.parse(this.json); };
    return Json;
}());
var Yaml = (function () {
    function Yaml(string) {
        this.string = string;
    }
    Yaml.prototype.toString = function () { return YAML.stringify(this); };
    Yaml.prototype.toJson = function () { return YAML.jsonify(this); };
    return Yaml;
}());
var YAML = (function () {
    function YAML() {
    }
    YAML.parse = function (json) { if (json instanceof Json)
        return toYaml(json.json);
    else
        return toYaml(json); };
    YAML.parseString = function (yaml) { return new Yaml(yaml); };
    YAML.stringify = function (yaml) { return yaml.string; };
    YAML.jsonify = function (yaml) { return toJson(YAML.stringify(yaml)); };
    return YAML;
}());
var YamlOptions = (function () {
    function YamlOptions() {
    }
    return YamlOptions;
}());
var FileOptions = (function () {
    function FileOptions() {
    }
    return FileOptions;
}());
var Encodings;
(function (Encodings) {
    Encodings["us_ascii"] = "us-ascii";
    Encodings["utf8"] = "utf8";
    Encodings["ebcdic"] = "ebcdic";
    Encodings["utf16"] = "utf16";
    Encodings["utf32"] = "utf32";
})(Encodings || (Encodings = {}));
var YamlTypes;
(function (YamlTypes) {
    YamlTypes["String"] = "String";
    YamlTypes["Object"] = "Object";
    YamlTypes["Array"] = "Array";
    YamlTypes["ArrayValue"] = "ArrayValue";
})(YamlTypes || (YamlTypes = {}));
function toJson(yaml) {
    var json = {};
    var fileIndent = detectIndent(yaml).amount;
    var lines = yaml.replace(/\r/ig, "").split("\n");
    lines.forEach(function (line) {
        var key = lines.indexOf(line);
        var indent = detectIndent(lines[key]).amount;
        lines[key] = line.replace(/ /ig, "");
        var split = lines[key].split(":");
        lines[key] = {};
        if (split[0].startsWith("-")) {
            lines[key].type = YamlTypes.ArrayValue;
            lines[key].value = split[0];
            lines[key].indent = indent;
        }
        else if (split[1] == "") {
            lines[key].type = YamlTypes.Object;
            lines[key].key = split[0];
            lines[key].indent = indent;
        }
        else {
            lines[key].type = YamlTypes.String;
            lines[key].key = split[0];
            lines[key].value = split[1];
            lines[key].indent = indent;
        }
    });
    if (lines[lines.length - 1].key == "")
        lines.pop();
    lines.forEach(function (line) { if (line.type == YamlTypes.Object && lines[lines.indexOf(line) + 1].type == YamlTypes.ArrayValue)
        lines[lines.indexOf(line)].type = YamlTypes.Array; });
    lines.forEach(function (line) {
        function parse(line, parent) {
            if (line.type == YamlTypes.String)
                parent[line.key] = line.value;
            else if (line.type == YamlTypes.Object) {
                parent[line.key] = {};
                var started = false;
                var theLine = line;
                lines.forEach(function (line) {
                    if (line.key == theLine.key) {
                        started = true;
                        return;
                    }
                    if (line.indent == theLine.indent) {
                        started = false;
                    }
                    if (!started || line.indent != theLine.indent + fileIndent)
                        return;
                    parse(line, parent[theLine.key]);
                });
            }
            else if (line.type == YamlTypes.Array) {
                parent[line.key] = [];
                var started2 = false;
                var theLine2 = line;
                lines.forEach(function (line) {
                    if (line.key == theLine2.key) {
                        started2 = true;
                        return;
                    }
                    if (!started2)
                        return;
                    if (line.type == YamlTypes.ArrayValue) {
                        if (line.indent - 2 == theLine2.indent)
                            parent[theLine2.key].push(line.value.replace("-", ""));
                    }
                    else
                        started2 = false;
                });
            }
        }
        if (line.indent == 0)
            parse(line, json);
    });
    return new Json(JSON.parse(JSON.stringify(json)));
}
function toJsonFromFile(yamlFile, options) { return toJson(fs.readFileSync(yamlFile, options.encoding)); }
function toYaml(json, options) {
    if (json instanceof Array)
        throw new Error("You can't input json arrays unless they are a subvalue");
    var yaml = "";
    var indentT = "  ";
    if (options != null) {
        indentT = "";
        for (var index = 0; index < (options.indentAmount || 2); index++)
            indentT += " ";
    }
    var propertiesCompatability = false;
    if (options != null) {
        if (options.propertiesCompatability)
            propertiesCompatability = true;
    }
    function parse(json, indent) {
        if (!propertiesCompatability) {
            Object.keys(json).forEach(function (key) {
                var value = json[key];
                if (typeof value == "string")
                    yaml += indent + key + ": " + value + "\n";
                else if (value instanceof Array) {
                    yaml += indent + key + ":\n";
                    value.forEach(function (value) {
                        if (typeof value == "string")
                            yaml += indent + indentT + "- " + value + "\n";
                        else if (value instanceof Array)
                            console.warn("Arrays in arrays don't work");
                        else if (value instanceof Object)
                            console.warn("Objects in arrays don't work");
                    });
                }
                else if (value instanceof Object) {
                    yaml += indent + key + ":\n";
                    parse(value, indent + indentT);
                }
            });
        }
        else {
            Object.keys(json).forEach(function (key) {
                var value = json[key];
                if (typeof value == "string")
                    yaml += indent + key + ": " + value + "\n";
                else if (value instanceof Array || value instanceof Object)
                    console.warn("Arrays and Objects are disabled because properties compatability is enabled");
            });
        }
    }
    parse(json, "");
    if (propertiesCompatability)
        yaml = yaml.replace(/:/g, "=");
    return YAML.parseString(yaml);
}
function toYamlFromFile(jsonFile, options, yamlOptions) { return toYaml(JSON.parse(fs.readFileSync(jsonFile, options.encoding)), yamlOptions); }
module.exports = {
    toJson: toJson,
    toJsonFromFile: toJsonFromFile,
    toYaml: toYaml,
    toYamlFromFile: toYamlFromFile,
    YAML: YAML,
    Encodings: Encodings
};
