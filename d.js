import {Chat,getToken,getPath} from'./chat.js';
import {setKey,client} from './client.js';
import {getConversations,
  getConversation,
  deleteConversation,
  getQuota,
  buyQuota,
  getPackage,
  getSubscription,
  buySubscription} from'./api.js'
try {
function btn(e,f){
document.querySelector(e).addEventListener('click',(event)=>{f(event)})
}
setKey("sk-3ff......")
//getQuota().then(o=>{alert(o)})
//getConversations().then(o=>{alert(JSON.stringify(o))})


    let chat = new Chat(-1)
    btn('#send',()=>{
        chat.ask({
        message: $('input').value,
        model: prompt("使用的模型", 'gpt-3.5-turbo'),
        type:'chat'
        }).then(res=>{
        document.querySelector('#message').innerHTML += JSON.stringify(res);
        })
        })
        /*chat.askStream({
        message: $('input').value,
        model: 'claude-2'
        //说个有意思的，这个model参数如果打错了字，那么无论有多少点数都会告诉你点数不够要付钱
    }, (res) => {
        //alert(JSON.stringify(res))
        //alert('啊')
        document.querySelector('#message').innerHTML += JSON.stringify(res);
    });
    })*/
    btn('#text',()=>{
var code = "";
        if (localStorage.code) {
            code = localStorage.code;
        }
        let proCode = prompt("请输入代码", code)
        let pro = "try{" + proCode + ";alert('命令执行成功')}catch(err){alert('命令错误：'+err.message)}";
        if (proCode) {
            eval(pro)
            localStorage.code = proCode;
        }
})
} catch (err) {
    alert("error:" + err.message)
}
