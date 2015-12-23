#!/bin/sh

RCol='\e[0m'    # Text Reset
Gre='\e[0;32m';
log() {
  echo -e "\n${Gre}[Info] => $1${RCol}"
}

# Basics
sudo apt-get update
if ! hash curl 2>/dev/null; then
  log "No Curl detected. Installing 'curl'"
  sudo apt-get install -y curl
fi

# setup nodejs, nginx, git and vim
log "Setting up NodeJs nginx git and vim"
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs nginx git vim

# Update gcc for bcrypt
log "Updating gcc and g++"
sudo apt-get install -y software-properties-common python-software-properties build-essential
sudo add-apt-repository ppa:ubuntu-toolchain-r/test
sudo apt-get update
sudo apt-get install -y gcc-4.9 g++-4.9
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.9 60 --slave /usr/bin/g++ g++ /usr/bin/g++-4.9

# install gulp and gulp-sass for building
log "Installing gulp"
sudo npm install gulp -g

# UBUNTU 14
log "Installing mongo"
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
