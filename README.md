# jpath

CLI command to query JSON documents using [jsonpath](http://goessner.net/articles/JsonPath) (xpath for JSON).

## Install

Using npm:

```bash
npm install --global cGuille/jpath
```

## Usage

### Query a JSON file

```bash
# Using the -f option:
jpath -f document.json [jsonpath query]

# Using standard input redirection:
jpath [jsonpath query] < document.json
```

### Query a JSON document from another command

```bash
command-writing-json-to-stdout |jpath [jsonpath query]
```

## Example

```bash
echo '[ { "name": "John Doe", "age": 53 }, { "text": "dummy" }]' |jpath '$..name'
#-> [ 'John Doe' ]
```
