

function formatarData(data) {

    let dataNaoFormatada = new Date(data);
    let dataFormatada = (( dataNaoFormatada.getFullYear() + "-" + ((dataNaoFormatada.getMonth() + 1 < 10 ? '0' + (dataNaoFormatada.getMonth()+1)  : dataNaoFormatada.getMonth() + 1)) + "-" +  (dataNaoFormatada.getDate() > 10 ? dataNaoFormatada.getDate() : '0' + dataNaoFormatada.getDate() ))) ;                 
    return dataFormatada
}

export default formatarData

