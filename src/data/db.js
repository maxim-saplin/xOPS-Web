import dictionaries from './dictionaries';
import results from './results';

const db_version_url = "https://raw.githubusercontent.com/maxim-saplin/xOPS-Web/master/Results_version.json";
let db_url = "https://raw.githubusercontent.com/maxim-saplin/xOPS-Web/master/Results.json";
const db_version_sotrage_key = "xops_db_version";
const db_sotrage_key = "xops_db";

const db = {
    dictionaries : dictionaries,
    results : results,
    
    init: function (){
        let fetchVersion = () => {
            return new Promise (resolve => {
                fetch(db_version_url, {cache: "no-store"})
                .then(response => {
                    return response.json();
                })
                .then(result => {
                    storage.setItem(db_version_sotrage_key, result.v);
                    this.version = result.v;
                    resolve(result.v);
                });
            });
        };

        let fetchDb = () => {
            return new Promise (resolve => {
                fetch(db_url, {cache: "no-store"})
                .then(response => response.json())
                .then(result => {
                    storage.setItem(db_sotrage_key, JSON.stringify(result));
                    dictionaries.data = result;
                    results.data = result;
                    resolve(result);
                })
            });
        };

        let promise = null;

        let storage = window.localStorage;

        let data = storage.getItem(db_sotrage_key);
        if (data) {
          try { data = JSON.parse(data);} catch{};
          if (!data.results) data = null; // shallow check for corrupt data
        }
        let localDbVersion = storage.getItem(db_version_sotrage_key);

        if (data){
            promise = new Promise( resolve => {
                fetchVersion()
                .then(result => {

                    if (result !== localDbVersion){
                        fetchDb().then(result => resolve(result));                    
                    }
                    // local data is up to date
                    else{ 
                        dictionaries.data = data;
                        results.data = data;
                        resolve(data)
                    };
                });
            });
        }
        else{
            fetchVersion();
            promise = fetchDb();
        }

        return promise;
    },

    initFake: function() {
      dictionaries.data = {"results":[{"id":1,"device":"Xiaomi Mi 8 SE","platform":"Android","deviceDetail":"Snapdragon 710","deviceComment":"","deviceYear":2018,"ST_FLT":1.6,"MT_FLT":8,"ST_INT":2.5,"MT_INT":11.7,"hidden":""},{"id":2,"device":"Apple 15\" MacBook Pro","platform":"macOS","deviceDetail":"Core i7 8850H","deviceComment":"","deviceYear":2018,"ST_FLT":4.5,"MT_FLT":39.7,"ST_INT":8.2,"MT_INT":57.1,"hidden":""},{"id":3,"device":"Apple 15\" MacBook Pro","platform":"Windows","deviceDetail":"Core i7 8850H, Bootcamp","deviceComment":"","deviceYear":2018,"ST_FLT":4.3,"MT_FLT":36.5,"ST_INT":8.3,"MT_INT":54.6,"hidden":""},{"id":4,"device":"Galaxy Note 10","platform":"Android","deviceDetail":"Snapdragon 855","deviceComment":"","deviceYear":2019,"ST_FLT":3.6,"MT_FLT":21.5,"ST_INT":5,"MT_INT":21.5,"hidden":""},{"id":5,"device":"Lenovo ThinkPad 13 2nd Gen","platform":"Windows","deviceDetail":"Core i5-7200U","deviceComment":"","deviceYear":2017,"ST_FLT":3.2,"MT_FLT":9.2,"ST_INT":6.1,"MT_INT":12.5,"hidden":""}],"platforms":["Android", "macOS", "Windows"],"tests":["ST_FLT", "MT_FLT", "ST_INT", "MT_INT"]};
      results.data = dictionaries.data;
    }
};

export default db;