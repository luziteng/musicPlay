
$(document).ready(function(){
     //=================获取url中的参数==========//
          function getUrlParam(name) {
           var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
           var r = window.location.search.substr(1).match(reg); //匹配目标参数
           if (r != null) return unescape(r[2]); return null; //返回参数值
          }

          
          
          let getSongPlay = new Promise(function(resolve,reject){
              let songId = getUrlParam('songId');
              $.ajax({
                url:"http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play",    //请求的url地址
                dataType: "jsonp",
                jsonp: "callback",
                jsonpCallback: "historySearchHandler",
                async:true,//请求是否异步，默认为异步，这也是ajax重要特性
                data:{songid:songId},    //单个键值对时不需要加双引号
                type:"GET",   //请求方式
                 beforeSend:function(){
                 $(".musicContent").append("<div class='ccc'><img src='../images/loading.gif' /><div>");
                },
                complete:function(){
                   $(".ccc").remove();
                },
              }).then(function(req){
                    console.log(req); 
                    $(".musicContent").html( `
                       <div class="musicTop">
                          <div class="songImg">
                             <img src="${req.songinfo.pic_premium}" alt="">
                          </div>
                         <div class="songContent">
                             <span class="song_name">${req.songinfo.album_title}</span>
                             <span class="song_autor">歌手：${req.songinfo.author}</span>
                             <div class="songLyric">
                                <ul class="liLyric" id="lrc">
                                    
                                    
                                </ul>
                             </div>
                         </div>
                      </div>
                      <audio controls autoplay>
                          <source src="${req.bitrate.show_link}">
                          <source src="${req.bitrate.show_link}">
                          <source src="${req.bitrate.show_link}">
                      </audio>
                    `);
                  getLry();
                  audio.ontimeupdate = function () {
                    console.log(1);
                    if (lineNo == medisArray.length - 1 && audio.currentTime.toFixed(3) >= parseFloat(medisArray[lineNo].t)) {
                        linehight(lineNo);
                        //break;
                    }
                    if (parseFloat(medisArray[lineNo].t) <= audio.currentTime.toFixed(3) &&
                        audio.currentTime.toFixed(3) <= parseFloat(medisArray[lineNo + 1].t)) {
                        linehight(lineNo);
                        lineNo++;
                    }
                  };
              })
          })
        
        function getLry(){
           let getLyric = new Promise(function(resolve,reject){
            let songId =  getUrlParam('songId');
                 $.ajax({
                    url:"http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.lry",    //请求的url地址
                    dataType: "jsonp",
                    jsonp: "callback",
                    jsonpCallback: "historySearchHandler",
                    async:true,//请求是否异步，默认为异步，这也是ajax重要特性
                    data:{songid:songId},    //参数值,键值对
                    type:"GET",   //请求方式
                     beforeSend:function(){
                     $(".songLyric").append("<div class='ccc'><img src='../images/loading.gif' /><div>");
                    },
                    complete:function(){
                     $(".ccc").remove();
                  },
                 }).then(function(req){
                  console.log(req.lrcContent);
                  var medisArray = new Array();
                     var medises = req.lrcContent.split("\n");
                  //console.log(parseLyric(req.lrcContent));
                          $.each(medises, function (i, item) {
                            var t = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
                            medisArray.push({
                     
                                t: (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(3),
                                c: item.substring(item.indexOf("]") + 1, item.length)
                            });
                        });
                        var ul = $(".liLyric");
                        $.each(medisArray, function (i, item) {
                            var li = $("<li>");
                            li.html(item.c);

                            ul.append(li);
                        });
                    });
               
           })
        }

        var linehight = function (lineno) {
        var ul = $("#lrc");
        var $ul = document.getElementById('lrc');
     
        if (lineno > 0) {
            $(ul.find("li").get(topNum + lineno - 1)).removeClass("lineheight");
        }
        var nowline = ul.find("li").get(topNum + lineno);
        $(nowline).addClass("lineheight");
     
        var _scrollTop;
        $ul.scrollTop = 0;
        if ($ul.clientHeight * fraction > nowline.offsetTop) {
            _scrollTop = 0;
        } else if (nowline.offsetTop > ($ul.scrollHeight - $ul.clientHeight * (1 - fraction))) {
            _scrollTop = $ul.scrollHeight - $ul.clientHeight;
        } else {
            _scrollTop = nowline.offsetTop - $ul.clientHeight * fraction;
        }
     
     
        //以下声明歌词高亮行固定的基准线位置成为 “A”
        if ((nowline.offsetTop - $ul.scrollTop) >= $ul.clientHeight * fraction) {
            //如果高亮显示的歌词在A下面，那就将滚动条向下滚动，滚动距离为 当前高亮行距离顶部的距离-滚动条已经卷起的高度-A到可视窗口的距离
            $ul.scrollTop += Math.ceil(nowline.offsetTop - $ul.scrollTop - $ul.clientHeight * fraction);
     
        } else if ((nowline.offsetTop - $ul.scrollTop) < $ul.clientHeight * fraction && _scrollTop != 0) {
            //如果高亮显示的歌词在A上面，那就将滚动条向上滚动，滚动距离为 A到可视窗口的距离-当前高亮行距离顶部的距离-滚动条已经卷起的高度
            $ul.scrollTop -= Math.ceil($ul.clientHeight * fraction - (nowline.offsetTop - $ul.scrollTop));
     
        } else if (_scrollTop == 0) {
            $ul.scrollTop = 0;
        } else {
            $ul.scrollTop += $(ul.find('li').get(0)).height();
        }
     
    }


          


      function parseLyric(lrc) {
        var lyrics = lrc.split("\n");
        var lrcObj = {};
        for (var i = 0; i < lyrics.length; i++) {
          var lyric = decodeURIComponent(lyrics[i]);
          var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
          var timeRegExpArr = lyric.match(timeReg);
          if (!timeRegExpArr) continue;
          var clause = lyric.replace(timeReg, '');
          for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
            var t = timeRegExpArr[k];
            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
              sec = Number(String(t.match(/\:\d*/i)).slice(1));
            var time = min * 60 + sec;
            lrcObj[time] = clause;
          }
        }
        return lrcObj;
      }
         //  // 通过ID音乐请求函数
         // var playMusic =new Promise(function(resolve,reject){

         //      $.ajax({
         //        url:"http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid=877578",    //请求的url地址
         //        dataType: "jsonp",
         //        jsonp: "callback",
         //        jsonpCallback: "historySearchHandler",
         //        async:true,//请求是否异步，默认为异步，这也是ajax重要特性
         //        //data:{"songid":"songId"},    //参数值,键值对
         //        type:"GET",   //请求方式
         //         beforeSend:function(){
         //         $(".musicContent").append("<div class='ccc'><img src='./images/loading.gif' /><div>");
         //        },
         //        success:function(req){
         //            console.log(req); 
         //            let ly = req.songinfo.lrclink;
         //            console.log(ly);
         //            let lys=parseLyric(ly);
         //            $(".musicContent").html( `
         //             <div class="musicTop">
         //                <div class="songImg">
         //                   <img src="${req.songinfo.pic_premium}" alt="">
         //                </div>
         //               <div class="songContent">
         //                   <span class="song_name">${req.songinfo.album_title}</span>
         //                   <span class="song_autor">${req.songinfo.author}</span>
         //                   <div class="songLyric">
         //                      <ul class="liLyric">
                                  
                                  
         //                      </ul>
                               
         //                   </div>
         //               </div>
         //            </div>
                
         //                <audio controls autoplay>
         //                    <source src="${req.bitrate.show_link}">
         //                    <source src="${req.bitrate.show_link}">
         //                    <source src="${req.bitrate.show_link}">
         //                </audio>
         //            `)
                   
            
         //        },
         //        complete:function(){
         //           $(".ccc").remove();
         //        },
         //        error:function(){
         //            //请求出错处理
         //        }
         //    });
         //  })


         

});