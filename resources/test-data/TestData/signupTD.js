const rando = Math.random().toString(36).substring(2,7);
let locString = 'updoertest' + rando;

exports.signupTD = class signupTD {
    
    static signupurl = "https://app.earthfiler.com/signup/";

    static companyname = locString
    static sitename = locString
    static email = 'nik'+ locString+'@yopmail.com';
    static fullname = 'tester'
    static password = 'Updoer@123'
    static reenter_password = 'Updoer@123'
    
}

