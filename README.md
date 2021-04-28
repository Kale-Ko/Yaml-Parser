# YAML Parser

YAML Parser is a simple way to turn a json into a yaml file and a yaml into a json file.

Simple Jsons also work with .properties files



# Setup

To setup simply type `npm install simple-yaml-parser --save` in a console

Then in your script add `const yamlParser = require("simple-yaml-parser")`



# YML to Json
### ***Currently not working***
\
`yamlParser.toJson(yamlString)` - Takes a yaml string and returns a json

\
`yamlParser.toJsonFromFile(fileName, options)` - Takes a yaml file and returns a json

### Options:
encoding - A valid file encoding type `"us-ascii", "utf8", "utf-8", "ebcdic", "utf16", "utf-16", "utf32", "utf-32"`

### Feature Support
None



# Json to YAML

`yamlParser.toYaml(json)` - Takes a json and returns a yaml object

### Options:
propertiesCompatability - A boolean - Wether or not to enable compatability with .properties files

\
`yamlParser.toYamlFromFile(fileName, options)` - Takes a json file and returns a yaml object

### Options:
encoding - A valid file encoding type `"us-ascii", "utf8", "utf-8", "ebcdic", "utf16", "utf-16", "utf32", "utf-32"`

### Feature Support
Strings,
Objects,
Arrays,
Strings in Objects
Arrays in Objects
Objects in Objects



# Yaml Object

`Yaml.toString()` - Turns a Yaml object into a string

\
`Yaml.toJson()` - Turns a Yaml object into a Json object



# Json Object

Default Json functions

\
`Json.toString()` - Turns the Json object into a string

\
`Json.toYaml()` - Turns the Json object into a Yaml object