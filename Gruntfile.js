module.exports = function(grunt) {
	
	var depManager = function(task) {
		var libSrc = './bower_components';
		var libDst = './web/js/libs';

		var list = grunt.file.expand([libSrc + '/*/']), i, n, dir, bowerFile, bowerData, libData, file, fileMin, fileData;
		for (i = 0; i < list.length; i++) {
			dir = list[i];
			bowerFile = dir + 'bower.json';
			if (!grunt.file.isFile(bowerFile)) continue;
			bowerData = grunt.file.readJSON(bowerFile);
			libData = {name: bowerData.name, files: [], dstDir: libDst + '/' + bowerData.name};
			libFiles = (typeof bowerData.main === "string") ? [bowerData.main] : bowerData.main;
			for (n = 0; n < libFiles.length; n++) {
				var fp = libFiles[n].match(/^(.*)\.([^\.]+)$/i);
				if (fp[2] === 'js' && grunt.file.isFile(dir + fp[1] + '.css')) {
					libFiles.push(fp[1] + '.css');
				}
			}
			if (libFiles.length === 0) continue;
			if (task === 'build') {
				console.log('Building dependency \'' + libData.name + '\'');
				if (grunt.file.exists(libData.dstDir)) grunt.file.delete(libData.dstDir);
			}
			for (n = 0; n < libFiles.length; n++) {
				file = libFiles[n].replace(/^\.\/(.*)$/, '$1');
				fileMin = file.replace(/^(.*)\.([^\.]+)$/, '$1.min.$2');
				if (grunt.file.isFile(dir + fileMin)) file = fileMin;
				libData.files.push(fileData = {
					src: dir + file,
					dst: libData.dstDir + '/' + file.replace(/^dist\/(.*)$/, '$1')
				});
				if (task === 'build') {
					grunt.file.copy(fileData.src, fileData.dst);
				}
			}
			if (task === 'clean') {
				console.log('Cleaning dependency \'' + libData.name + '\'');
				if (grunt.file.exists(libData.dstDir)) grunt.file.delete(libData.dstDir);
			}
			//console.log(libData);
		}
	};
	
	grunt.initConfig({});
	
	grunt.registerTask('build', function() {
		depManager('build');
	});
	grunt.registerTask('clean', function() {
		depManager('clean');
	});
	grunt.registerTask('default', ['build']);
};
