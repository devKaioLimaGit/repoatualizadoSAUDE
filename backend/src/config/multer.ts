import crypto from 'crypto';
import multer from 'multer'


import {extname, resolve} from 'path'

export default{
  upload(folder: string){
    return{
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (request, file, callback) => {
          const cpf = request.body.cpf;  // Obtém o CPF da requisição
          const fileExtension = extname(file.originalname);  // Extensão do arquivo
          const newFileName = `${cpf}${fileExtension}`;  // Usa o CPF como nome do arquivo

          callback(null, newFileName);  // Define o novo nome do arquivo
        }
      })
    }
  }
}