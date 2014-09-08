module.exports = function(grunt) {
	"use strict";
	
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		connect: {
			server: {
				options: {
					port: 9001,
					base: './build/',
					keepalive: true,
					hostname: 'localhost'
				}
			}
		},
		less: {
			main: {
				files: {
					'assets/css/main.css': [
						'assets/less/main.less'
					]
				},
				options: {
					compress: true,
					sourceMap: true,
					sourceMapFilename: 'assets/css/main.css.map',
					sourceMapURL: '/assets/css/main.css.map',
					sourceMapRootpath: '/'
				}
			}
		},
		concat : {
			options: {
				separator: grunt.util.linefeed + ';' + grunt.util.linefeed
			},
			js: {
				src: [
					// 'bower_components/jquery/dist/jquery.min.js',
					// 'bower_components/highcharts/highchart.js',
					'assets/scripts/main.js'
				],
				dest: 'assets/scripts/highlow-main.js'
			}
		},
		copy: {
			main: {
				files: [{
					expand: true,
					flatten: false,
					cwd: 'assets/',
					src: ['**/*.*'],
					dest: 'build/assets/'
				}]
			},
			html: {
				files: [{
					src: ['html/*.html'],
					dest: ['build/'],
					expand: true,
					flatten: false
				}]
			}
		},
		sprite: {
			all: {
				src: ['assets/images/sprite-src/*.png'],
				destImg: 'assets/images/spritesheet.png',
				destCSS: 'assets/less/spritesheet.less',
				algorithm: 'binary-tree',
				padding: 2
			}
		},
		watch: {
			styles: {
				files: ['**/*.less'],
				tasks: ['less'],
				options: {
					nospawn: false,
					livereload: true
				}
			},
			sprite: {
				files: ['assets/images/sprite-src/*.*'],
				task: ['sprite','less'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['assets/scripts/**/*.js'],
				tasks: ['newer:concat:js'],
				options: {
					livereload: true
				}
			},
			template: {
				files: ['**/*.liquid'],
				tasks: ['liquid'],
				options: {
					livereload: true
				}
			},
			html: {
				files: ['**/*.html'],
				options: {
					livereload: true
				}
			},
			copy: {
				files: ['assets/**/*.*','html/*.html'],
				tasks: ['newer:copy']
			}
		},
		concurrent: {
			all: {
				tasks: ['newer:requirejs', 'connect:server', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		}
	});

	grunt.registerTask('default', ['sprite', 'newer:less', 'newer:concat', 'newer:copy', 'concurrent:all']);
	grunt.registerTask('build', ['sprite', 'newer:less', 'newer:concat', 'newer:copy']);
};