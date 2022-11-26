const validaTelefone = (numero) => {

  
    for (let i = 0; i < numero.length; i++) {
        if (numero[i] !== '0' && numero[i] !== '1' && numero[i] !== '2' && numero[i] !== '3' && numero[i] !== '4' && numero[i] !== '5' && numero[i] !== '6' && numero[i] !== '7' && numero[i] !== '8' && numero[i] !== '9' && numero[i] !== '(' && numero[i] !== ')' && numero[i] !== ' ' && numero[i] !== '-') {
            return false
        }
    }
    if (numero.length < 11) {
        return false
    }
    return true
}

module.exports = validaTelefone