const crossfilter = require("crossfilter2");
const fs = require("fs");
const $ = require("jquery");
const popperJs = require("popper.js");
const bootstrap = require("bootstrap");
const dc = require("dc");
const d3 = require("d3");


require("datatables.net-bs4")(window, $);
require("datatables.net-scroller-bs4")(window, $);
require("datatables.net-select-bs4")(window, $);
require("datatables.net-responsive-bs4")(window, $);
require("datatables.net-buttons")(window, $);
require("datatables.net-buttons-bs4")(window, $);
require("datatables.net-buttons/js/buttons.print")(window, $);
require("datatables.net-buttons/js/buttons.html5")(window, $);
require("../node_modules/jszip/dist/jszip.js")(window, $);
require("../node_modules/pdfmake/build/pdfmake.js");
require("../node_modules/pdfmake/build/vfs_fonts.js");

global.d3 = d3;
global.$ = $;
global.dc = dc;

describe("Bootstrap table tests", () => {
    const csvPath = "./examples/examples.csv";
    let chart;

    require("../build/dc-tableview-bs.js");

    beforeAll(async () => {
        document.body.innerHTML =
            '<!doctype html>' +
            '<html lang="en">' +
                '<div>' +
                '  <div id="output"></div>' +
                '  <div id="container1"></div>' +
                '  <div id="container2"></div>' +
                '  <div id="container3"></div>' +
                '</div>' +
            '</html>';
        const experiments = d3.csvParse(fs.readFileSync(csvPath, {encoding: "utf8"}));
        const ndx = crossfilter(experiments);
        const fmt = d3.format("02d");
        const runDimension = ndx.dimension(function(d) {return fmt(+d.Expt);});
        const group = runDimension.group();

        const runDimension2 = ndx.dimension(function(d) {return fmt(+d.Expt);});
        const group2 = runDimension2.group();

        chart = dc.tableview("#container1", "group1");
        const chart2 = dc.rowChart("#container2", "group1");
        const chart3 = dc.pieChart("#container3", "group1");

        chart
            .dimension(runDimension)
            .group(group)
            .columns([
                { title: "Experiment", data: "Expt" },
                { title: "Run", data: "Run" },
                { title: "Speed", data: "Speed" },
            ])
            .enableColumnReordering(true)
            .enablePagingSizeChange(true)
            .enableSearch(true)
            .rowId("Expt")
            .showGroups(true)
            .groupBy("Expt")
            .fixedHeader(true)
            .buttons(["pdf", "csv", "excel", "print"])
            .sortBy([["Expt", "desc"]])
            .listeners({
                rowClicked: function (row, data, index) {
                    const output = document.querySelector("#output");
                    output.innerHTML = "<b>Row " + index + " clicked:</b> " + JSON.stringify(data);
                },
                rowDblClicked: function (row, data, index) {
                    const output = document.querySelector("#output");
                    output.innerHTML = "<b>Row " + index + " double clicked:</b> " + JSON.stringify(data);
                },
                rowEnter: function (row, data, index) {
                    row.style.backgroundColor = "#eff9ff";
                },
                rowLeave: function (row, data, index) {
                    row.style.backgroundColor = "";
                }
            });

        chart2.dimension(runDimension)
            .group(group);

        chart3.dimension(runDimension2)
            .group(group2);

            chart.render();
        chart2.render();
        chart3.render();
    });

    test("it renders correctly", () => {
        const html = document.body.innerHTML;
        const requiredElements = [
            "DataTables_Table_0_wrapper",
            "buttons-pdf",
            "buttons-csv",
            "buttons-print",
            "dataTables_filter",
            "dataTables_info",
            "dataTables_length",
            "select",
            "DataTables_Table_0_length",
            "dataTables_paginate",
            '<th class="sorting_',
            "even dc-table-row",
            "odd dc-table-row",
        ];
        const regexString = requiredElements.reduce((prev, current) => {
            return prev + `(?=.*${current})`
        }, "^");
        const regex = new RegExp(regexString, "gm");

        expect(html).toMatch(regex);
    });

    test("search filter works", async () => {
        chart.filter("test");
        expect( chart.dimension().top(10).length).toBe(0);

        chart.filterAll();
        expect(chart.dimension().top(10).length).toBe(10);
    });

    test("row mouse events work", async () => {
        expect(document.querySelector(".alert-success")).toBeNull();

        const row = document.querySelector("table.dataTable tr");
        row.click();
    });

    afterAll(() => {

    });
});