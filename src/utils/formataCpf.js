

function formatarCpf(cpf){
    if( cpf !== undefined){
    cpf = cpf.replace(/[^\d]/g, "");
    
    //realizar a formatação...
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
}
  console.log(formatarCpf("12345678910"));

  export default formatarCpf