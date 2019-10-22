module.exports = function(grunt) {
    this.uglifyOptions = {
		dead_code: true,
		conditionals: true,
		evaluate: true,
		unused: true,
		join_vars: true,
		drop_console: true,
		drop_debugger: true,
		comparisons: true,
		booleans: true,
		loops: true,
		if_return: true
	};

	grunt.initConfig({
        cssmin: {
			full: {
				files: {
					"build/dc-tableview.css": [
						"node_modules/datatables.net-dt/css/jquery.dataTables.css",
						"node_modules/datatables.net-rowgroup-dt/css/rowGroup.dataTables.css",
						"node_modules/datatables.net-fixedheader-dt/css/fixedHeader.dataTables.css",
						"node_modules/datatables.net-colreorder-dt/css/colReorder.dataTables.css",
						"node_modules/datatables.net-buttons-dt/css/buttons.dataTables.css",
						"node_modules/datatables.net-scroller-dt/css/scroller.dataTables.css",
						"node_modules/datatables.net-select-dt/css/select.dataTables.css",
						"node_modules/datatables.net-responsive-dt/css/responsive.dataTables.css",
						"src/main.css"
					]
				}
			},
			full_bs: {
				files: {
					"build/dc-tableview-bs.css": [
						"node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css",
						"node_modules/datatables.net-rowgroup-bs4/css/rowGroup.bootstrap4.css",
						"node_modules/datatables.net-fixedheader-bs4/css/fixedHeader.bootstrap4.css",
						"node_modules/datatables.net-colreorder-bs4/css/colReorder.bootstrap4.css",
						"node_modules/datatables.net-buttons-bs4/css/buttons.bootstrap4.css",
						"node_modules/datatables.net-scroller-bs4/css/scroller.bootstrap4.css",
						"node_modules/datatables.net-select-bs4/css/select.bootstrap4.css",
						"node_modules/datatables.net-responsive-bs4/css/responsive.bootstrap4.css",
						"src/main.css"
					]
				}
			},
			light: {
				files: {
					"build/dc-tableview-light.css": [
						"node_modules/datatables.net-dt/css/jquery.dataTables.css",
						"node_modules/datatables.net-rowgroup-dt/css/rowGroup.dataTables.css",
						"node_modules/datatables.net-fixedheader-dt/css/fixedHeader.dataTables.css",
						"node_modules/datatables.net-responsive-dt/responsive.dataTables.css",

						"src/main.css"
					]
				}
			},
			light_bs: {
				files: {
					"build/dc-tableview-light-bs.css": [
						"node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css",
						"node_modules/datatables.net-rowgroup-bs4/css/rowGroup.bootstrap4.css",
						"node_modules/datatables.net-fixedheader-bs4/css/fixedHeader.bootstrap4.css",
						"node_modules/datatables.net-responsive-bs4/css/responsive.bootstrap4.css",
						"src/main.css"
					]
				}
			}
		},
		concat: {
			full: {
				src: [
					"node_modules/datatables.net-buttons/async/async.js",
					"node_modules/datatables.net/js/jquery.dataTables.js",
					"node_modules/datatables.net-rowgroup/js/dataTables.rowGroup.js",
					"node_modules/datatables.net-fixedheader/js/dataTables.fixedHeader.js",
					"node_modules/datatables.net-colreorder/js/dataTables.colReorder.js",
					"node_modules/datatables.net-scroller/js/dataTables.scroller.js",
					"node_modules/datatables.net-select/js/dataTables.select.js",
					"node_modules/datatables.net-responsive/js/dataTables.responsive.js",
					"node_modules/datatables.net-responsive-dt/js/responsive.dataTables.js",
					"node_modules/datatables.net-scroller-dt/js/scroller.dataTables.js",
					"node_modules/datatables.net-select-dt/js/select.dataTables.js",
					"node_modules/datatables.net-buttons/js/dataTables.buttons.js",
					"node_modules/datatables.net-buttons/js/buttons.html5.js",
					"node_modules/datatables.net-buttons/js/buttons.print.js",
					"node_modules/jszip/dist/jszip.js",
					"node_modules/pdfmake/build/pdfmake.js",
					"node_modules/pdfmake/build/vfs_fonts.js",
					"src/main.js"
				],
				dest: "build/dc-tableview.js"
			},
			full_bs: {
				src: [
					"node_modules/datatables.net/js/jquery.dataTables.js",
					"node_modules/datatables.net-bs4/js/dataTables.bootstrap4.js",
					"node_modules/datatables.net-buttons/async/async.js",
					"node_modules/datatables.net-rowgroup/js/dataTables.rowGroup.js",
					"node_modules/datatables.net-scroller/js/dataTables.scroller.js",
					"node_modules/datatables.net-select/js/dataTables.select.js",
					"node_modules/datatables.net-responsive/js/dataTables.responsive.js",
					"node_modules/datatables.net-rowgroup-bs4/js/rowGroup.bootstrap4.js",
					"node_modules/datatables.net-fixedheader/js/dataTables.fixedHeader.js",
					"node_modules/datatables.net-fixedheader-bs4/js/fixedHeader.bootstrap4.js",
					"node_modules/datatables.net-colreorder/js/dataTables.colReorder.js",
					"node_modules/datatables.net-colreorder-bs4/js/colReorder.bootstrap4.js",
					"node_modules/datatables.net-scroller-bs4/js/scroller.bootstrap4.js",
					"node_modules/datatables.net-select-bs4/js/select.bootstrap4.js",
					"node_modules/datatables.net-responsive-bs4/js/responsive.bootstrap4.js",
					"node_modules/datatables.net-buttons/js/dataTables.buttons.js",
					"node_modules/datatables.net-buttons-bs4/js/buttons.bootstrap4.js",
					"node_modules/datatables.net-buttons/js/buttons.html5.js",
					"node_modules/datatables.net-buttons/js/buttons.print.js",
					"node_modules/jszip/dist/jszip.js",
					"node_modules/pdfmake/build/pdfmake.js",
					"node_modules/pdfmake/build/vfs_fonts.js",
					"src/main.js"
				],
				dest: "build/dc-tableview-bs.js"
			},
			light: {
				src: [
					"node_modules/datatables.net/js/jquery.dataTables.js",
					"node_modules/datatables.net-rowgroup/js/dataTables.rowGroup.js",
					"node_modules/datatables.net-fixedheader/js/dataTables.fixedHeader.js",
					"node_modules/datatables.net-responsive/js/dataTables.responsive.js",
					"node_modules/datatables.net-responsive-dt/js/responsive.dataTables.js",
					"src/main.js"
				],
				dest: "build/dc-tableview-light.js"
			},
			light_bs: {
				src: [
					"node_modules/datatables.net/js/jquery.dataTables.js",
					"node_modules/datatables.net-responsive/js/dataTables.responsive.js",
					"node_modules/datatables.net-responsive-bs4/js/responsive.bootstrap4.js",
					"node_modules/datatables.net-bs4/js/dataTables.bootstrap4.js",
					"node_modules/datatables.net-rowgroup-bs4/js/rowGroup.bootstrap4.js",
					"node_modules/datatables.net-fixedheader-bs4/js/fixedHeader.bootstrap4.js",
					"node_modules/datatables.net-rowgroup/js/dataTables.rowGroup.js",
					"node_modules/datatables.net-fixedheader/js/dataTables.fixedHeader.js",
					"src/main.js"
				],
				dest: "build/dc-tableview-light-bs.js"
			}
		},
		umd: {
            full: {
                options: {
                    src: "build/dc-tableview.js",
                    dest: "build/dc-tableview.js",
                    globalAlias: "tableview",
                    deps: {
                        "default": [
                            { "dc": "dc" },
                            { "jquery": "$" }
                        ],
						global: ["dc", "$"]
                    }
                }
            },
			full_bs: {
                options: {
                    src: "build/dc-tableview-bs.js",
                    dest: "build/dc-tableview-bs.js",
					globalAlias: "tableview",
                    deps: {
                        "default": [
							{ "bootstrap": "bootstrap" },
                            { "dc": "dc" },
                            { "jquery": "$" }
                        ],
						global: ["bootstrap", "dc", "$"]
                    }
                }
            },
			light: {
                options: {
                    src: "build/dc-tableview-light.js",
                    dest: "build/dc-tableview-light.js",
                    globalAlias: "tableview",
                    deps: {
                        "default": [
                            { "dc": "dc" },
                            { "jquery": "$" }
                        ],
						global: ["dc", "$"]
                    }
                }
            },
			light_bs: {
                options: {
                    src: "build/dc-tableview-light-bs.js",
                    dest: "build/dc-tableview-light-bs.js",
                    globalAlias: "tableview",
                    deps: {
                        "default": [
							{ "bootstrap": "bootstrap" },
                            { "dc": "dc" },
                            { "jquery": "$" }
                        ],
						global: ["bootstrap", "dc", "$"]
                    }
                }
            }
        },
        uglify: {
            full: {
                files: [{
                    "build/dc-tableview.min.js": ["build/dc-tableview.js"]
                }],
                compress: this.uglifyOptions
            },
			full_bs: {
                files: [{
                    "build/dc-tableview-bs.min.js": ["build/dc-tableview-bs.js"]
                }],
                compress: this.uglifyOptions
            },
			light: {
                files: [{
                    "build/dc-tableview-light.min.js": ["build/dc-tableview-light.js"]
                }],
                compress: this.uglifyOptions
            },
			light_bs: {
                files: [{
                    "build/dc-tableview-light-bs.min.js": ["build/dc-tableview-light-bs.js"]
                }],
                compress: this.uglifyOptions
            }
        },

        _clean: {
            build: {
                src: ["build/"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-umd");
    grunt.renameTask("clean", "_clean");

    var cleanTask = ["_clean"];
    var buildTask = ["_clean", "cssmin", "concat", "umd"];
    var packageTask = ["_clean", "cssmin", "concat", "umd", "uglify"];

    grunt.registerTask("default", buildTask);
    grunt.registerTask("clean", cleanTask);
    grunt.registerTask("build", buildTask);
    grunt.registerTask("package", packageTask);
};