var data= {
    chatinit:{
        title: ["مرحبا بزوارنا الكرام ، الرجاء اختيار اللغه"],
        options: ["العربيه","English"]
    },
    // العربيه ==================
    العربيه: {
        title:["من فضلك،اختار من القائمه"],
        options:['متى يمكنني التحويل بين الكليات؟','مـا هي متطلبات التقديم للجامعة؟','ما هي التخصصات المتوفره في الجامعة ؟','المزيد'],
        url : {
            
        }
    },

    متى: {
        title:["التحويل بين الكليات بعد سنة من الدراسة في الكلية - التحويل بين التخصصات في نفس الكلية بعد ترم من دراسة التخصص"],
        url : {
            
        }
    },
    

    مـا: {
        title:["النسبة الموزونة.                 شروط القبول للمقيمين - غير السعوديين – (إقامة سارية المفعول ، التقديم على اختبار القدرات والتحصيلي ، يتم التقديم عن رابط خاص للمقيمين)"],
        url : {
            
        }
    },
        

    ما: {
        title:["( كلية الهندسة  - كلية العلوم الطبية التطبيقية  - كلية العلوم - كلية التربية - كلية الآداب)"],
        url : {
            
        }
    },


    // English ==================
    english: {
        title:["Please choose from the list"],
        options:['When can i transfer between colleges?','What are the requirements for applying to this university?','Whatare the colleges available at the university?'],
        url : {
            
        }
    },

    when: {
        title:["You can transfer between colleges after a year from studying in your current college."],
        url : {
            
        }
    },

    what: {
        title:["your weighted gpa. -- for non saudi residents : (a valid residency, taking the general aptitude test (GAT) and the (SAAT), you can apply through a specified link for non saudi residents)."],
        url : {
            
        }
    },

    whatare: {
        title:["(College Of Engineering  - College Of Applied Medical Sciences - College Of Science - College Of Education - College Of Literature)"],
        url : {
            
        }
    },
};

document.getElementById("init").addEventListener("click",showChatBot);
var cbot= document.getElementById("chat-box");

var len1= data.chatinit.title.length;

function showChatBot(){
    console.log(this.innerText);
    if(this.innerText=='ابدأ الشات'){
        document.getElementById('test').style.display='block';
        document.getElementById('init').innerText='اغلق الشات';
        initChat();
    }
    else{
        location.reload();
    }
}

function initChat(){
    j=0;
    cbot.innerHTML='';
    for(var i=0;i<len1;i++){
        setTimeout(handleChat,(i*500));
    }
    setTimeout(function(){
        showOptions(data.chatinit.options)
    },((len1+1)*500))
}

var j=0;
function handleChat(){
    console.log(j);
    var elm= document.createElement("p");
    elm.innerHTML= data.chatinit.title[j];
    elm.setAttribute("class","msg");
    cbot.appendChild(elm);
    j++;
    handleScroll();
}

function showOptions(options){
    for(var i=0;i<options.length;i++){
        var opt= document.createElement("span");
        var inp= '<div>'+options[i]+'</div>';
        opt.innerHTML=inp;
        opt.setAttribute("class","opt");
        opt.addEventListener("click", handleOpt);
        cbot.appendChild(opt);
        handleScroll();
    }
}

function handleOpt(){
    console.log(this);
    var str= this.innerText;
    var textArr= str.split(" ");
    var findText= textArr[0];
    
    document.querySelectorAll(".opt").forEach(el=>{
        el.remove();
    })
    var elm= document.createElement("p");
    elm.setAttribute("class","test");
    var sp= '<span class="rep">'+this.innerText+'</span>';
    elm.innerHTML= sp;
    cbot.appendChild(elm);

    console.log(findText.toLowerCase());
    var tempObj= data[findText.toLowerCase()];
    handleResults(tempObj.title,tempObj.options,tempObj.url);
}

function handleDelay(title){
    var elm= document.createElement("p");
        elm.innerHTML= title;
        elm.setAttribute("class","msg");
        cbot.appendChild(elm);
}

function handleResults(title,options,url){
    for(let i=0;i<title.length;i++){
        setTimeout(function(){
            handleDelay(title[i]);
        },i*500)
        
    }

    const isObjectEmpty= (url)=>{
        return JSON.stringify(url)=== "{}";
    }

    if(isObjectEmpty(url)==true){
        console.log("having more options");
        setTimeout(function(){
            showOptions(options);
        },title.length*500)
        
    }
    else{
        console.log("end result");
        setTimeout(function(){
            handleOptions(options,url);
        },title.length*500)
        
    }
}

function handleOptions(options,url){
    for(var i=0;i<options.length;i++){
        var opt= document.createElement("span");
        var inp= '<a class="m-link" href="'+url.link[i]+'">'+options[i]+'</a>';
        opt.innerHTML=inp;
        opt.setAttribute("class","opt");
        cbot.appendChild(opt);
    }
    var opt= document.createElement("span");
    var inp= '<a class="m-link" href="'+url.more+'">'+'See more</a>';

    const isObjectEmpty= (url)=>{
        return JSON.stringify(url)=== "{}";
    }

    console.log(isObjectEmpty(url));
    console.log(url);
    opt.innerHTML=inp;
    opt.setAttribute("class","opt link");
    cbot.appendChild(opt);
    handleScroll();
}

function handleScroll(){
    var elem= document.getElementById('chat-box');
    elem.scrollTop= elem.scrollHeight;
}

function addUserMessage(message) {
    var chatBox = document.getElementById("chat-box");
    var userMessageElement = document.createElement("p");
    userMessageElement.className = "msg";
    userMessageElement.innerHTML = message;
    chatBox.appendChild(userMessageElement);
    handleScroll();
}

function handleUserMessage(message) {
    addUserMessage(message);
}

var chatForm = document.querySelector(".chatbox-message-form");
var chatInput = document.querySelector(".chatbox-message-input");

chatForm.addEventListener("submit", function(e) {
    e.preventDefault();
    var userMessage = chatInput.value;
    if (userMessage.trim() !== "") {
        handleUserMessage(userMessage); 
        chatInput.value = ""; 
    }
});

function handleUserMessage(message) {
    addUserMessage(message); 
    
    if (data.hasOwnProperty(message)) {
        var userOptions = data[message].options;
        var userUrl = data[message].url;
        showOptions(userOptions, userUrl);
    } else {
        var errorMessage = "لم أستطع فهم طلبك، الرجاء الاختيار من الاختيارات المعروضه امامك";
        var errorElement = document.createElement("p");
        errorElement.setAttribute("class", "rep");
        errorElement.innerHTML = errorMessage;
        cbot.appendChild(errorElement);
        handleScroll();
    }
}

function showOptions(options, url) {
    for (var i = 0; i < options.length; i++) {
        var opt = document.createElement("span");
        var inp = '<div>' + options[i] + '</div>';
        opt.innerHTML = inp;
        opt.setAttribute("class", "opt");
        opt.addEventListener("click", handleOpt);
        cbot.appendChild(opt);
        handleScroll();
    }

    if (!isObjectEmpty(url)) {
        var opt = document.createElement("span");
        var inp = '<a class="m-link" href="' + url.more + '">See more</a>';
        opt.innerHTML = inp;
        opt.setAttribute("class", "opt link");
        cbot.appendChild(opt);
        handleScroll();
    }
}
