const fs = require('fs');
module.exports = {
    readFile,
    writeFile,
    writeFileAccess
};
function readFile(name){
    try{
        let data = fs.readFileSync(name, 'utf8');
        data = JSON.parse(data);
        return data;
    }catch(err){
        console.error(err);
        return [];
    }
}



function writeFile(name, data){
    try{
        fs.writeFileSync(name, JSON.stringify(data), 'utf8');
    }catch(err){
        console.error(err);
    }
}

function writeFileAccess(name, data) {
    try{
        fs.writeFileSync(name, data);
        return true;
    }catch(err){
        console.error(err);
        return false;
    }
}
