const { AzureFunction, Context, HttpRequest } = require('@azure/functions');

const httpTrigger = async function (context, req) {
    const { cpf } = req.body;
    
    if (!cpf || !isValidCPF(cpf)) {
        context.res = {
            status: 400,
            body: { message: "CPF inválido" }
        };
        return;
    }
    
    context.res = {
        status: 200,
        body: { message: "CPF válido" }
    };
};

function isValidCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    
    let sum = 0, remainder;
    for (let i = 1; i <= 9; i++) sum += parseInt(cpf[i - 1]) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf[9])) return false;
    
    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf[i - 1]) * (12 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf[10])) return false;
    
    return true;
}

module.exports = httpTrigger;
