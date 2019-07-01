module.exports = {

    remove_character : (str_to_remove, str) => {
        let reg = new RegExp(str_to_remove)
        return str.replace(reg, '');
      }

}