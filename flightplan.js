var plan = require('flightplan')
  , dateFormat = require('dateformat')

var appName = "sputnik9";
var root    = `/var/www/${appName}`
var current = `${root}/current`
var release = `${root}/releases/${dateFormat("yyyy-mm-dd_HHuMM")}`;
var shared  = `${root}/shared`

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

// Create all required dirs on remote
plan.remote(function(remote) {
  remote.exec(`mkdir -p ${root}`)
  remote.exec(`mkdir -p ${release}`)
  remote.exec(`mkdir -p ${shared}`)
  remote.exec(`mkdir -p ${shared}/node_modules`)
  remote.exec(`mkdir -p ${shared}/logs`)
})

plan.local(function(local) {
  local.log("Transfering files.");
  var filesToCopy = local.exec("git ls-files", {silent: true});
  local.transfer(filesToCopy, release);
  local.transfer(".env", release);
});

plan.remote(function(remote) {
  remote.log('linking node_modules');
  remote.exec(`ln -snf ${shared}/node_modules ${release}/node_modules`);

  remote.log('linking logs');
  remote.exec(`ln -snf ${shared}/logs ${release}/logs`);

  remote.log('installing dependencies');
  remote.exec(`npm --production --prefix ${release} install`);

  remote.log('linking app');
  remote.exec(`ln -snf ${release} ${current}`)

  remote.log('copying startup config');
  remote.exec(`sudo /bin/cp ${current}/config/nodeapp.conf /etc/init/`)

  remote.log('restarting app');
  remote.exec('sudo restart nodeapp');
})
