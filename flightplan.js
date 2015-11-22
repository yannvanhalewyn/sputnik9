var plan = require('flightplan')
  , dateFormat = require('dateformat')

var appName = "nodeapp";
var tmpDir = appName + "-" + dateFormat("yyyy-mm-dd_hhuMM");

plan.target('production', {
  host: '82.196.8.147',
  username: 'deploy',
  agent: process.env.SSH_AUTH_SOCK
})

plan.target('vm', [
  {
    host: '55.55.55.5',
    username: 'deploy',
    agent: process.env.SSH_AUTH_SOCK
  }
])

plan.local(function(local) {
  local.log("Transfering files.");
  var filesToCopy = local.exec("git ls-files", {silent: true});
  local.transfer(filesToCopy, tmpDir);
  local.transfer(".env", tmpDir);
});

plan.remote(function(remote) {
  remote.log('linking node_modules');
  remote.exec('ln -snf ~/node_modules ' + tmpDir + '/node_modules');

  remote.log('installing dependencies');
  remote.exec('npm --production --prefix ' + tmpDir + ' install');

  remote.log('linking app');
  remote.exec('ln -snf ' + tmpDir + ' ~/' + appName);

  remote.log('restarting app');
  remote.exec('sudo restart nodeapp');
})
