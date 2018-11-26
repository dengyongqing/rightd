#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

// 公用方法
function verionPlus(version) {
  const ns = version.split('.');
  let n = ns[2];
  n = parseInt(n, 10);
  console.log(n);
  if (n >= 99) {
    ns[2] = 1;
    ns[1] = parseInt(ns[1], 10) + 1;
    if (ns[1] >= 99) {
      ns[1] = 1;
      ns[0] = parseInt(ns[0], 10) + 1;
    }
  }else {
    ns[2] = n + 1;
  }
  // process.exit('版本号超过100');
  console.log(ns);
  return ns.join('.');
}

function writeFile(pth, json) {
  fs.writeFileSync(pth, JSON.stringify(json, null, 2), 'utf8');
}

let name;
function updatePkg() {
  const pkgUrl = path.join(__dirname, './../package.json');
  let pkg = fs.readFileSync(pkgUrl);
  pkg = JSON.parse(pkg);
  name = pkg.name;
  pkg.version = verionPlus(pkg.version);
  writeFile(pkgUrl, pkg);
  console.log('package.json已更新, 开始发布...');
}

function publish() {
  cp.execSync('npm publish --registry=https://registry.npmjs.org');
  console.log('已发布npm, 开始同步cnpm...');
  cp.execSync(`cnpm sync ${name}`);
  process.exit();
}

updatePkg();
publish();
