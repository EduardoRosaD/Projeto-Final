const validaNome = (nome) => {

    if (nome !== undefined){
    for (let i = 0; i < nome.length; i++) {

        if (nome[i] === "1" || nome[i] === "2" || nome[i] === "3" || nome[i] === "4" || nome[i] === "5" || nome[i] === "6" || nome[i] === "7" || nome[i] === "8" || nome[i] === "9" || nome[i] === "0") {
            return false
        }
        
    }
} else {
    return true 
}
}

export default validaNome