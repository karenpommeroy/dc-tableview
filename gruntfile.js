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
						"src/main.css"
					]
				}
			},
			full_bs: {
				files: {
					"build/dc-tableview-bs.css": [
						"node_modules/datatables.net-bs/css/dataTables.bootstrap.css",
						"node_modules/datatables.net-rowgroup-bs/css/rowGroup.bootstrap.css",
						"node_modules/datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.css",
						"node_modules/datatables.net-colreorder-bs/css/colReorder.bootstrap.css",
						"node_modules/datatables.net-buttons-bs/css/buttons.bootstrap.css",
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
						"src/main.css"
					]
				}
			},
			light_bs: {
				files: {
					"build/dc-tableview-light-bs.css": [
						"node_modules/datatables.net-bs/css/dataTables.bootstrap.css",
						"node_modules/datatables.net-rowgroup-bs/css/rowGroup.bootstrap.css",
						"node_modules/datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.css",
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
					"node_modules/datatables.net-buttons/async/async.js",
					"node_modules/datatables.net/js/jquery.dataTables.js",
					"node_modules/datatables.net-bs/js/dataTables.bootstrap.js",
					"node_modules/datatables.net-rowgroup/js/dataTables.rowGroup.js",
					"node_modules/datatables.net-fixedheader/js/dataTables.fixedHeader.js",
					"node_modules/datatables.net-colreorder/js/dataTables.colReorder.js",
					"node_modules/datatables.net-buttons/js/dataTables.buttons.js",
					"node_modules/datatables.net-buttons-bs/js/buttons.bootstrap.js",
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
					"src/main.js"
				],
				dest: "build/dc-tableview-light.js"
			},
			light_bs: {
				src: [
					"node_modules/datatables.net/js/jquery.dataTables.js",
					"node_modules/datatables.net-bs/js/dataTables.bootstrap.js",
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
    var buildTask = ["_clean", "cssmin", "concat", "umd", "uglify"];
    
    grunt.registerTask("default", buildTask);
    grunt.registerTask("clean", cleanTask);
    grunt.registerTask("build", buildTask);
};