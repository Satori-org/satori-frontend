// const translate = require('google-translate-cn-api');
const local_zh = require('./src/locales/zh_CN.json');
const local_en = require('./src/locales/en_US.json');
const tencentcloud = require("tencentcloud-sdk-nodejs");
const secret = require("E:/cfd_workspace/tencen.json");
let fs = require('fs');
let path = require('path');
let filePath = path.resolve('./src');

//  models。
const TmtClient = tencentcloud.tmt.v20180321.Client;
const clientConfig = {

    credential: secret,
    region: "ap-shanghai",
    profile: {
        signMethod: "HmacSHA256", //
        httpProfile: {
            reqMethod: "POST", //
            reqTimeout: 30, //
        },
    },
};
//
const client = new TmtClient(clientConfig);


let keys = [];
let result = [];
let localData = {};
let t_en_US = {};
//
fileDisplay(filePath, function () {
    /**/
    let zhData = Object.assign({}, local_zh, localData);
    let zh_str = JSON.stringify(zhData, null, 4);
    fs.writeFile(path.resolve('./src/locales/zh_CN.json'),zh_str,'utf8',function(err){

    });
    /**/
    if (result.length > 0) {
        console.log(result.join("|"));
        startTranslate(result.concat());
    }
});

function startTranslate(tranArr, keysIndex = 0) {
    //let targetstr = tranArr.splice(0,20).join("\n");
    let targetstr = tranArr.splice(0,20);
    let targetIndex = keysIndex + 20;
    Promise.all([
        client.TextTranslateBatch({
            "Source": "zh",
            "Target": "en",
            "ProjectId": 0,
            "SourceTextList": targetstr
        }),
        //translate(targetstr, {to: 'zh-tw'})
    ]).then((res) => {

        // let arr = res[0].text.split("\n");
        let arr = res[0].TargetTextList;
        // let arr2 = res[1].text.split("|");
        let targetKey = keys.slice(keysIndex, targetIndex);

        targetKey.forEach((item, index) => {
            t_en_US[item] = arr[index] && arr[index].trim() || "";
        });

        /*let arr2 = res[1].text.split("|");
        let targetKey2 = keys.splice(0,20);
        targetKey.forEach((item, index) => {
            t_tw_cn[item] = arr2[index] && arr2[index].trim() || "";
        });*/


        if (tranArr.length === 0) {
            let enData = Object.assign({}, local_en, t_en_US);
            let en_str = JSON.stringify(enData, null, 4);
            fs.writeFile(path.resolve('./src/locales/en_US.json'),en_str,'utf8',function(err){

            });
            //=> I speak English
            //console.log(res.from.language.iso);
        } else {
            /*  */
            setTimeout(() => {
                startTranslate(tranArr, targetIndex);
            }, 200);
        }


        //=> nl
    }).catch(err => {
        console.error(err);
    });
}

//
function fileDisplay(filePath, callback){
    //
    let files = fs.readdirSync(filePath);
    files.forEach(function(filename, fileIndex){
        let filedir = path.join(filePath, filename);
        let fileState = fs.statSync(filedir);
        let isFile = fileState.isFile();
        let isDir = fileState.isDirectory();
        if(isFile && !filename.endsWith(".png")){
            let content = fs.readFileSync(filedir, 'utf-8');
            // console.log(content);
            let regExp = new RegExp("(t\\(`)[^\\)]+(`\\))", "gi");

            let hasChange = false;
            let str = content.replace(regExp, function (a,b,c,d) {
                let content = a.replace(b, "").replace(c,"").replace(/\r\n/gim, "");
                let key = content.slice(0,32);
                if (!localData[key]) {
                    addLocal(key, content);
                }
                hasChange = true;
                return `${b}${key}${c}`;
            });
            /*if (hasChange) {
                fs.writeFile(filedir,str,'utf8',function(err){

                })
            }*/
        }
        if(isDir && filename !== "locales"){
            fileDisplay(filedir);//
        }
        if (fileIndex === files.length - 1 && typeof  callback === 'function') {
            callback();
        }
    });
}

function addLocal(key, val) {
    if (!local_zh[key]) {
        keys.push(key);
        result.push(val);
        localData[key] = val;
    }
}
