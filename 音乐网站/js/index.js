
$(document).ready(function(){

// ***********动画函数**************//
    function animate(ele,obj,time,fn){
        var count = 0;
        for(var attr in obj){
            singleAnimate(attr);
            count++;
        }
        function singleAnimate(attr){
            var target = obj[attr];
            var timer = attr + "Timer"; 
            clearInterval(ele[timer]);
            target = attr == "opacity"? target*100 : target;
            ele[timer] = setInterval(()=>{
                var current = getComputedStyle(ele)[attr];
                var unit = current.match(/[a-z]+$/);
                unit = unit ? unit[0] : "";
                current = parseFloat(current);
                current = attr == "opacity"? current*100 : current;

                var speed = (target-current)/10; 
                speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
                current += speed;
                if(current == target){
                    clearInterval(ele[timer]);
                    count--;
                }
                if(count == 0){
                
                    typeof fn == "function" && fn();
                }
                current = attr == "opacity"? current/100 : current;
                ele.style[attr] = current + unit;
            },time)
        }

    }

//************调用轮播图函数*********//
     let focus = document.querySelector(".banner");
            let imgList = focus.children[0];
            let firstImg = imgList.children[0].children[0];
            let cloneLi = firstImg.parentElement.cloneNode(true);
            imgList.appendChild(cloneLi);
            let len = imgList.children.length;
            let idx = 0;
            let imgWidth;
            let page = createPage();

            firstImg.onload = ()=>{
                imgWidth = firstImg.offsetWidth;
                focus.style.width = imgWidth + 'px';
                imgList.style.width = imgWidth * len + 'px';
            }

            let timer = setInterval(()=>{
                idx++;
                showPic();
            },3000)
       
            page.onclick = function(e){
                idx= e.target.innerHTML-1;
                showPic();
            }
 

            function createPage(){
                let page = document.createElement("div");
                page.classList.add("page");
                for(let i=1;i<len;i++){
                    let span = document.createElement("span");
                    span.innerHTML = i;
                    page.appendChild(span);
                }
                page.children[0].classList.add("active");
                focus.appendChild(page);
                return page;
            }

            function showPic(){
                if(idx>=len){
                    imgList.style.left = 0;
                    idx = 1;
                }

                for(var i=0;i<len-1;i++){
                    page.children[i].classList.remove("active");
                }
                if(idx == len-1){
                    page.children[0].classList.add("active");
                }else{
                    page.children[idx].classList.add("active");
                }
 
                animate(imgList,{left:-imgWidth*idx},30)
            }
            let Cover = document.getElementById("Cover");

//************请求精选歌单函数1******//
    var p = new Promise(function(resolve,reject){
        $.ajax({
            url:"http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList",    //请求的url地址
            dataType: "jsonp",
            jsonp: "callback",
            // jsonpCallback: "historySearchHandler",
            async:true,//请求是否异步，默认为异步，这也是ajax重要特性
            data:{"type":"2","size":"1","offset":"0"},    //参数值,键值对
            type:"GET",   //请求方式
            beforeSend:function(){
                 $("#choicenes").append("<div class='ccc'><img src='./images/loading.gif' /><div>");
            }
        })
        .then(function(req){
            // console.log("发起请求成功")
            $("#choicenes").html( `
             <div class="cpt cptBig">
                    <p class="cptT"><span class="iconfont icon-tingdan"></span><span class="num">试听</span></p>
                      <a href="./html/music.html?songId=${req.song_list[0].song_id}" target="_blank">
                          <img src="${req.song_list[0].pic_s500}" width="320" height="240"loading="1" class=" ">
                      </a>
                        
                    <a href="./html/music.html?songId=${req.song_list[0].song_id}" target="_blank">
                        <div class="Cover" id="Cover">
                        <div class="playBtn iconfont icon-shipinbofang1" data-index="0" data-id="585616" style="display: block;"></div>
                        </div>
                        <p class="cptBg"></p>
                        <div class="cptB">
                            <p class="songListName">${req.song_list[0].album_title}</p>
                            <p class="songListSinger">${req.song_list[0].artist_name}</p>
                        </div>
                    </a>
                </div>`)
                vv();
                $(".ccc").remove();
        })
        .catch(function(){
            console.log("发起请求错误")
        })
    })

//************请求精选歌单函数2******//
    function vv(){
        var p = new Promise(function(resolve,reject){
            $.ajax({
                url:"http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList",
                dataType: "jsonp",
                jsonp: "callback",
                // jsonpCallback: "historySearchHandler",
                async:true,//请求是否异步，默认为异步，这也是ajax重要特性
                data:{"type":"2","size":"4","offset":"2"}, 
                type:"GET",   //请求方式
                beforeSend:function(){
                     $("#choiceness").append("<div class='ccc'><img src='./images/loading.gif' /><div>");
                }
            })
            .then(function(req){
                    // console.log("上一次的函数已经执行")
                    let song_choiceness = req.song_list.map(function(item){
                        return `
                            <div class="cpt cptMid">
                                <p class="cptT"><span class="iconfont icon-tingdan"></span><span class="num">试听</span></p>
                                    <a href="./html/music.html?songId=${item.song_id}" target="_blank">
                                         <img src="${item.pic_s500}" width="320" height="240"  loading="1" class=" ">
                                    </a>
                                <a href="./html/music.html?songId=${item.song_id}" target="_blank">
                                    <div class="Cover" >
                                    
                                    <div class="playBtn iconfont icon-shipinbofang1" data-index="1" data-id="588229" style="display: block;"></div>
                                    </div>
                                    <p class="cptBg"></p>
                                    <div class="cptB">
                                        <p class="songListName">${item.album_title}</p>
                                        <p class="songListSinger">${item.artist_name}</p>
                                    </div>
                                </a>
                        </div>
                        `
                    }).join("");
                    $("#choicenes").append(song_choiceness);
                    hh();
            })
            .catch(function(err){
                console.log("上一次的函数没有执行")
            })

        })
    }

//************请求热门歌曲***********//
    function hh(){
        let hot = new Promise(function(resolve,reject){
        $.ajax({
        url:"http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList",    //请求的url地址
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "historySearchHandler",
        async:false,//请求是否异步，默认为异步，这也是ajax重要特性
        data:{"type":"2","size":"3","offset":"6"},    //参数值,键值对
        type:"GET",   //请求方式
            beforeSend:function(){
                 $("#song_hot").append("<div class='ccc'><img src='./images/loading.gif' /><div>");
            },
            complete:function(){
               $(".ccc").remove();
            },

        }).then(function(req){
             let songHot = req.song_list.map(function(item){
                return `
                    <div class="listItem">
                     <a href="./html/music.html?songId=${item.song_id}" target="_blank">
                        <div class="Cover" >
                            <div class="playBtn iconfont icon-shipinbofang1" data-id="6666"></div>
                        </div>
                       
                        <img src="${item.pic_s500}" width="320" height="240" _def="https://staticssl.kugou.com/public/root/images/rankdefalut.jpg" loading="1" class=" ">
                        <div class="list">
                            <dl>
                                <dt>黑眼圈推荐</dt>
                                    <dd>${item.artist_name}</dd>
                                    <dd>${item.album_title}</dd>
                            </dl>
                        </div>
                    </a>
                </div>
                `
            }).join("");
           $('#song_hot').html(songHot);
        })
    })
    }
    


//*************请求列表数据**********//
    let sList = new Promise(function(resolve,reject){
        $.ajax({
            url:"http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList",    //请求的url地址
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "historySearchHandler",
            async:false,//请求是否异步，默认为异步，这也是ajax重要特性
            data:{"type":"1","size":"8","offset":"0"},    //参数值,键值对
            type:"GET",   //请求方式
            beforeSend:function(){
                 $("#songList").append("<div id='ccc'><img src='./images/loading.gif' /><div>");
            },
             complete:function(){
               $("#ccc").remove();
            },
        }).then(function(req){
            let datas = req.song_list;
            let songLists = datas.map(function(item){
                return `<li>
                <a href = "./html/music.html?songId=${item.song_id}" target="_blank">
                <span class="song_title">
                    ${item.artist_name}-${item.album_title}
                </span>
                <div>
                    <i class="iconfont icon-tingdan"></i>
                    <span class="songTime">试听</span>
                </div>
                                    
                </a>
                </li>`
            }).join("");
            $("#songList").html(songLists);
            ii();
        })
    })

//*************请求网络榜单**********//
    function ii(){
         let inter = new Promise(function(resolve,reject){
        $.ajax({
            url:"http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList",    //请求的url地址
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "historySearchHandler",
            async:true,//请求是否异步，默认为异步，这也是ajax重要特性
            data:{"type":"25","size":"3","offset":"0"},    //参数值,键值对
            type:"GET",   //请求方式
            beforeSend:function(){
                $("#songInter").append("<div class='ccc'><img src='./images/loading.gif' /><div>");
            },
            complete:function(){
                 $(".ccc").remove();
            },
        }).then(function(req){
            song_inter(req);
        })
    })
    }

        // 网络榜单请求成功时的函数
        song_inter = function(data){
            let datas =data.song_list;
            $("#songInter")[0].innerHTML = 
                `
                    <div class="cpt cptBigL">
                        <a target="_blank" href="./html/music.html?songId=${datas[0].song_id}">
                                  <img src="${datas[0].pic_s500}" width="320" height="175"/>
                            <div class="Cover">
                                <div class="playBtn iconfont icon-shipinbofang1"></div>
                            </div>
                            <p class="cptBg"></p>
                            <div class="cptB">
                                <p class="songListName">${datas[0].album_title}</p>
                                <p class="songListSinger">${datas[0].artist_name}</p>
                            </div>
                        </a>
                    </div>
                    <div class="cpt cptMidL"> 
                        <a target="_blank" href="./html/music.html?songId=${datas[1].song_id}">
                            
                                   <img  width="154" height="84" src="${datas[1].pic_s500}"/>
                            
                            <div class="Cover">
                                <div class="playBtn iconfont icon-shipinbofang1"></div>
                            </div>
                            <p class="cptBg"></p>
                            <div class="cptB">
                                <p class="songListName">${datas[1].album_title}</p>
                                <p class="songListSinger">${datas[1].artist_name}</p>
                            </div>
                        </a>
                    </div>
                    <div class="cpt cptMidL">  
                        <a target="_blank" href="./html/music.html?songId=${datas[2].song_id}">
                                   <img width="154" height="84" src="${datas[2].pic_s500}"/>
                            
                            <div class="Cover">
                                <div class="playBtn iconfont icon-shipinbofang1"></div>
                            </div>
                            <p class="cptBg"></p>
                            <div class="cptB">
                                <p class="songListName">${datas[2].album_title}</p>
                                <p class="songListSinger">${datas[2].artist_name}</p>
                            </div>
                        </a>
                    </div>
                `
            
        }
//**************摇滚歌曲*************//
    let rock = new Promise(function(resolve,reject){
        $.ajax({
            url:"http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList",    //请求的url地址
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "historySearchHandler",
            async:false,//请求是否异步，默认为异步，这也是ajax重要特性
            data:{"type":"11","size":"5","offset":"0"},    //参数值,键值对
            type:"GET",   //请求方式
            beforeSend:function(){
                 $("#rock").append("<div class='ccc'><img src='./images/loading.gif' /><div>");
            },
            complete:function(){
               $(".ccc").remove();
         
            },
        }).then(function(req){
            let songRock = req.song_list.map(function(item){
                return `
                    <li data-index="${item.song_id}">
                                <p class="r-pic">
                                    <a href="./html/music.html?songId=${item.song_id}" target="_blank"><img src="${item.pic_s500}"  alt="${item.album_title}"></a><span class="lisBg"></span>
                                    <a class="bcount56 iconfont icon-shipinbofangyingpian" href="./html/music.html?songId=${item.song_id}" target="_blank" vid="105183652">试听</a>
                                </p>
                                <div class="r-neck" uname="sh-eoxwurokgc">
                                    <a href="./html/music.html?songId=${item.song_id}" class="useravatar" target="_blank"><img src="${item.pic_small}" alt=""></a>
                                    <a href="./html/music.html?songId=${item.song_id}"target="_blank" class="username">${item.artist_name}</a>
                                </div>
                                <h3><a href="./html/music.html?songId=${item.song_id}" target="_blank">${item.album_title}</a></h3>
                            </li>
                `
            }).join("");
           $('#rock').html(songRock);
        })
    })
    
    //     success:function(req){
    //         let songRock = req.song_list.map(function(item){
    //             return `
    //                 <li data-index="${item.song_id}">
    //                             <p class="r-pic">
    //                                 <a href="./html/music.html?songId=${item.song_id}" target="_blank"><img src="${item.pic_s500}"  alt="${item.album_title}"></a><span class="lisBg"></span>
    //                                 <a class="bcount56 iconfont icon-shipinbofangyingpian" href="./html/music.html?songId=${item.song_id}" target="_blank" vid="105183652">1,342</a>
    //                             </p>
    //                             <div class="r-neck" uname="sh-eoxwurokgc">
    //                                 <a href="./html/music.html?songId=${item.song_id}" class="useravatar" target="_blank"><img src="${item.pic_small}" alt=""></a>
    //                                 <a href="./html/music.html?songId=${item.song_id}"target="_blank" class="username">${item.artist_name}</a>
    //                             </div>
    //                             <h3><a href="./html/video.html?idx=1" target="_blank">${item.album_title}</a></h3>
    //                         </li>
    //             `
    //         }).join("");
    //        $('#rock').html(songRock);

    //     },
    //     complete:function(){
    //        $(".ccc").remove();
     
    //     },
    //     error:function(){
    //         //请求出错处理
    //     }
    // });

    
});

    