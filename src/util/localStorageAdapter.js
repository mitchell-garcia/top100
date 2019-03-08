/**
 * Tiny little localstorage proxy
 * Will catch errors.. Unlike some other ones, that will not be named.
 */

var localStorageAdapter = {
    setItem(key, value) {
      try {
        localStorage.setItem(`top100:${key}`, value);
        return true;
      } catch(e) {
        console.info('Saving settings to local storage failed! If in private mode, this is expected behavior.');
        return true;
      }
    },
    getItem(key) {
      try {
        var item = localStorage.getItem(`top100:${key}`);
        if(item !== '') {
          return item;
        } else {
          return false;
        }
      } catch(e) {
        console.info('Fetching settings from local storage failed! If in private mode, this is expected behavior.');
        return false;
      }
    }
  };
  
  module.exports = localStorageAdapter;