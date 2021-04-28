var fs = require("fs");
module.exports = {
    toJson: toJson,
    toJsonFromFile: toJsonFromFile,
    toYml: toYml,
    toYmlFromFile: toYmlFromFile
};
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
function toJson(yml) {
    throw new Error("toJson is not currently working");
    /*var json = {}

    function parse(yml: string, indent: string) {

    }
    parse(yml, "")

    return json*/
}
function toJsonFromFile(ymlFile, options) { return toJson(fs.readFileSync(ymlFile, options.encoding)); }
function toYml(json) {
    if (json instanceof Array)
        throw new Error("You currently can't input json arrays unless they are a subvalue");
    var yml = "";
    function parse(json, indent) {
        Object.keys(json).forEach(function (key) {
            var value = json[key];
            if (typeof value == "string")
                yml += indent + key + ": " + value + "\n";
            else if (value instanceof Array) {
                yml += indent + key + ":\n";
                value.forEach(function (value) {
                    if (typeof value == "string")
                        yml += indent + "  - " + value + "\n";
                    else if (value instanceof Array)
                        console.warn("Arrays in arrays don't work");
                    else if (value instanceof Object)
                        console.warn("Objects in arrays don't work");
                });
            }
            else if (value instanceof Object) {
                yml += indent + key + ":\n";
                parse(value, indent + "  ");
            }
        });
    }
    parse(json, "");
    return yml;
}
function toYmlFromFile(jsonFile, options) { return toYml(JSON.parse(fs.readFileSync(jsonFile, options.encoding))); }
