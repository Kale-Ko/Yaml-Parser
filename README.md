# YAML Parser

YAML Parser is a simple way to turn a json into a yaml file and a yaml into a json file.

It also works with .properties files



# Setup

To setup simply type `npm install yaml-parser --save`

Then in your script add `const yamlParser = require("yaml-parser")`



# YML to Json

`yamlParser.toJson(yamlString)` - Takes a yaml string and returns a json

\
`yamlParser.toJsonFromFile(fileName, options)` - Takes a yaml file and returns a json

### Options:
encoding: A valid file encoding type `"us-ascii", "utf8", "utf-8", "ebcdic", "utf16", "utf-16", "utf32", "utf-32"`

### Feature Support
None



# Json to YAML

`yamlParser.toYaml(json)` - Takes a json and returns a yaml string

\
`yamlParser.toYamlFromFile(fileName, options)` - Takes a json file and returns a yaml string

### Options:
encoding: A valid file encoding type `"us-ascii", "utf8", "utf-8", "ebcdic", "utf16", "utf-16", "utf32", "utf-32"`

### Feature Support
Strings,
Objects,
Arrays,
Sub Objects