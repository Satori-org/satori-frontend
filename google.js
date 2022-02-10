// const translate = require('google-translate-cn-api');
const local_zh = require('./src/locales/zh_CN.json');
const local_en = require('./src/locales/en_US.json');
const tencentcloud = require("tencentcloud-sdk-nodejs");
const secret = require("E:/cfd_workspace/tencen.json");
let fs = require('fs');
let path = require('path');//解析需要遍历的文件夹
let filePath = path.resolve('./src');

// 导入对应产品模块的client models。
const TmtClient = tencentcloud.tmt.v20180321.Client;
const clientConfig = {
// 腾讯云认证信息
    credential: secret,
// 产品地域
    region: "ap-shanghai",
// 可选配置实例
    profile: {
        signMethod: "HmacSHA256", // 签名方法
        httpProfile: {
            reqMethod: "POST", // 请求方法
            reqTimeout: 30, // 请求超时时间，默认60s
        },
    },
};
// 实例化要请求产品(以cvm为例)的client对象
const client = new TmtClient(clientConfig);
/*const params = {
    "Source": "zh",
    "Target": "en",
    "ProjectId": 0,
    "SourceTextList": [
        "测试", "目的地"
    ]
};
client.TextTranslateBatch(params).then(
    (data) => {
        console.log(data);
    },
    (err) => {
        console.error("error", err);
    }
);*/

let keys = [];
let result = [];
let localData = {};
let t_en_US = {};
//调用文件遍历方法
fileDisplay(filePath, function () {
    /*存中文文件*/
    let zhData = Object.assign({}, local_zh, localData);
    let zh_str = JSON.stringify(zhData, null, 4);
    fs.writeFile(path.resolve('./src/locales/zh_CN.json'),zh_str,'utf8',function(err){

    });
    /*存英文文件*/
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
            /* 接口限制每秒5次 */
            setTimeout(() => {
                startTranslate(tranArr, targetIndex);
            }, 200);
        }


        //=> nl
    }).catch(err => {
        console.error(err);
    });
}

//文件遍历方法
function fileDisplay(filePath, callback){
    //根据文件路径读取文件，返回文件列表
    let files = fs.readdirSync(filePath);
    //遍历读取到的文件列表
    files.forEach(function(filename, fileIndex){
        //获取当前文件的绝对路径
        let filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        let fileState = fs.statSync(filedir);
        let isFile = fileState.isFile();//是文件
        let isDir = fileState.isDirectory();//是文件夹
        if(isFile && !filename.endsWith(".png")){
            let content = fs.readFileSync(filedir, 'utf-8');
            // console.log(content);
            /*标签内*/
            let regExp = new RegExp("(t\\(`)[^\\)]+(`\\))", "gi");
            /*js代码中*/
            //let regExp1 = new RegExp("([\"'])([\u4e00-\u9fa5][^\"^']*[\u4e00-\u9fa5])([\"'])", "gi");
            /*html属性*/
            //let regExp2 = new RegExp("(\"')([\u4e00-\u9fa5][^\"^']*[\u4e00-\u9fa5])('\")", "gi");

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
            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
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
