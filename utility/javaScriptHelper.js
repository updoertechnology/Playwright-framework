exports.JSHelper = class JSHelper {

    async retrieveTextFromHTML(inputHTML) {
       return inputHTML.replace( /(<([^>]+)>)/ig, '');
    }

    async formatPhoneNumber(phoneNumberString) {
        var cleaned =  ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
        return phoneNumberString;
      } 
            
  async getTodaysDate() {
    let today = new Date();
    let dateStr = ('0' + (today.getMonth() + 1)).slice(-2) + '/' + ('0' + today.getDate()).slice(-2) + '/' + today.getFullYear(); 
    return dateStr;
  }
}