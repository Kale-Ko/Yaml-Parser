var fs = require("fs");
var Yaml = /** @class */ (function () {
    function Yaml(string) {
        this.string = string;
    }
    Yaml.prototype.toString = function () { return this.string; };
    Yaml.prototype.toJson = function () { return toJson(this.string); };
    return Yaml;
}());
var Json = /** @class */ (function () {
    function Json(json) {
        this.json = json;
    }
    Json.prototype.toString = function () { return this.json.toString(); };
    Json.prototype.toYaml = function () { return toYaml(this.json); };
    Json.prototype.parse = function (text, reviver) { return JSON.parse(text, reviver); };
    Json.prototype.stringify = function (value, replacer, space) { return JSON.stringify(value, replacer, space); };
    return Json;
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
function toJson(yaml) {
    throw new Error("toJson is not currently working");
    /*var json = {}

    function parse(yaml: string, indent: string) {

    }
    parse(yaml, "")

    return new Json(json)*/
}
function toJsonFromFile(yamlFile, options) { return toJson(fs.readFileSync(yamlFile, options.encoding)); }
function toYaml(json) {
    if (json instanceof Array)
        throw new Error("You currently can't input json arrays unless they are a subvalue");
    var yaml = "";
    function parse(json, indent) {
        Object.keys(json).forEach(function (key) {
            var value = json[key];
            if (typeof value == "string")
                yaml += indent + key + ": " + value + "\n";
            else if (value instanceof Array) {
                yaml += indent + key + ":\n";
                value.forEach(function (value) {
                    if (typeof value == "string")
                        yaml += indent + "  - " + value + "\n";
                    else if (value instanceof Array)
                        console.warn("Arrays in arrays don't work");
                    else if (value instanceof Object)
                        console.warn("Objects in arrays don't work");
                });
            }
            else if (value instanceof Object) {
                yaml += indent + key + ":\n";
                parse(value, indent + "  ");
            }
        });
    }
    parse(json, "");
    return new Yaml(yaml);
}
function toYamlFromFile(jsonFile, options) { return toYaml(JSON.parse(fs.readFileSync(jsonFile, options.encoding))); }
module.exports = {
    toJson: toJson,
    toJsonFromFile: toJsonFromFile,
    toYaml: toYaml,
    toYamlFromFile: toYamlFromFile,
    Yaml: Yaml,
    Json: Json,
    FileOptions: FileOptions,
    Encoding: Encoding
};
