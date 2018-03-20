#!/usr/bin/env node

var program = require('commander');
var shell   = require('shelljs');
var color   = require('colorful');
var fs      = require('fs');
var version = require('./package.json').version;
var work_path = process.cwd();

program
  .version(version)
  .usage('[command] [options]')
  .command('<component-name>', '组件名称');

program.parse(process.argv);

var pkgs = program.args;

if(pkgs.length) {
    createVueComponent(pkgs.shift());
}else{
	console.log(color.red('\n    × 缺少版本号\n'));
}

function createVueComponent(name) {
    if(shell.ls('-A', work_path).indexOf(name) != -1){
        console.log('\n    此组件已经存在\n');
    }else{
        shell.mkdir('-p', work_path + '/' + name);
        setTimeout(function() {
            shell.touch(work_path + '/' + name + '/index.js');
            shell.touch(work_path + '/' + name + '/_style.scss');
            shell.touch(work_path + '/' + name + '/' + name + '.vue');

            setTimeout(function() {
                contentCopy(__dirname + '/tpls/vue.js', work_path + '/' + name + '/index.js');
                contentCopy(__dirname + '/tpls/vue.tpl', work_path + '/' + name + '/' + name + '.vue');
            }, 10);
        }, 10);
    }
}

function contentCopy(src, target) {
    fs.readFile(src, 'utf8', function(err, data) {
        fs.writeFile(target, data, function(err) {

        });
    });
}
