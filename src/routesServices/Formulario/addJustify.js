import dbUsuarios from "../../database/models/usuarios.js"
import ExcelJS from "exceljs"
import { format } from "date-fns"
import fs from 'fs'

class addJustifyService {
    async execute({ email, descricao, grupoDaConta, conta, valorEmConta, valorAJustificar, mes, justificativa }){
        try{
            const workbook = new ExcelJS.Workbook();

            const filePath = `./files/${format(new Date(), 'dd-MM-yyyy')}.xlsx`

            if(!fs.existsSync(filePath)) {
                const worksheet = workbook.addWorksheet('Planilha1')

                const cells = [
                    [worksheet.getCell('A1'), "Email"],
                    [worksheet.getCell('B1'), "DESCRIÇÃO"],
                    [worksheet.getCell('C1'), "Grupo da Conta"],
                    [worksheet.getCell('D1'), "Conta"],
                    [worksheet.getCell('E1'), "Valor"],
                    [worksheet.getCell('F1'), "Valor Justificado"],
                    [worksheet.getCell('G1'), "Mês"],
                    [worksheet.getCell('H1'), "Justificativa"]
                ]

                for(let cell of cells) {
                    cell[0].value = cell[1]
                    cell[0].font = { color: { argb: 'FFFFFFFF' }, bold: true }
                    cell[0].fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '228B22' }}
                }
                
                await workbook.xlsx.writeFile(filePath)
            }

            await workbook.xlsx.readFile(filePath)

            const worksheet = workbook.getWorksheet('Planilha1');

            let nextRow = worksheet.rowCount + 1;

            const data = [
                email, 
                descricao, 
                grupoDaConta, 
                conta, 
                valorEmConta, 
                valorAJustificar, 
                mes, 
                justificativa
            ]

            data.forEach((value, index) => {
                worksheet.getCell(`${String.fromCharCode(65 + index)}${nextRow}`).value = value
            })

            await workbook.xlsx.writeFile(filePath)

            return { success: true, message: 'Justificativa adicionada com sucesso' }

        } catch (err) {
            return { message: err.message }
        }
    }
}

export default addJustifyService