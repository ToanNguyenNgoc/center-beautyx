export const regex_valid_mail = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(myspa|clinic)\.com$/
export const isMyspaMember = (input:string) => {
    if (regex_valid_mail.test(input)) {
    console.log("it ends in @myspa");
    } 
    return regex_valid_mail.test(input);
}