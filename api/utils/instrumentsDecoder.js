const binaryToInstruments = async (biner)=> {
    var buffer;
    if(biner.charAt(0)== '1'){
        buffer = "Bass";
        buffer += ", ";
    }
    if(biner.charAt(1)=='1'){
        buffer += "Gitar";
        buffer += ", ";
    }
    if(biner.charAt(2)=='1'){
        buffer += "Keyboard";
        buffer += ", ";
    }
    if(biner.charAt(3)=='1'){
        buffer += "Drum";
        buffer += ", ";
    }
    if(biner.charAt(4)=='1'){
        buffer += "Vocal";
        buffer += ", ";
    }
    if(biner.charAt(5)=='1'){
        buffer += "Violin";
        buffer += ", ";
    }
    if(biner.charAt(6)=='1'){
        buffer += "String";
        buffer += ", ";
    }
    if(biner.charAt(7)=='1'){
        buffer += "Piano";
        // buffer += ", ";
    }
    return buffer;
};

const instrumentsToBinary = async (instruments) => {
    // console.log(instruments);
    var buffer = [];
    var ret = [];
    buffer = instruments.split('-');

    if(instruments.toLowerCase().includes('bass')){
        ret = '1';
    }
    else {
        ret +='0';
    }
    if(instruments.toLowerCase().includes('gitar')){
        ret += '1';
    }
    else {
        ret +='0';
    }
    if(instruments.toLowerCase().includes('keyboard')){
        ret += '1';
    }
    else {
        ret +='0';
    }
    if(instruments.toLowerCase().includes('drum')){
        ret += '1';
    }
    else {
        ret +='0';
    }
    if(instruments.toLowerCase().includes('vocal')){
        ret += '1';
    }
    else {
        ret +='0';
    }
    if(instruments.toLowerCase().includes('violin')){
        ret += '1';
    }
    else {
        ret +='0';
    }
    if(instruments.toLowerCase().includes('string')){
        ret += '1';
    }
    else {
        ret +='0';
    }
    if(instruments.toLowerCase().includes('piano')){
        ret += '1';
    }
    else {
        ret +='0';
    }


    return ret;

};

const compare = async (binary1,binary2)=> {
    var total_match = 0;
    var one_logic_total= 0;
    var used_lenght = binary2.length;
    if(binary1.length >= binary2.length){
        used_lenght = binary1.length;
    }
    // console.log("asdasdas",binary1);
    for (let index = 0; index < used_lenght; index++) {
        // Safety
        if(index>binary1.length){
            binary1[index] = '0';
        }
        if(index>binary2.length){
            binary2[index] = '0';
        }
        // console.log(index,"->",binary1.charAt(index));
        if(binary1.charAt(index)=='1'){
            one_logic_total++;
            if(binary2.charAt(index)=='1'){
                // ret.charAt(index)='1';
                total_match++;
            }
            // else {
            //     ret.charAt(index)='0';
            // }
        }
        // else {
        //     ret.charAt(index)='0';
        // }
    }
    // console.log(total_match,"     ",one_logic_total);
    if(total_match == one_logic_total && one_logic_total > 0){
        return 1
    }
    else {
        return 0;
    }
}

module.exports = {
    binaryToInstruments,
    instrumentsToBinary,
    compare
};