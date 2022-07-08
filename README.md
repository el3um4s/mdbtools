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

`list tables in the specified file`

Requires: mdbtools 0.3+

- `tables({ database: "",windowsPath?: ""}):Promise<string[]>` Get the tables in an mdb file (exclude system tables)
- `tablesAll({ database: "",windowsPath?: ""}):Promise<string[]>` Get the tables in an mdb file (include system tables)
- `tablesSystem({ database: "",windowsPath?: ""}):Promise<string[]>` Get the tables in an mdb file (only system tables)

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
```

### API: mdb-queries

`List queries from an Access database`

Requires: mdbtools 0.9+

- `queries({ database: "",windowsPath?: ""}):Promise<string[]>` Get the queries in an mdb file
- `queriesSQL({ database: "",windowsPath?: ""}, query: ""):Promise<string>` Get the query SQL string

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
```

### API: mdb-sql

`A simple SQL engine`

Requires: mdbtools 0.3+

- `sql({ database: "",windowsPath?: "", query: ""}):Promise<Record<string, unknown>[]>` Get a SQL Query result

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
```

### API: mdb-schema

`Generate schema creation DDL`

Requires: mdbtools 0.1+

TO DO

### Acknowledgments

Sample database used for tests and examples is from [mdb](https://github.com/maxogden/node-mdb).

To create this package I was inspired by:

- [mdbtools/mdbtools](https://github.com/mdbtools/mdbtools)
- [maxogden/node-mdb](https://github.com/maxogden/node-mdb)
- [1withforce/node_mdb_parse](https://github.com/maxogden/node-mdb)
- [lsgunth/mdbtools-win](https://github.com/lsgunth/mdbtools-win)
- [nuintun/node-adodb](https://github.com/nuintun/node-adodb) (I forked this in [el3um4s/node-adodb](https://github.com/el3um4s/node-adodb))
