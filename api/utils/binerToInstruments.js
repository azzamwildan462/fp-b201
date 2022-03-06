const binerToInstruments = async (biner)=> {
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

module.exports = {
    binerToInstruments
};