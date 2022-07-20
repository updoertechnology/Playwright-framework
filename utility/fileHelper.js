const fs = require("fs");
class fileHelper {
    //create an empty file named given in the paramether
    createFile(path) {
        fs.open(path, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log("File created:", path);
            }
        });
    }
    /**
         * Asynchronously removes a file or symbolic link. No arguments other than a
         * possible exception are given to the completion callback.
         * @param path file  path must be provided along with the filename
    **/

    removeFile(path) {
        fs.unlink(path, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log("File removed:", path);
            }
        });
    }
    /**
         * Asynchronously rename file at `oldPath` to the pathname provided
         * as `newPath`. In the case that `newPath` already exists, it will
         * be overwritten. If there is a directory at `newPath`, an error will
         * be raised instead.
         *
     * */

    renameFile(path) {
        fs.rename(path, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log("File renamed:", path);
            }
        });
    }

    removeDirectory(path) {
        fs.rmdir(path, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log("Folder removed:", path);
            }
        });

    }

    createDirectory(path) {
        fs.mkdir(path, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log("Folder created:", path);
            }
        });
    }


    renameDirectory(path) {
        fs.renameDirectory(path, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log("Folder renamed:", path);
            }
        });
    }
}

module.exports = new fileHelper();


