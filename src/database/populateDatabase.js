import ExcelJS from 'exceljs';
import dbUsuarios from './models/usuarios.js';

const filePath = './files/Base RLS.xlsx'

async function lerExcelParaJSON() {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
  
    const worksheet = workbook.getWorksheet(1);
  
    const data = [];
  
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1) { 
        const rowData = {};
        row.eachCell((cell, colNumber) => {
          rowData[worksheet.getRow(1).getCell(colNumber).value] = cell.value;
        });
        data.push(rowData);
      }
    });
  
    return data;
}

async function populate(){
    try{

    } catch (err) {
        return {message: err.message}
    }

    const registros = await lerExcelParaJSON()

    for(let registro of registros) {

        const user = await dbUsuarios.findOne({ email: registro.Email })

        if(user == null) {
            await dbUsuarios.create({
                email: registro.Email,
                registros: [
                    {
                        descricao: registro["DESCRIÇÃO "],
                        contaContabil: registro["Conta Contábil"],
                        valorEmConta: registro.Valor
                    }
                ]
            })
        } else {
            const novoRegistro = {
                descricao: registro["DESCRIÇÃO "],
                contaContabil: registro["Conta Contábil"],
                valorEmConta: registro.Valor
            }

            user.registros.push(novoRegistro)

            const updateRegister = await dbUsuarios.updateOne(
                {email: registro.Email},
                {$set: { registros: user.registros }}
            )
            
            console.log(novoRegistro)
        }
    }
    return 'OK'
}

console.log(await populate())

