

function formatarData(data) {

    let dataNaoFormatada = new Date(data);
    let dataFormatada = ((dataNaoFormatada.getDate()  + "/" + ((dataNaoFormatada.getMonth() + 1)) + "/" +  dataNaoFormatada.getFullYear() )) ;                 
    return dataFormatada
}

export default formatarData

