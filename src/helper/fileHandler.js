const path = require('path');
const fs = require('fs');

const readDataFromFile = () => {
    let readPath = path.join(__dirname, 'users.json');
    let tasksData = fs.readFileSync(readPath,{encoding: 'utf-8', flag: 'r'});
    return JSON.parse(tasksData);
}
const writeIntoFile = (obj) => {
    let writePath = path.join(__dirname, '.', 'users.json');
    fs.writeFile(writePath, JSON.stringify(obj),{encoding: 'utf8',flag:'w'},function(err,data){
        if(err){
            console.log('Writing into file has failed');
        }else{
            console.log('writing into the file async has finished');
        }
    });
}

module.exports = {
    readDataFromFile,
    writeIntoFile
}