#!/bin/bash

function heroku_deploy {
  DIST_DIR="/tmp/test-cobertura$(LC_ALL=C tr -dc 0-9 < /dev/urandom | head -c 20 | xargs | cat)"
  MASTER_HEAD_SHA=$(git rev-parse --short HEAD)
  HEROKU_REMOTE_NAME=test-heroku
  HEROKU_REMOTE_ADDRESS=git@heroku.com:test-cobertura.git

  mkdir $DIST_DIR
  pushd $DIST_DIR 
    git init
    git remote add $HEROKU_REMOTE_NAME $HEROKU_REMOTE_ADDRESS
    git commit -qam "" --allow-empty --allow-empty-message
  popd

  time bundle exec jekyll build
  rsync -r _site/* $DIST_DIR/

  pushd $DIST_DIR 
    touch index.php
    echo '<?php include_once("index.html"); ?>' > index.php
    git add . -A
    git commit -m "cobertura to staging"
    git push -f $HEROKU_REMOTE_NAME master
  popd
}

function install_gems {
  bundle install --jobs 8
}

install_gems
gulp imagemin
gulp build
heroku_deploy
