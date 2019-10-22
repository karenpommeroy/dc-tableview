/**
 * Feature rich, interactive chart for dc that presents data in tableview form.
 * It was created because of poor functionality of original table which it can easily replace
* Depends on datatables (with plugins), bootstrap and jquery libaries
 *
 * Note: Unlike other charts, the dc.tableview uses the {@link dc.dataTable#group group} attribute as a
 * keying function for {@link https://github.com/d3/d3-3.x-api-reference/blob/master/Arrays.md#nest nesting} the data
 * together in groups.  Do not pass in a crossfilter group as this will not work.
*
* It is based on datatables.js library
 *
 * @dc.tableview
 * @memberof dc
 * @mixes dc.baseMixin
 * @param {String|node|d3.selection} parent - Any valid
 * {@link https://github.com/d3/d3-3.x-api-reference/blob/master/Selections.md#selecting-elements d3 single selector} specifying
 * a dom block element such as a div; or a dom element or d3 selection.
 * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
 * @returns {dc.tableview}
 */
dc.tableview = function (parent, chartGroup) {
    var _chart = dc.baseMixin({});

    var TABLE_CLASS = "dc-table table table-bordered";
    var TABLE_HEADER_CLASS = "dc-table-header";
    var TABLE_ROW_CLASS = "dc-table-row";
    var PAGINATION_CLASS = "pagination";
    var PAGINATION_BTN_CLASS = "page-link";
    var PAGINATION_INFO_TEXT = "Showing _START_ - _END_ of _TOTAL_ items";

    var _size = Infinity;
    var _columns = [];
    var _sortBy = [];
    var _order;
    var _beginSlice = 0;
    var _endSlice;
    var _showGroups = false;
    var _dataSource = [];
    var _buttons = [];
    var _groupBy = [];
    var _fixedHeader = true;
    var _enableSearch = false;
    var _enablePaging = true;
    var _enableScrolling = false;
    var _scrollingOptions = {
        scrollY: 200,
        scrollCollapse: true,
        deferRender: false,
    };
    var _enablePagingSizeChange = false;
    var _enablePagingInfo = true;
    var _enableColumnReordering = false;
    var _enableHeader = true;
    var _enableAutoWidth = true;
    var _pagingInfoText = PAGINATION_INFO_TEXT;
    var _lengthMenuContent;
    var _listeners = {};
    var _rowId;
    var _select;
    var _responsive = true;
    var _dom = "<'container-fluid'<'row'<'col-sm-6 col-md-4'B><'col-sm-6 col-md-8'f>>t<'row',<'col-sm-6 float-left'<'paging-info'i><'paging-length'l>><'col-sm-6 float-right'p>>>";

    var _parentEl = _getParentElement(parent);

    function _isDOMElement (target) {
        return target instanceof Element;
    }

    function _isString (target) {
        return typeof target === "string";
    }

    function _getParentElement (target) {
        var element;
        if (_isDOMElement(target)) {
            element = target;
        }
        else if (_isString(target)) {
            element = document.querySelector(target);
        }

        return element;
    }

    _chart._doRender = function () {
        _chart.clean();
        _chart.setDefaultStyling();

        var table = document.createElement("table");
        table.className = TABLE_CLASS;

        _parentEl.appendChild(table);

        $(table).DataTable(_chart.getTableOptions());

        return _chart;
    };


    _chart.setDefaultStyling = function () {
        $.fn.dataTable.ext.classes.sPaging += " pagination";
        $.fn.dataTable.ext.classes.sPageButton += " page-item";
        $.fn.dataTable.ext.classes.sLengthSelect = "form-control form-control-sm";
        if ($.fn.DataTable.Buttons) {
            $.fn.DataTable.Buttons.defaults.dom.button.className = "btn btn-outline-secondary";
        }
    };

    _chart.getTableOptions = function () {
        return {
            data: this.dimension().top(Infinity),
            columns: _columns,
            header: _enableHeader,
            autoWidth: _enableAutoWidth,
            paging: _enablePaging,
            info: _enablePagingInfo,
            select: _select,
            responsive: _responsive,
            scroller: _enableScrolling,
            fixedHeader: _fixedHeader,
            lengthChange: _enablePagingSizeChange,
            ordering: !!_sortBy,
            order: _chart.getOrderSettings(),
            rowId: _rowId,
            dom: _dom,
            buttons: _buttons,
            searching: _enableSearch,
            colReorder: _enableColumnReordering,
            rowGroup: _showGroups ? { dataSrc: _groupBy } : null,
            language: {
                info: _pagingInfoText ,
                lengthMenu: _lengthMenuContent
            },

            scrollY: _scrollingOptions.scrollY,
            scrollCollapse: _scrollingOptions.scrollCollapse,
            deferRender: _scrollingOptions.deferRender,

            headerCallback: function (head, data, start, end, display) {
                head.onclick = _listeners.headerClicked ? _listeners.headerClicked.bind(this, head, data, start, end, display) : null;
                head.ondblclick = _listeners.headerDblClicked ? _listeners.headerDblClicked.bind(this, head, data, start, end, display) : null;
                head.onmouseover = _listeners.headerEnter ? _listeners.headerEnter.bind(this, head, data, start, end, display) : null;
                head.onmouseout = _listeners.headerLeave ? _listeners.headerLeave.bind(this, head, data, start, end, display) : null;
            },

            rowCallback: function (row, data, index) {
                row.onclick = _listeners.rowClicked ? _listeners.rowClicked.bind(this, row, data, index) : null;
                row.ondblclick = _listeners.rowDblClicked ? _listeners.rowDblClicked.bind(this, row, data, index) : null;
                row.onmouseover = _listeners.rowEnter ? _listeners.rowEnter.bind(this, row, data, index) : null;
                row.onmouseout = _listeners.rowLeave ? _listeners.rowLeave.bind(this, row, data, index) : null;
            },
            drawCallback: function () {
                _parentEl.querySelector("thead tr").classList.add(TABLE_HEADER_CLASS);
                _parentEl.querySelectorAll("tbody tr").forEach(function(row) {
                    row.classList.add(TABLE_ROW_CLASS);
                });
                _parentEl.querySelector(".dataTables_paginate").classList.add(PAGINATION_CLASS);
                _parentEl.querySelectorAll(".dataTables_wrapper .dataTables_paginate .page-item a").forEach(function(item) {
                    item.classList.add(PAGINATION_BTN_CLASS);
                });
            }
        };
    };

    _chart.clean = function () {
        _chart.root().selectAll("*").remove();
    };

    _chart.getOrderSettings = function() {
        var sortingOptions = [];
        for (var i = 0; i < _sortBy.length; i++) {
            var index = _columns.map(function (column) { return column.data || column.title || column.name; }).indexOf(_sortBy[i][0]);
            sortingOptions.push([index, _sortBy[i][1]]);
        }
        return sortingOptions;
    };

    _chart._doRedraw = function () {
        return _chart._doRender();
    };

    /**
     * Get or set the group function for the data table. The group function takes a data row and
     * returns the key to specify to {@link https://github.com/d3/d3-3.x-api-reference/blob/master/Arrays.md#d3_nest d3.nest}
     * to split rows into groups.
     *
     * Do not pass in a crossfilter group as this will not work.
     * @method group
     * @memberof dc.tableview
     * @instance
     * @example
     * // group rows by the value of their field
     * chart
     *     .group(function(d) { return d.field; })
     * @param {Function} groupFunction Function taking a row of data and returning the nest key.
     * @returns {Function|dc.tableview}
     */

    /**
     * Get or set the table size which determines the number of rows displayed by the widget.
     * @method size
     * @memberof dc.tableview
     * @instance
     * @param {Number} [size=25]
     * @returns {Number|dc.tableview}
     */
    _chart.size = function (size) {
        if (!arguments.length) {
            return _size;
        }
        _size = size;

        return _chart;
    };

    /**
     * Get or set the index of the beginning slice which determines which entries get displayed
     * by the widget. Useful when implementing pagination.
     *
     * Note: the sortBy function will determine how the rows are ordered for pagination purposes.

     * See the {@link http://dc-js.github.io/dc.js/examples/table-pagination.html table pagination example}
     * to see how to implement the pagination user interface using `beginSlice` and `endSlice`.
     * @method beginSlice
     * @memberof dc.tableview
     * @instance
     * @param {Number} [beginSlice=0]
     * @returns {Number|dc.tableview}
     */
    _chart.beginSlice = function (beginSlice) {
        if (!arguments.length) {
            return _beginSlice;
        }
        _beginSlice = beginSlice;

        return _chart;
    };

    /**
     * Get or set the index of the end slice which determines which entries get displayed by the
     * widget. Useful when implementing pagination. See {@link dc.dataTable#beginSlice `beginSlice`} for more information.
     * @method endSlice
     * @memberof dc.tableview
     * @instance
     * @param {Number|undefined} [endSlice=undefined]
     * @returns {Number|dc.tableview}
     */
    _chart.endSlice = function (endSlice) {
        if (!arguments.length) {
            return _endSlice;
        }
        _endSlice = endSlice;

        return _chart;
    };

    _chart.columns = function (columns) {
        if (!arguments.length) {
            return _columns;
        }
        _columns = columns;

        return _chart;
    };

    /**
     * Get or set sort-by function. This function works as a value accessor at row level and returns a
     * particular field to be sorted by.
     * @method sortBy
     * @memberof dc.tableview
     * @instance
     * @example
     * chart.sortBy(function(d) {
     *     return d.date;
     * });
     * @param {Function} [sortBy=identity function]
     * @returns {Function|dc.tableview}
     */
    _chart.sortBy = function (sortBy) {
        if (!arguments.length) {
            return _sortBy;
        }
        _sortBy = sortBy;

        return _chart;
    };

    /**
     * Get or set sort order. If the order is `d3.ascending`, the data table will use
     * `dimension().bottom()` to fetch the data; otherwise it will use `dimension().top()`
     * @method order
     * @memberof dc.tableview
     * @instance
     * @see {@link https://github.com/d3/d3-3.x-api-reference/blob/master/Arrays.md#d3_ascending d3.ascending}
     * @see {@link https://github.com/d3/d3-3.x-api-reference/blob/master/Arrays.md#d3_descending d3.descending}
     * @example
     * chart.order(d3.descending);
     * @param {Function} [order=d3.ascending]
     * @returns {Function|dc.tableview}
     */
    _chart.order = function (order) {
        if (!arguments.length) {
            return _order;
        }
        _order = order;

        return _chart;
    };

    /**
     * Get or set if group rows will be shown. The dataTable {@link dc.dataTable#group group}
     * function must be specified even if groups are not shown.
     * @method showGroups
     * @memberof dc.tableview
     * @instance
     * @example
     * chart
     *     .group([value], [name])
     *     .showGroups(true|false);
     * @param {Boolean} [showGroups=true]
     * @returns {Boolean|dc.tableview}
     */
    _chart.showGroups = function (showGroups) {
        if (!arguments.length) {
            return _showGroups;
        }
        _showGroups = showGroups;

        return _chart;
    };

    _chart.groupBy = function (groupBy) {
        if (!arguments.length) {
            return _groupBy;
        }
        _groupBy = groupBy;

        return _chart;
    };

    _chart.enableSearch = function (enable) {
        if (!arguments.length) {
            return _enableSearch;
        }
        _enableSearch = enable;

        return _chart;
    };

    _chart.enablePaging = function (enable) {
        if (!arguments.length) {
            return _enablePaging;
        }
        _enablePaging = enable;

        return _chart;
    };

    _chart.enablePagingSizeChange = function (enable) {
        if (!arguments.length) {
            return _enablePagingSizeChange;
        }
        _enablePagingSizeChange = enable;

        return _chart;
    };

    _chart.enablePagingInfo = function (enable) {
        if (!arguments.length) {
            return _enablePagingInfo;
        }
        _enablePagingInfo = enable;

        return _chart;
    };

    _chart.enableColumnReordering = function (enable) {
        if (!arguments.length) {
            return _enableColumnReordering;
        }
        _enableColumnReordering = enable;

        return _chart;
    };

    _chart.enableAutoWidth = function (enable) {
        if (!arguments.length) {
            return _enableAutoWidth;
        }
        _enableAutoWidth = enable;

        return _chart;
    };

    _chart.enableHeader = function (enable) {
        if (!arguments.length) {
            return _enableHeader;
        }
        _enableHeader = enable;

        return _chart;
    };

    _chart.fixedHeader = function (enable) {
        if (!arguments.length) {
            return _fixedHeader;
        }
        _fixedHeader = enable;

        return _chart;
    };

    _chart.pagingInfoText = function (text) {
        if (!arguments.length) {
            return _pagingInfoText;
        }
        _pagingInfoText = text;

        return _chart;
    };

    _chart.rowId = function (id) {
        if (!arguments.length) {
            return _rowId;
        }
        _rowId = id;

        return _chart;
    };

    _chart.dataSource = function (dataSource) {
        if (!arguments.length) {
            return _dataSource;
        }
        _dataSource = dataSource;

        return _chart;
    };

    _chart.buttons = function (buttons) {
        if (!arguments.length) {
            return _buttons;
        }
        var pdfButtonIndex = buttons.indexOf("pdf");
        if (pdfButtonIndex >= 0) {
            buttons[pdfButtonIndex] = this.__getFullWidthPdfButton();
        }
        _buttons = buttons;

        return _chart;
    };

    _chart.select = function (select) {
        if (!arguments.length) {
            return _select;
        }
        _select = select;

        return _chart;
    };

    _chart.responsive = function (enable) {
        if (!arguments.length) {
            return _responsive;
        }
        _responsive = enable;

        return _chart;
    };

    _chart.enableScrolling = function (enable) {
        if (!arguments.length) {
            return _enableScrolling;
        }
        _enableScrolling = enable;

        return _chart.redraw();
    };

    _chart.scrollingOptions = function (value) {
        if (!arguments.length) {
            return _scrollingOptions;
        }
        _scrollingOptions = value;

        return _chart.redraw();
    };

    _chart.listeners = function (listeners) {
        if (!arguments.length) {
            return _listeners;
        }
        _listeners = listeners;

        return _chart;
    };

    _chart.__getFullWidthPdfButton = function () {
        return {
            extend: "pdf",
            customize: function (doc) {
                doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
            }
        };
    };

    _chart.getDataTable = function () {
        return $(_parentEl.querySelector("table")).DataTable();
    };

    return _chart.anchor(parent, chartGroup);
};
