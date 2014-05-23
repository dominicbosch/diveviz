
exports.setUp = function( cb ) {
	console.log( 'Starting Test' );
	cb();
};

exports.tearDown = function( cb ) {
	console.log( 'Stopping Test' );
	cb();	
}

exports.group = {
	testFunction: function( test ) {
		test.expect( 1 );
		test.ok( true, 'True is not true!' );
		test.done();
	}
};