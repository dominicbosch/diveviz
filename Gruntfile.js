
module.exports = function( grunt ) {

  var globalConfig = {
    system: 'dev'
  };

	grunt.initConfig({
		pkg: grunt.file.readJSON( 'package.json' ),

		jshint: {
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true
				}
			},
			gruntfile: [ 'Gruntfile.js' ],
			server: [ 'src/server/**/*.js' ],
			client: [ 'src/client/**/*.js' ]
		},

		concat: {
			options: {
				separator: ';'
			},
			server: {
				src: [ 'src/server/**/*.js' ],
				dest: 'dist/<%= globalConfig.system %>/server/<%= pkg.name %>-server.js'
			},
			client: {
				src: [ 'src/client/**/*.js' ],
				dest: 'dist/<%= globalConfig.system %>/client/<%= pkg.name %>-client.js'
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - Server <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			server: {
				files: {
					'dist/<%= globalConfig.system %>/server/<%= pkg.name %>-server.min.js': [
						'<%= concat.server.dest %>'
					]
				}
			},
			client: {
				files: {
					'dist/<%= globalConfig.system %>/client/<%= pkg.name %>-client.min.js': [
						'<%= concat.client.dest %>'
					]
				}
			}
		},
		
		nodeunit: {
			all: ['test/server/**/*.js']
		},

		karma: {
			unit: {
				options: {
					files: ['test/client/**/*.js']
				},
				background: true
			}
		},

		jade: {
			debug: {
				options: {
					data: {
						debug: true
					}
				},
				files: {
					"debug/debug.html": [ "test.jade" ]
				}
			},
			release: {
				options: {
					data: {
						debug: false
					}
				},
				files: {
					"src/client/release.html": [ "test.jade" ]
				}
			}
		}

	});

	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-nodeunit' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-jade' );
	grunt.loadNpmTasks( 'grunt-contrib-qunit' );

	grunt.registerTask( 'default', 'Giving you hints', [ 'jshint'] );
	grunt.registerTask( 'dev', 'Globbing development', [ 'jshint' ] );
	grunt.registerTask( 'dist-dev', 'Development distribution', [ 'jshint' ] );
	grunt.registerTask( 'dist-prod', 'Productive distribution', [ 'jshint', 'concat', 'uglify' ] );

	grunt.registerTask( 'location', 'Runs a task for a specified location (client / server)', function ( arg ) {
		if( arg ) {
			grunt.task.run( 'jshint:' + arg );
			grunt.task.run( 'concat:' + arg );
			grunt.task.run( 'uglify:' + arg );
		} else {
			grunt.log.error( 'Provide an argument (client or server) to "location" or scratch it!' );
		}
	});

};