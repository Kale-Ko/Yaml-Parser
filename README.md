# YML Parser

YML Parser is a simple way to turn a json into a yml file and a yml into a json file.

It also works with .properties files



# Setup

To setup simply type `npm install {package-name} --save`

Then in your script add `const ymlParser = require("{package-name}")`



# YML to Json

`ymlParser.toJson(ymlString)` - Takes a yml string and returns a json

\
`ymlParser.toJsonFromFile(fileName, options)` - Takes a yml file and returns a json

### Options:
encoding: A valid file encoding type `"us-ascii", "utf8", "utf-8", "ebcdic", "utf16", "utf-16", "utf32", "utf-32"`



# Json to YML

`ymlParser.toYml(json)` - Takes a json and returns a yml string

\
`ymlParser.toYmlFromFile(fileName, options)` - Takes a json file and returns a yml string

### Options:
encoding: A valid file encoding type `"us-ascii", "utf8", "utf-8", "ebcdic", "utf16", "utf-16", "utf32", "utf-32"`

### Feature Support
Strings,
Arrays