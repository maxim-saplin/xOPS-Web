import l18n from '../translations';

let platforms, tests;
const shortcutRegex = /[^\[]+(?=\])/;

function addShortcut(obj) {
  let match = obj.name.match(shortcutRegex);
  if (match && match.length === 1)
    obj.shortcut = match[0].toLowerCase();
}

function getEntities(items) {
  return items.map(i => {
      let obj = {
        key: i,
        name: l18n[i] ? l18n[i] : i,
        shortcut: null
      };
      addShortcut(obj);
      return obj;
    });
}

function getEntitiesWithL18nMod(items, mod) {
  return items.map(i => {
      let obj = {
        key: i,
        name: l18n[i+mod] ? l18n[i+mod] : i,
        shortcut: null
      };
      addShortcut(obj);
      return obj;
    });
}

const dictionaries = 
{
  getTests : function(){
    if (!tests) tests = getEntitiesWithL18nMod(this.data.tests,"_s");
    return tests;
  },  

  getPlatforms : function(){
      if (!platforms){
        platforms = getEntities(this.data.platforms);

        let keys = platforms.map(p => p.key);

        if (keys.length !== 4) console.log("Invalid number of platforms in DB, 3 supported, found "+keys.length);
        if (!keys.includes(this.Windows)) console.log("Windows platfrom not found in DB");
        if (!keys.includes(this.Android)) console.log("Android platfrom not found in DB");
        if (!keys.includes(this.macOS)) console.log("macOS platfrom not found in DB");
      }
      return platforms;
  }
}

dictionaries.ST_FLT = "ST_FLT";
dictionaries.MT_FLT = "MT_FLT";
dictionaries.ST_INT = "ST_INT";
dictionaries.MT_INT = "MT_INT";

dictionaries.Windows = "Windows";
dictionaries.Android = "Android";
dictionaries.macOS = "macOS";

export default dictionaries;