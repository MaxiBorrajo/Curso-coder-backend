const fs = require("fs");
//Version sincrona

//crea y actualiza files
fs.writeFileSync("file.txt", "holaaa");


//agrega info
fs.appendFileSync('file.txt', '\nchauuu')

//para leer hay que pasar un encode
const info = fs.readFileSync("file.txt", "utf-8");

console.log(info);

//para eliminar un archivo
fs.unlinkSync('file.txt')

//para ver si existe un archivo
console.log(fs.existsSync('file.txt'))

/*
Lo asincrono lleva este callback:
(error, data) => {
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
}
*/

//para laburarlo con promesas

const result = fs.promises.writeFile("file.txt", "holaaa").then(()=>{return true})
if(result){
    console.log(fs.promises.readFile("file.txt", 'utf-8'))
    fs.promises.unlink('file.txt').then(()=>{
        console.log('eliminado con exito')
    })
}
