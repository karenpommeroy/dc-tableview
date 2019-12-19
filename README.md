# dc-tableview
`dc-tableview` is an interactive chart for dc.js library that presents data in tableview form.
It was created because I was missing some functionality in the original table that comes with dc. I designed it so that it can easily replace dc.dataTable in your projects.
It is build on top of well known **[DataTables](https://github.com/DataTables/Dist-DataTables)** jQuery plugin.


## Table of contents

- [Screenshots](#screenshots)
- [Quick start](#quick-start)
- [Testing](#testing)
- [Usage](#usage)
- [Methods](#methods)
- [Examples](#examples)
- [Copyright and license](#copyright-and-license)

## Screenshots

![Bootstrap 4 styled version](https://rawgit.com/karenpommeroy/dc-tableview/master/assets/screen_1.png)

## Quick start
Several quick start options are available:
##### Download the latest build

###### Development, unminified code
 * **[dc-tableview.js](https://raw.githubusercontent.com/karenpommeroy/dc-tableview/master/build/dc-tableview.js)** - full version including all features
 * **[dc-tableview-light.js](https://raw.githubusercontent.com/karenpommeroy/dc-tableview/master/build/dc-tableview-light.js)** - lightweight version (does not include buttons and column reorder functionality).
 * **[dc-tableview-bs.js](https://raw.githubusercontent.com/karenpommeroy/dc-tableview/master/build/dc-tableview-bs.js)** - version for use with bootstrap
 * **[dc-tableview-light-bs.js](https://raw.githubusercontent.com/karenpommeroy/dc-tableview/master/build/dc-tableview-light-bs.js)** - lightweight version of the above


###### Production, minified code
 * **[dc-tableview.min.js](https://raw.githubusercontent.com/karenpommeroy/dc-tableview/master/build/dc-tableview.min.js)**
 * **[dc-tableview-light.min.js](https://raw.githubusercontent.com/karenpommeroy/dc-tableview/master/build/dc-tableview-light.min.js)**
 * **[dc-tableview-bs.min.js](https://raw.githubusercontent.com/karenpommeroy/dc-tableview/master/build/dc-tableview.min.js)**
 * **[dc-tableview-light-bs.min.js](https://raw.githubusercontent.com/karenpommeroy/dc-tableview/master/build/dc-tableview-light.min.js)**


##### Install from Yarn
```bash
yarn install dc-tableview --save
```

##### Install from Npm
```bash
npm install dc-tableview --save
```

##### Using Git repository

To clone the repository, use

`git clone https://github.com/karenpommeroy/dc-tableview.git`

##### Build sources
```bash
npm build (or yarn build)
```
or to create production ready, minified versions:
```bash
npm package (or yarn package)
```

Done!

## Testing
Some basic integrity tests are implemented using jest.
```bash
npm test
```
```bash
npm run test-debug #(verbose mode with in-browser source debugging)
```
Test results are printed to terminal by default but you can modify jest.config.js file to change that

## Usage

This library is created as an UMD module which means you can use it as an AMD or CommonJS module as well as a standalone library.

##### Include as a module (require.js):

```javascript
require("dc-tableview");
dc.tableview(div, "chartGroupName");
```

##### Including files (standalone):

```xml
<script src="/path/to/dc-tableview.js"></script>
<script>
	dc.tableview.doSomething();
</script>
```

##### Dependencies:
There are couple of dependencies that are required by `dc-tableview`.
Two libraries are essential for every build: **[dc.js](https://github.com/dc-js/dc.js)** and **[jquery](https://github.com/jquery/jquery)**

**[Bootstrap.js](https://github.com/twbs/bootstrap)** is required if you are going to use bootstrap ready version.

In order to run the examples you also need to include **[d3.js](https://github.com/d3/d3)** and **[crossfilter2](https://github.com/crossfilter/crossfilter)**


#### Initialization
Initialization is performed the same as for any other chart in dc.js:
```javascript
var chart = dc.tableview(div, "chartGroupName");
```

## Methods
`dc-tableview` is written so that it can replace standard data table included in dc without any big changes in existing code.
It mixes in [dc.baseMixin](https://dc-js.github.io/dc.js/docs/html/dc.baseMixin.html) and implements all of the methods of the original [dc.dataTable](https://dc-js.github.io/dc.js/docs/html/dc.dataTable.html).

Initialization looks like this:
```javascript
var chart = dc.tableview(".chart .container", "chartGroupName");
```

##### int beginSlice(int index)
Get or set the index of the beginning slice which determines which entries get displayed by the widget. Useful when implementing pagination. See: https://dc-js.github.io/dc.js/docs/html/dc.dataTable.html#beginSlice

```javascript
var slice = chart.beginSlice();
chart.beginSlice(5);
```

##### void buttons(Array buttons)
Get or set buttons available for the chart.
```javascript
chart.buttons(["csv", "pdf", "excel", "print"])
```

##### clean()
Removes tableview from DOM.
```javascript
chart.clean();
```

##### void columns(string appId)
Gets or sets column definitions to be used. For details check out: https://datatables.net/reference/option/columns
```javascript
chart.columns([
    { title: "Experiment", data: "Expt" },
    { title: "Run", data: "Run" },
    { title: "Speed", data: "Speed" },
]);
```

##### object dataSource(object source)
Get or set dataSource to be be used for the table.
By default dataSource is obtained based on dimension however you can supply your own data independently.
See details here: https://datatables.net/manual/data/#Data-sources
```javascript
chart.dataSource({});
```

##### void dom(string content)
Get or set order of chart components. Described in details here: https://datatables.net/reference/option/dom
```javascript
chart.dom("Bftip");
```

##### bool enableAutoWidth(bool enable)
Get status or enable/disable automatic column width calculation.
```javascript
chart.enableAutoWidth(true);
```

##### bool enableColumnReordering(bool enable)
Get status or enable/disable reordering of columns.
```javascript
chart.enableColumnReordering(true);
```

##### void enableHeader((bool enable)
Get status or set whether to show or hide header row.
```javascript
chart.enableHeader(true);
```

##### bool enablePaging(bool enable)
Get status or enable/disable paging.
```javascript
chart.enablePaging(true);
```

##### bool enablePagingInfo(bool enable)
Get status or enable/disable paging info text.
```javascript
chart.enablePagingInfo(true);
```

##### bool enablePagingSizeChange(bool enable)
Get status or enable/disable paging size change combo box.
```javascript
chart.enablePagingSizeChange(true);
```

##### bool enableScrolling(bool enable)
Get status or enable/disable scrolling (instead of paging).
```javascript
chart.enableScrolling(true);
```

##### object scrollingOptions(object options)
Get or set scrolling options.
```javascript
chart.scrollingOptions({
    scrollY: string | number,
    scrollCollapse: boolean,
    deferRender: boolean
});
```

##### bool enableSearch(bool enable)
Get status or enable/disable search (filter) input.
```javascript
chart.enableSearch(true);
```

##### bool responsive(bool enable)
Get status or enable/disable responsive features.
```javascript
chart.responsive(true);
```

##### bool responsive(bool enable)
Get status or enable/disable responsive features.
```javascript
chart.responsive(true);
```

##### void endSlice(int slice)
Get or set the index of the end slice which determines which entries get displayed by the widget.
See: https://dc-js.github.io/dc.js/docs/html/dc.dataTable.html#endSlice
```javascript
tableview.endSlice();
```

##### bool fixedHeader(bool enable)
Enable or disable fixed header that will be always visible.
```javascript
chart.fixedHeader(true);
```

##### object getDataTable()
Returns underlying DataTable object for advanced manipulation.
For more info checkout DataTables repository (https://github.com/DataTables/Dist-DataTables) and documentation.
```javascript
var dt = chart.getDataTable();
```

##### string groupBy(string columnName)
Get or set column name that the grouping should be applied by.
```javascript
chart.groupBy("id");
```

##### object listeners(object listeners)
Attach event handlers to chart.
```javascript
chart.listeners({
    rowClicked: function (row, data, index) {
    },
    rowDblClicked: function (row, data, index) {
    },
    rowEnter: function (row, data, index) {
    },
    rowLeave: function (row, data, index) {
    }
});
```
##### void order(string appId)
Gets or sets default sort type used in the chart. This will be used if order is not specified using **sortBy()** function.
```javascript
chart.order("asc");
```

##### string pagingInfoText(string text)
Get or set text used by pagin info control.
You can use following placeholders here that will be replaced by actual values: _START_, _END_, _TOTAL_;
```javascript
chart.pagingInfoText("Showing _START_ - _END_ of _TOTAL_ items");
```

##### string rowId(string fieldName)
Get or set the name of the column that will be used as row id
```javascript
chart.rowId(id");
```

##### void showGroups (bool show)
Get current status or enable/disable data grouping. This must be enabled in order for **groupBy()** to work
```javascript
chart.showGroups(true);
```

##### int size(int size)
Get or set the table size which determines the number of rows displayed.
```javascript
var size = chart.size();
chart.size(25)
```

##### Array sortBy(Array sortDefinitions)
Get or set fields that data is sorted by along with sort order. Multiple sorts are allowed at the same time.
```javascript
chart.sortBy([["first", "desc"], ["second", "asc"]]);
```

#### Chaining
All of the exposed methods return `dc-tableview` object so chaining subsequent calls is possible.
An example of this would be:
```javascript
var chart = dc.tableview(".container", "name");
chart.enableHeader(false)
	.fixedHeader(true)
    .enableAutoWidth(true)
    .rowId("id") // and so on...
```

## Examples

Click one of the links below to see dc-tableview in action:

* [Customized table with default styling](https://rawgit.com/karenpommeroy/dc-tableview/master/examples/custom-table-default.html)
* [Table styled with Bootstrap 4 working with other charts](https://rawgit.com/karenpommeroy/dc-tableview/master/examples/custom-table-bootstrap.html)

All of above examples are available in the examples folder located in the repository.

## Copyright and license

Licensed under [MIT license](LICENSE).

[^ back to top](#table-of-contents)
