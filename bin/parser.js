var fs = require("fs");
var Json = /** @class */ (function () {
    function Json(json) {
        this.json = json;
    }
    Json.prototype.toString = function () { return JSON.stringify(this.json); };
    Json.prototype.toYaml = function () { return toYaml(this.json); };
    return Json;
}());
var Yaml = /** @class */ (function () {
    function Yaml(string) {
        this.string = string;
    }
    Yaml.prototype.toString = function () { return this.string; };
    Yaml.prototype.toJson = function () { return toJson(this.string); };
    return Yaml;
}());
var JsonOptions = /** @class */ (function () {
    function JsonOptions() {
    }
    return JsonOptions;
}());
var YamlOptions = /** @class */ (function () {
    function YamlOptions() {
    }
    return YamlOptions;
}());
var FileOptions = /** @class */ (function () {
    function FileOptions() {
    }
    return FileOptions;
}());
var Encoding;
(function (Encoding) {
    Encoding[Encoding["us-ascii"] = 0] = "us-ascii";
    Encoding[Encoding["utf8"] = 1] = "utf8";
    Encoding[Encoding["utf-8"] = 2] = "utf-8";
    Encoding[Encoding["ebcdic"] = 3] = "ebcdic";
    Encoding[Encoding["utf16"] = 4] = "utf16";
    Encoding[Encoding["utf-16"] = 5] = "utf-16";
    Encoding[Encoding["utf32"] = 6] = "utf32";
    Encoding[Encoding["utf-32"] = 7] = "utf-32";
})(Encoding || (Encoding = {}));
function toJson(yaml, options) {
    throw new Error("toJson is not currently working");
    /*var json = {}

    function parse(yaml: string, indent: string) {

    }
    parse(yaml, "")

    return new Json(JSON.parse(JSON.stringify(json)))*/
}
function toJsonFromFile(yamlFile, options, jsonOptions) { return toJson(fs.readFileSync(yamlFile, options.encoding), jsonOptions); }
function toYaml(json, options) {
    if (json instanceof Array)
        throw new Error("You currently can't input json arrays unless they are a subvalue");
    var yaml = "";
    var indentT = "  ";
    if (options != null) {
        indentT = "";
        for (var index = 0; index < (options.indentAmount || 2); index++)
            indentT += " ";
    }
    function parse(json, indent) {
        var propertiesCompatability = false;
        if (options != null) {
            if (options.propertiesCompatability)
                propertiesCompatability = true;
        }
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
    return new Yaml(yaml);
}
function toYamlFromFile(jsonFile, options, yamlOptions) { return toYaml(JSON.parse(fs.readFileSync(jsonFile, options.encoding)), yamlOptions); }
module.exports = {
    toJson: toJson,
    toJsonFromFile: toJsonFromFile,
    toYaml: toYaml,
    toYamlFromFile: toYamlFromFile,
    Json: Json,
    Yaml: Yaml,
    JsonOptions: JsonOptions,
    YamlOptions: YamlOptions,
    FileOptions: FileOptions,
    Encoding: Encoding
};
