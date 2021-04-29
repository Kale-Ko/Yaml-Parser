# Yaml Parser

Yaml Parser is a simple way to turn a json into a yaml file and vice versa

Simple Jsons also work with .properties files



# Setup

To setup simply type `npm install simple-yaml-parser --save` in a console

Then in your script add `const yamlParser = require("simple-yaml-parser")`



# Yaml to Json

### ***Currently not working*** - It is much harder to code :D. I am working on it

`yamlParser.toJson(yamlString, options)` - Takes a yaml string and returns a json

\
`yamlParser.toJsonFromFile(fileName, fileOptions, options)` - Takes a yaml file and returns a json

### Options:
indentAmount - A Number - How many spaces to use for an indent

### File Options:
encoding - A valid file encoding type `"us-ascii", "utf8", "utf-8", "ebcdic", "utf16", "utf-16", "utf32", "utf-32"`

## Feature Support
None



# Json to Yaml

`yamlParser.toYaml(json, options)` - Takes a json and returns a yaml object

\
`yamlParser.toYamlFromFile(fileName, fileOptions, options)` - Takes a json file and returns a yaml object

### Options:
indentAmount - A Number - How many spaces to use for an indent
propertiesCompatability - A boolean - Wether or not to enable compatability with .properties files

### File Options:
encoding - A valid file encoding type `"us-ascii", "utf8", "utf-8", "ebcdic", "utf16", "utf-16", "utf32", "utf-32"`

## Feature Support
Strings,
Objects,
Arrays,
Strings in Objects
Arrays in Objects
Objects in Objects
Propertie files



# Json Object

\
`Json.toString()` - Turns a Json object into a string

\
`Json.toJson()` - Turns a Json object into a normal JSON

\
`Json.toYaml()` - Turns a Json object into a Yaml object



# Yaml Object

`Yaml.toString()` - Turns a Yaml object into a string

\
`Yaml.toJson()` - Turns a Yaml object into a Json object



# YAML Object

Static

`YAML.parse(json)` - Takes a Json object and returns a Yaml

\
`YAML.stringify(yaml)` - Takes a Yaml object and returns a string

\
`YAML.jsonify(yaml)` - Takes a Yaml object and returns a Json