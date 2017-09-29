module.exports = function(grunt) {
    grunt.initConfig({
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: [],
                commit: false,
                createTag: false,
                push: false
            }
        },
    });


    grunt.loadNpmTasks('grunt-bump');

};