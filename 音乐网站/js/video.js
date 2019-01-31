 window.onload = function(){
           //=================获取url中的参数==========//
          function getUrlParam(name) {
           var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
           var r = window.location.search.substr(1).match(reg); //匹配目标参数
           if (r != null) return unescape(r[2]); return null; //返回参数值
          }
          var idx = getUrlParam('idx');
          var ArrVideos =[
                 "https://vd4.bdstatic.com/mda-ikmxfz5yxcq8jwx3/sc/mda-ikmxfz5yxcq8jwx3.mp4?auth_key=1547799976-0-0-83cd11e3f64418079e67ab315d011a96&bcevod_channel=searchbox_feed&pd=bjh&abtest=all",
                 "https://vd1.bdstatic.com/mda-hjzpz0p7y5bm69im/vs-3c35a28e4ebade36f57da67e59704762-watermark/sc/mda-hjzpz0p7y5bm69im.mp4?auth_key=1547802353-0-0-870fba74d6b1634aecbfdd6af37f328b&bcevod_channel=searchbox_feed&pd=bjh&abtest=all",
                 "https://vd1.bdstatic.com/mda-hfykqqgfh82bx3rz/sc/mda-hfykqqgfh82bx3rz.mp4?auth_key=1547802636-0-0-6172a127727581ded0498a4621f7cd8e&bcevod_channel=searchbox_feed&pd=bjh&abtest=all",
                 "https://vd1.bdstatic.com/mda-hkfj7atefrxehm9r/hd/mda-hkfj7atefrxehm9r.mp4?auth_key=1547802732-0-0-ac28d7ddca2b7aeec7e32cba9e69cab6&bcevod_channel=searchbox_feed&pd=bjh&abtest=all",
                 "https://vd1.bdstatic.com/mda-hhsiih964kgcs5xs/mda-hhsiih964kgcs5xs.mp4?auth_key=1547812174-0-0-38e4077a9f1a867a7e398b3a8357837e&bcevod_channel=searchbox_feed&pd=bjh",
                 "https://vd1.bdstatic.com/mda-hik4cgmjr73xp3tw/mda-hik4cgmjr73xp3tw.mp4?auth_key=1547803499-0-0-0dbbc8541f63ebe6e8d1d8c0cb3b81ec&bcevod_channel=searchbox_feed&pd=bjh",
                 "https://vd2.bdstatic.com/mda-hkshu7i2jjuuxcr5/mda-hkshu7i2jjuuxcr5.mp4?auth_key=1547803645-0-0-23f23756a8297d65e69b1bb70c075ca8&bcevod_channel=searchbox_feed&pd=bjh",
                 "https://vd1.bdstatic.com/mda-hftpb5u4b8nq7323/mda-hftpb5u4b8nq7323.mp4?auth_key=1547803820-0-0-ef3dea8ce7badba762d667aeb6c711cd&bcevod_channel=searchbox_feed&pd=bjh",
                 "http://gslb.miaopai.com/stream/Lgkrt9s04QoB3pPTpFAGaaVTplU9uXYa.mp4?vend=miaopai&ssig=06f3d1c52e055dbc450559d25bd4c2f6&time_stamp=1547889178614&mpflag=32",
                 "https://vd1.bdstatic.com/mda-hg6jgh2adre7g400/mda-hg6jgh2adre7g400.mp4?auth_key=1547804203-0-0-fb0ffe2ef77dc8410bac3b9c9c258e13&bcevod_channel=searchbox_feed&pd=bjh",
                 "https://apd-2302da32dd361333d3766a61badbd4e3.v.smtcdns.com/om.tc.qq.com/AGErDhMFcv_dq9vDFC9ScziHjWNyXoTKteNqhevfuztY/uwMRJfz-r5jAYaQXGdGnC2_ppdhgmrDlPaRvaV7F2Ic/f0331m1n0hg.p712.1.mp4?sdtfrom=v1010&guid=89524f4c080e1b3fe091f51c13095d8e&vkey=63BA8C3A4C0DA0A768FCA899E29B1EEDD9E24BF4614024982783F0428D088F80CB113A88A0FC1FB2D4F6A215C971CA81D8B890412D83F58DDA1118C31B0217DFCF70F665C8DC7EF88375E54B1FC0E30185010CACA56850CD72C49ACEF6451C46A7582DDD04EDD89700C879FD066838226D59D4C7308E4A27",
                 "http://ykugc.cp31.ott.cibntv.net/697DC8B84AE35715529384241/03002001005114EB842AA3055CB749F0340DEA-3107-5649-ED94-5DA1927F0ECA.mp4?ccode=050F&duration=278&expire=18000&psid=4450b468c0fa2bcd0cf7f44eb46371d0&ups_client_netip=71449bf6&ups_ts=1547884304&ups_userid=&utid=k3KrFPsWSSwCAXFEmVnNYBck&vid=XNTEyNjExODk2&vkey=Ac8a2dcb7596b38dab76b76e7b87fd03d&sp=",
                 "https://ugcydzd.qq.com/uwMRJfz-r5jAYaQXGdGnC2_ppdhgmrDlPaRvaV7F2Ic/e03344o0ugk.p712.1.mp4?sdtfrom=v1010&guid=89524f4c080e1b3fe091f51c13095d8e&vkey=0CCBD519E1A5F1F9DEF7079AA16DFB6549BF59C1C123E172630D04D76D5C00A8136BFC5BBD5615A993FD9BD1437FDC45A38E5C1AA9B868EC2ADD3F7A434AA1102114F0442B7CACE27CAE0F6A7AFE2C6CCCFE2F892A82935DB2BF971CD3D3E2625F41277765B032EAB3AC2A1D94E738603BB2D21787D882AD",
                 "http://gslb.miaopai.com/stream/nXbnpUod9RckpaHhOc7~hiKG-M7pCK3R.mp4?vend=miaopai&ssig=d8f3d28101d835795fa60016a8973518&time_stamp=1547888222869&mpflag=32",
                 "https://vd3.bdstatic.com/mda-ib45x4ewrs2d7ka6/hd/mda-ib45x4ewrs2d7ka6.mp4?auth_key=1547886572-0-0-3bd37d68631506954a04aef8ba158253&bcevod_channel=searchbox_feed&pd=bjh&abtest=all",
                 "http://gslb.miaopai.com/stream/4qNSIWOHAXTiZU3fvz5mdkaqyZ3ylB1tZUQ66g__.mp4?vend=miaopai&ssig=99929a0c5a2a443a795ccc9d0e4c359a&time_stamp=1547888475872&mpflag=32",
                 "https://vd3.bdstatic.com/mda-hmnkytkuif0sumeg/sc/mda-hmnkytkuif0sumeg.mp4?auth_key=1547886931-0-0-eed3199d468d60d4359f16c7435ee3c2&bcevod_channel=searchbox_feed&pd=bjh&abtest=all",
                 "https://vd2.bdstatic.com/mda-hkujxas2dwmfsh9m/mda-hkujxas2dwmfsh9m.mp4?auth_key=1547887176-0-0-0857195f6a51d7fe70e3b610367caca1&bcevod_channel=searchbox_feed&pd=bjh",
            ];
          var ArrVideo = [
          "http://hc.yinyuetai.com/uploads/videos/common/51FD015E8B08D8677E292276B68BCE9B.mp4?sc=5c01b4585e06db8a&br=784&vid=3044132&aid=15655&area=Other&vst=3",
          "http://gslb.miaopai.com/stream/nUJETaFUwMYHoY3bYAFL~xJFeBe1mBkG-f33lQ__.mp4?vend=miaopai&ssig=288932ebab111dcab4a495eaed67cd76&time_stamp=1547889362068&mpflag=32",
          "https://apd-bf3772ff14897ae36c193d796634d6ae.v.smtcdns.com/om.tc.qq.com/AyisU80mquoWi84hhmf31AHxLQ_Ww7sIvsNBhlN2xMd8/uwMRJfz-r5jAYaQXGdGnC2_ppdhgmrDlPaRvaV7F2Ic/z0765lz3x6h.mp4?sdtfrom=v1010&guid=89524f4c080e1b3fe091f51c13095d8e&vkey=AEEAD5F4D46EC4E04027C4169174B8E7C59493DC9BB7814DDD1CF7D2CBACCA39BB7C42C7D98C01F4F0CB17BE6E5DBFD206A7D86EA55561A96C6DF95CD41F995BF01E3AF7EAB373A5A8145E25AC9B87D785070423F7C05904A670CB614CA3CE81435966230B8D088759EFC8BB1B1E453039D70B64AC545200",
          "https://ugcws.video.gtimg.com/uwMRJfz-r5jAYaQXGdGnC2_ppdhgmrDlPaRvaV7F2Ic/l0646zoe7w7.mp4?sdtfrom=v1010&guid=89524f4c080e1b3fe091f51c13095d8e&vkey=D70CC33A186E1EB6893662BFF0AABC10992AB9127DC42A18618902B0BEB6666754FD2E182EBC166C93DBF78F102834613438A58E24E95FD6DA63C369ED3B1722024FA6358DD823A28CFE2459F096644A71D64A89D8E2C10F3BABEB8D2063FAEF658AC99BFB1CDB9318094A3838F3071B7CAA5FBEE2477D4A",
          "https://ugcws.video.gtimg.com/uwMRJfz-r5jAYaQXGdGnC2_ppdhgmrDlPaRvaV7F2Ic/j037204ok02.mp4?sdtfrom=v1010&guid=89524f4c080e1b3fe091f51c13095d8e&vkey=50A456251D8DA323986944E5C4A1CB2AD8BDACE1BADA740974D7BA4A068425AC57F422CC271DD3B90C633CD7F150E2B0EBA21A4F8D6FA211CA566C4DCD1381C05111C6465E040F706D47FB267FBC3AF2F06EAB5A0DC7A95C9B3A66EFC0BA98AA5FC348AAAFD213BB9699EC03143E140AC735C80A26367844",
          "https://vd4.bdstatic.com/mda-imnqpbkf3y7yucfq/hd/mda-imnqpbkf3y7yucfq.mp4?auth_key=1547882678-0-0-dc2e1a318cae4de4c4d25dbd3976feda&bcevod_channel=searchbox_feed&pd=bjh&abtest=all",
          ]
          document.getElementById("play").src=ArrVideos[idx];
         var list = document.querySelector(".list");
    
       
        // 获取事件源的索引
        function getindex(current){
                var lis =document.getElementsByClassName("zzc");
                var iis = document.getElementsByTagName("i");
                console.log(current.tagName);
                if(current.tagName==="DIV"){
                  for(let i=0;lis.length; i++){
                    if(lis[i].id == current.id){
                        return i;
                    }
                  }
                }else if(current.tagName==="I"){
                      for(let a=0;iis.length;a++){
                        if(iis[a].id == current.id){
                          return a;
                        }
                    }
                }
                
                
              }

         list.addEventListener("click",function(e){
              e = e || window.event;
              let target = e.target || e.srcElement;
              // console.log(getindex(target));
              let y = getindex(target);
              // console.log(target.className );
              if(target.className ==="zzc"||target.tagName==="I"){
              document.getElementById("play").src=ArrVideo[y];
              }
           })
        }