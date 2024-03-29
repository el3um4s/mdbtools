# Node MdbTools

[mdbtools](https://github.com/mdbtools/mdbtools) for Node to use MS Access database.

These aren't native bindings, they just talk to stdin/stdout/stderr of mdbtools.

NPM link: [@el3um4s/mdbtools](https://www.npmjs.com/package/@el3um4s/mdbtools)

### Installation

```
npm install @el3um4s/mdbtools
```

### Requirements

This package requires [mdbtools](https://github.com/mdbtools/mdbtools) installed on the host system.

**Windows**

Download and unzip [mdbtools-win](utils/mdbtools-win.zip) (Based on [mdbtools-win](https://github.com/lsgunth/mdbtools-win)).

**Debian**

```
apt install mdbtools
```

**MacOS**

```
brew install mdbtools
```

This package is not meant for macOS. It may be that it works like it doesn't.

### Usage

```ts
import { versionMdbTools } from "@el3um4s/mdbtools";

// in Windows
const windowsPath = "./mdbtools-win";
const versionW = await versionMdbTools(windowsPath);

console.log(versionW);
// mdbtools v1.0.0

// in Linux (Debian)
const versionL = await versionMdbTools();

console.log(versionL);
// mdbtools v0.7.1
```

### API: mdb-ver

`display the version of the specified file`

Requires: mdbtools 0.4+

- `version({ database: "",windowsPath?: ""}):Promise<string>` Get the version (JET 3 or 4) of an mdb file
- `versionMdbTools(windowsPath?: string): Promise<string>` Get mdbtools version

Examples:

```ts
const windowsPath = "./mdbtools-win";
const database = "./src/__tests__/fruit.mdb";
const v = await version({ database, windowsPath });
console.log(v);
// JET4
```

### API: mdb-tables

`List tables in the specified file`

Requires: mdbtools 0.3+

- `tables({ database: "",windowsPath?: ""}):Promise<string[]>` Get the tables in an mdb file (exclude system tables)
- `tablesAll({ database: "",windowsPath?: ""}):Promise<string[]>` Get the tables in an mdb file (include system tables)
- `tablesSystem({ database: "",windowsPath?: ""}):Promise<string[]>` Get the tables in an mdb file (only system tables)
- `tablesToFile({ database: "",windowsPath?: "", file: string}):Promise<boolean>` Save the list of tables in a file (exclude system tables)
- `tablesAllToFile({ database: "",windowsPath?: "", file: string}):Promise<boolean>` Save the list of tables in a file (include system tables)

Examples:

```ts
const windowsPath = "./mdbtools-win";
const database = "./src/__tests__/fruit.mdb";

const list = await tables({ database, windowsPath });
console.log(list);
// [ "Fruit", "Fruit Salad", "Veggie Salad", "Muffin/Bread", "Dried"]

const listSystem = await tablesSystem({ database });
console.log(listSystem);
// [ "MSysObjects", "MSysACEs", "MSysQueries", "MSysRelationships", "MSysAccessObjects", "MSysNavPaneGroupCategories", "MSysNavPaneGroups", "MSysNavPaneGroupToObjects", "MSysNavPaneObjectIDs", "MSysAccessXML", "MSysNameMap" ]

const file = "./src/__tests__/__to_file__/tables-fruit.txt";
const t = await tablesToFile({ database, windowsPath, file });
console.log(t);
// true

const fileWithSystem =
  "./src/__tests__/__to_file__/tables-fruit-with-system-tables.txt";
const ts = await tablesAllToFile({
  database,
  windowsPath,
  file: fileWithSystem,
});
console.log(ts);
// true
```

### API: mdb-queries

`List queries from an Access database`

_The currently implemented SQL subset is quite small, supporting only single table queries, no aggregates, and limited support for WHERE clauses._

Requires: mdbtools 0.9+

- `queries({ database: "",windowsPath?: ""}):Promise<string[]>` Get the queries in an mdb file
- `queriesSQL({ database: "",windowsPath?: "", query: ""}):Promise<string>` Get the query SQL string
- `queriesToFile({ database: "",windowsPath?: "", file: string}):Promise<boolean>` Save the list of queries in a file
- `queriesSQLToFile({ database: "",windowsPath?: "", query: "", file: string}):Promise<boolean>` Save the query SQL string in a file

Examples:

```ts
const windowsPath = "./mdbtools-win";
const database = "./src/__tests__/test.mdb";

const listQueries = await queries({ database, windowsPath });
console.log(listQueries);
// [ "UserA", "MainColors", "ChangeValueDogTo40", "ChangeValueDotTo4", "AddApple", "DeleteApple", "aàeèéiìoòuù"]

const s = await queriesSQL({ database, windowsPath, query: "UserA" });
console.log(s);
// SELECT Users.* FROM [Users] WHERE (((Users.UserCategory)="A"))

const file = "./src/__tests__/__to_file__/test-queries.txt";
const t = await queriesToFile({ database, windowsPath, file });
console.log(t);
// true

const query = "UserA";
const fileQuery = "./src/__tests__/__to_file__/test-queries-usera.txt";
const tq = await queriesSQLToFile({
  database,
  windowsPath,
  query,
  file: fileQuery,
});
console.log(tq);
// true
```

### API: mdb-sql

`A simple SQL engine`

_The currently implemented SQL subset is quite small, supporting only single table queries, no aggregates, and limited support for WHERE clauses._

Requires: mdbtools 0.3+

- `sqlAsString({ database: "",windowsPath?: "", query: ""}):Promise<string>[]>` Get a SQL Query result (like a string)
- `sql({ database: "",windowsPath?: "", query: ""}):Promise<Record<string, unknown>[]>` Get a SQL Query result (like a JSON array)
- `sqlToFile({ database: "",windowsPath?: "", query: "", file: ""}):Promise<boolean>` Save a SQL Query result in a file
- `sqlFromFile({ database: "",windowsPath?: "", inputFile: ""}):Promise<Record<string, unknown>[]>` Get a SQL Query from a file and return the result (like a JSON array)
- `sqlFromFileAsString({ database: "",windowsPath?: "", inputFile: ""}):Promise<string>` Get a SQL Query from a file and return the result (like a string)
- `sqlFromFileToFile({ database: "",windowsPath?: "", inputFile:"", file: ""}):Promise<boolean>` Get a SQL Query from a file and save the result in a file

Examples:

```ts
const windowsPath = "./mdbtools-win";
const database = "./src/__tests__/test.mdb";
const s = "SELECT * FROM Colors WHERE Value > 10;";

const result = await sql({ database, windowsPath, sql: s });
console.log(result);
// [
//     {
//       Colors: "Blue",
//       Value: "16",
//     },
//     {
//       Colors: "Yellow",
//       Value: "12",
//     },
// ]

const resultAsString = await sqlAsString({ database, windowsPath, sql: s });
console.log(resultAsString);
// Colors      Value
// Blue        16
// Yellow      12

const file = "./src/__tests__/__to_file__/sql result to file.csv";
const q = await sqlToFile({ database, windowsPath, sql: s, file });
console.log(q);
// true

const inputFile = "./src/__tests__/__to_file__/select colors.sql";
const f = await sqlFromFile({ database, windowsPath, inputFile });
console.log(f);
// [
//     {
//       Colors: "Blue",
//       Value: "16",
//     },
//     {
//       Colors: "Yellow",
//       Value: "12",
//     },
// ]

const fileResult = "./src/__tests__/__to_file__/sql from file to file.csv";
const rf = await sqlFromFileToFile({
  database,
  windowsPath,
  inputFile,
  file: fileResult,
});
console.log(rf);
// true
```

### API: mdb-count

`Count rows in a table`

Requires: mdbtools 0.9+

- `count({ database: "",windowsPath?: "", table: ""}):Promise<number>` Get the number of rows in a table

Examples:

```ts
const windowsPath = "./mdbtools-win";
const database = "./src/__tests__/test.mdb";
const table = "Colors";

const c = await count({ database, windowsPath, table });
console.log(c);
// 7
```

### API: mdb-json

`Export a table to a JSON array`

Requires: mdbtools 0.9+

- `tableToJson({ database: "",windowsPath?: "", table: ""}):Promise<Record<string, unknown>[]>` Export a table to a JSON array

Examples:

```ts
const windowsPath = "./mdbtools-win";
const database = "./src/__tests__/test.mdb";
const table = "Colors";

const result = await tableToJson({ database, windowsPath, table });
console.log(result);
// [
//     { Colors: "Red", Value: 10 },
//     { Colors: "Green", Value: 5 },
//     { Colors: "Blue", Value: 16 },
//     { Colors: "Black", Value: 1 },
//     { Colors: "Yellow", Value: 12 },
//     { Colors: "White", Value: 10 },
//     { Colors: "Others", Value: 0 },
// ]
```

### API: mdb-export

`Export a table to a CSV string`

Requires: mdbtools 0.1+

- `tableToCSV({ database: "",windowsPath?: "", table: ""}):Promise<string>` Export a table to a CSV string
- `tableToCSVFile({ database: "",windowsPath?: "", table: "", file: "", options:""}):Promise<boolean>` Export a table to a CSV file

Examples:

```ts
const windowsPath = "./mdbtools-win";
const database = "./src/__tests__/test.mdb";
const table = "Colors";

const result = await tableToCSV({ database, windowsPath, table });
console.log(result);
// Colors,Value
// "Red",10
// "Green",5
// "Blue",16
// "Black",1
// "Yellow",12
// "White",10
// "Others",0

const file = "./src/__tests__/__to_file__/test-export-colors.csv";
const options = "-d; -Q";
const t = await tableToCSVFile({
  database,
  windowsPath,
  table,
  file,
  options,
});
console.log(t);
// true
```

Options:

| short | long                  | description                                                                   |
| ----- | --------------------- | ----------------------------------------------------------------------------- |
| -H    | --no-header           | Suppress header row.                                                          |
| -d    | --delimiter=char      | Specify an alternative column delimiter. Default is comma.                    |
| -R    | --row-delimiter=char  | Specify a row delimiter                                                       |
| -Q    | --no-quote            | Don't wrap text-like fields in quotes.                                        |
| -q    | --quote=char          | Use `<char>` to wrap text-like fields. Default is double quote.               |
| -X    | --escape=format       | Use `<char>` to escape quoted characters within a field. Default is doubling. |
| -I    | --insert=backend      | INSERT statements (instead of CSV)                                            |
| -N    | --namespace=namespace | Prefix identifiers with namespace                                             |
| -0    | --null=char           | Use `<char>` to represent a NULL value                                        |
| -B    | --boolean-words       | Use TRUE/FALSE in Boolean fields (default is 0/1)                             |

### API: mdb-schema

`Generate DDL for the tables`

Requires: mdbtools 0.1+

- `schema({ database: "",windowsPath?: "", table: ""}):Promise<string>` Generate DLL schema for all tables
- `schemaTable({ database: "",windowsPath?: "", table: ""}):Promise<string>` Generate schema only for a table
- `schemaToFile({ database: "",windowsPath?: "", table: "", file: ""}):Promise<boolean>` Export DLL schema for all tables to file
- `schemaTableToFile({ database: "",windowsPath?: "", table: "", file: ""}):Promise<boolean>` Export DLL schema only for a table to file

Examples:

```ts
const windowsPath = "./mdbtools-win";
const database = "./src/__tests__/test.mdb";
const s = await schema({ database, windowsPath });

const table = "Colors";
const schemaT = await schemaTable({ database, windowsPath, table });
console.log(schemaT);
// CREATE TABLE [Colors]
//  (
//     [Colors]           Text (50),
//     [Value]            Long Integer
// );
```

### API: utilities-columnsName

`Get the columns name of a table`

Requires: mdbtools 0.3+

- `columnsName({ database: "",windowsPath?: "", table: ""}):Promise<string[]>` Get the columns name of a table
- `columnsNameTables({ database: "",windowsPath?: ""}):Promise<Record<string, string[]>>` Get the columns name of all tables

Examples:

```ts
const windowsPath = "./mdbtools-win";
const database = "./src/__tests__/test.mdb";
const table = "Colors";

const columns = await columnsName({ database, windowsPath, table });
console.log(columns);
// [ "Colors", "Value" ]

const allColumns = await columnsNameTables({ database, windowsPath });
console.log(allColumns);
// {
//   Users: [
//     "UserID",
//     "UserName",
//     "UserSex",
//     "UserBirthday",
//     "UserTelephone",
//     "UserValue",
//     "UserCategory",
//   ],
//   Colors: ["Colors", "Value"],
//   Dictionary: ["Number", "Word"],
//   "Colors Table Two": ["Colors", "Value"],
// }
```

### Known Issues

In some Windows and Linux configurations it is not possible to read queries and tables with accented characters or symbols such as `°` or `µ`.

### Acknowledgments

Sample database used for tests and examples is from [mdb](https://github.com/maxogden/node-mdb).

To create this package I was inspired by:

- [mdbtools/mdbtools](https://github.com/mdbtools/mdbtools)
- [maxogden/node-mdb](https://github.com/maxogden/node-mdb)
- [1withforce/node_mdb_parse](https://github.com/maxogden/node-mdb)
- [lsgunth/mdbtools-win](https://github.com/lsgunth/mdbtools-win)
- [nuintun/node-adodb](https://github.com/nuintun/node-adodb) (I forked this in [el3um4s/node-adodb](https://github.com/el3um4s/node-adodb))
