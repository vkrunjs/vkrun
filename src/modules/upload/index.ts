import * as fs from 'fs'
import * as path from 'path'
import * as type from '../types' // Substitua com suas próprias tipagens, se necessário

// Função para criar o armazenamento de arquivos em disco
export const upload = {
  diskStorage: (
    options: {
      destination: string
      filename?: (file: {
        filename: string
        extension: string
        mimetype: string
      }) => string
    }
  ) => {
    return async (request: type.Request, _response: type.Response, next: type.NextFunction) => {
      request.on('data', (chunk) => {
        console.log({ chunk })
      })
      // Garante que o diretório de destino existe
      fs.mkdirSync(options.destination, { recursive: true })

      // Função para salvar cada arquivo
      const saveFileToDisk = (file: any): type.StorageFile => {
        // Define o nome do arquivo usando a função fornecida ou um nome padrão
        const filename = options.filename ? options.filename(file) : file.filename
        const filepath = path.join(options.destination, filename)

        // Grava o arquivo no disco
        fs.writeFileSync(filepath, file.buffer)

        // Calcula informações extras para o arquivo
        const fileStats = fs.statSync(filepath)
        return {
          filename,
          extension: file.extension,
          mimetype: file.mimetype,
          destination: options.destination,
          path: filepath,
          size: fileStats.size
        }
      }

      // Itera sobre os arquivos de `req.files` e salva cada um
      if (request.files && Array.isArray(request.files)) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        request.files = request.files.map(saveFileToDisk) as type.StorageFile[]
      }

      next()
    }
  }
}
