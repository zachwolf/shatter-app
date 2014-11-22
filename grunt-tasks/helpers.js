var fs = require('fs');

/**
 * helper function for finding the paths of folders and files
 * @param {string}  path - starting point to search for files
 * @param {object}  [settings={} - the settings...
 * @param {boolean} [settings.includeUnderscores=false] - flag to include files beginning with an underscore
 * @param {array}   [settings.extensions=['.js']] - file extensions to be searched for
 * @param {string}  internalDir - for internal use to track position in sub directories
 */
function fileLoop(path, settings, internalDir) {
  var _files = []
    , settings = settings || {}
    , includeUnderscoreFiles = settings.includeUnderscores || false
    , extensions = settings.extensions || ['.js']
    , _path
    , _extensionTest;

  // look through everything
  fs.readdirSync( path ).forEach(function(fileOrDirectory){
    // ignore dot files and underscored files unless specified
    if ( !includeUnderscoreFiles && (/^[\.\_]/).test(fileOrDirectory) ) return;

    // if it's a folder, start this process over
    _path = path + '/' + fileOrDirectory;
    if ( fs.lstatSync(_path).isDirectory() ) {
      // folders in folders in folders...
      if (internalDir) {
        fileOrDirectory = internalDir + '/' + fileOrDirectory;
      }
      // add the found files to the _files arr
      _files = _files.concat(fileLoop(_path, settings, fileOrDirectory));
      return;
    }
    // other wise we can assume it's a file
    // return if it's not a file that matches the passed extensions
    _extensionTest = new RegExp("(?:" + extensions.join("|").replace(/\./g, "") + ")$");
    if ( !(_extensionTest).test(fileOrDirectory) ) return;

    // if it's a nested file, we need to add the path
    if (!!internalDir) {
      fileOrDirectory = internalDir + '/' + fileOrDirectory;
    }

    _files.push(fileOrDirectory);
    return;
  });

  return _files;
}

module.exports = {
  getFileTree: fileLoop
};