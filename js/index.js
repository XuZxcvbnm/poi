window.onload=function(){


//-----------------------------------------导航效果---------------------------------
$(function(){
    var leftX,newWidth; //导航项的X轴坐标,导航项实际宽度

    //创建滑动条
    $(".nav ul").append('<div class="block"></div>');
    var $block=$(".block");

    //导航项中"首页"实际宽度和水平坐标位置
    $block.width("40px");

    //在$block.data()中记录下滑动条的原点位置.
    $block.data("zero",{sWidth:$(".wire").width(),x:$(".wire a").position().left});
    //console.log($block.data());

/*//另一种data写法,链式
    $block.width($(".on").width()).css('left', $('.on a').position().left).data('sWidth', $block.position().left).data('x', $block.width());*/

//实现滑动条的动态效果 即:hover(mouseover(),mouseout());
$(".nav ul li a").hover(function(){//鼠标(滑动条)当前位置

    leftX=$(this).position().left;
    $block.stop().animate({"left":leftX-4,"width":"40px"},400);

},function(){//鼠标离开返回"首页"位置
    $block.stop().animate({"left":$block.data("zero").x-4,"width":"40px"},400);
});


$(document).scroll(function(){
    var y=$(document).scrollTop();
        if(y>800){
            $("#gTop").fadeIn();
        }else{
            $("#gTop").fadeOut();
        }
    });
    $("#gTop").click(function(){
        var timer=null;
        clearInterval(timer);
        var y=$(document).scrollTop();
        timer=setInterval(function(){
            y-=y*0.08;
            if(y<10){
                clearInterval(timer);
                y=0;
            }
            $(document).scrollTop(y);   
        },40);
        
    });
    $(document).scroll(function(){
        var y=$(document).scrollTop();
        if(y>=60){
            $("#header").addClass("ding");
        }else{
            $("#header").removeClass("ding");
        }
    });

});

//---------------------图片淡入--------------------------------------------------
$(function(){
    $("#content .conImg li img").mouseover(function(){
            $(this).stop().animate({"opacity":"0"},1500);   
    });
    $("#content .conImg li img").mouseout(function(){
            $(this).stop().animate({"opacity":"100"},6000); 
    });

    
});

//---------------------------------轮播特效------------------------------
    var oDiv=document.getElementById('playImages');
    var oBtnPrev=getByClass(oDiv,'prev')[0];
    var oBtnNext=getByClass(oDiv,'naxt')[0];
    var oMarkLeft=getByClass(oDiv,'mark_left')[0];
    var oMarkright=getByClass(oDiv,'mark_right')[0];
    var oSmallUl=getByClass(oDiv,'small_pic')[0].getElementsByTagName("ul")[0];
    var oSmallLi=oSmallUl.getElementsByTagName("li");
    var oBigUl=getByClass(oDiv,'big_pic')[0];
    var oBigLi=oBigUl.getElementsByTagName('li');
    var iNow=0;  //鼠标经过当前的小图下标
    var iMinZindex=2;   //改变大图的z-index值，在鼠标经过小图时
    var timer=null;
    var arrText=["1","2","3","4","5","6"];
    var oName=document.getElementById("name");
    var oWord=document.getElementById("word");
    var num=0;


    oSmallUl.style.width=oSmallLi.length*oSmallLi[0].offsetWidth+60+'px';
    //小图UL的真实宽度

    //左右按钮
    oBtnPrev.onmouseover=oMarkLeft.onmouseover=function(){
      startMoveB(oBtnPrev,'opacity',100);
    }
    oBtnPrev.onmouseout=oMarkLeft.onmouseout=function(){
      startMoveB(oBtnPrev,'opacity',0);
    }
    oBtnNext.onmouseover=oMarkright.onmouseover=function(){
      startMoveB(oBtnNext,'opacity',100);
    }
    oBtnNext.onmouseout=oMarkright.onmouseout=function(){
      startMoveB(oBtnNext,'opacity',0);
    }


    //

    for(var i=0; i<oSmallLi.length;i++){
      oSmallLi[i].index=i;

      //一.小图鼠标经过opacity效果
      oSmallLi[i].onmouseover=function(){
        startMoveB(this,'opacity',100);//当前图片清晰
        
      }
      oSmallLi[i].onmouseout=function(){
        if (this.index !=iNow) {
        startMoveB(this,'opacity',60);//除当前图片外,其它图片半透明
        }
      }

      
      //二.点小图，显示大图.原理:TAB选项卡
    oSmallLi[i].onclick=function(){
        clearInterval(timer);//去除频繁点击大图上左右箭头出现的bug
        if(this.index==iNow)return;//频繁点击小图时,不再响应
        iNow=this.index;//当前小图的下标
        
        tab();
        setTimeout(autoPlay,2000);//  2秒后自动播放
        num++;
        if(num==arrText.length){
          num=0;
        }
        fnChange();
      }
    /*
    做动画代码的规则: 任何时候
    先停止clearInterval(timer),再运动play().
    */

      oBtnPrev.onclick=function(){//左箭头
        clearInterval(timer); 
        iNow--;
        if(iNow==-1){// 最后一张时，图片切换为第一张
          iNow=oSmallLi.length-1;
        }
        tab();
        setTimeout(autoPlay,2000);//  2秒后自动播放
        num--;
        if(num==-1){
          num=arrText.length-1;
        }
        fnChange();
      }
      oBtnNext.onclick=function(){//右箭头
        clearInterval(timer);
        
        iNow++;
        if(iNow==oSmallLi.length){// 最后一张时，图片切换为第一张
          iNow=0
        }
        tab();
        setTimeout(autoPlay,2000);//  2秒后自动播放
        num++;
        if(num==arrText.length){
          num=0;
        }
        fnChange();   
      }

    }

    autoPlay();


    function autoPlay(){//自动轮播

        clearInterval(timer);
        timer=setInterval(function(){
        iNow++;
        
        if(iNow==oSmallLi.length){
          iNow=0;
        }
        tab();
        num++;
        if(num==arrText.length){
          num=0;
        }
        fnChange();
      },3000)
    }


    function tab(){
      for(var j=0; j<oSmallLi.length;j++){
          startMoveB(oSmallLi[j],'opacity',60);
        }
        startMoveB(oSmallLi[iNow],'opacity',100);
        oBigLi[iNow].style.zIndex=iMinZindex++;//显示大图切换
        oBigLi[iNow].style.width=0;
        startMoveB(oBigLi[iNow],'width',oBigUl.offsetWidth);


        //三. 小图的无缝滚动操作
        //原理: 无缝滚动中: 开始二张图和结尾二张图,在移动到极限时,坐标位置不变. 其它图片会移动.见原理图
        // if(iNow==0){//网页刚加载时，第一张小图状态
        //   startMoveB(oSmallUl,'left',0);
        // }else if(iNow==oSmallLi.length-1){
        //   startMoveB(oSmallUl,'left',-(iNow-2)*oSmallLi[0].offsetWidth);
        //   //5-2=3  -390px  倒数第一张
        // }else{
        //   startMoveB(oSmallUl,'left',-(iNow-1)*oSmallLi[0].offsetWidth);
        //   //4-1=3 -390px 倒数第二张
        //   console.log(-(iNow-1)*oSmallLi[0].offsetWidth);
        // }  让圆点固定不动
      }
    function getByClass(oParent,oClass){
      var allEle=document.getElementsByTagName("*");
      var aResult=[];

      for (var i=0; i<allEle.length;i++){
        if(allEle[i].className==oClass){
          aResult.push(allEle[i]);
        }
      }
      return aResult;
    } 

    function fnChange(){
      oName.innerHTML=arrText[num];//图片信息
      oWord.innerHTML=num+1 +"/"+arrText.length; //图片数量
    }






// content 部分
    var cDiv=document.getElementById('conBox');
    var cUl=cDiv.getElementsByTagName('ul');
    var iMinIndex=2;

    for(var i=0; i<cUl.length; i++){//给每个li块设置定位坐标
        cUl[i].style.left=cUl[i].offsetLeft+"px";
        cUl[i].style.top=cUl[i].offsetTop+"px";
    }
    for(var j=0; j<cUl.length; j++){//指定定位类型，清除影响定位布局的margin
        cUl[j].style.position="absolute";
        cUl[j].style.margin=0;
    }
    for(var i=0; i<cUl.length; i++){

        cUl[i].onmouseover=function(){
            this.style.zIndex=iMinIndex++;
            startMoveA(this,{marginTop:-50});
        }
        cUl[i].onmouseout=function(){
            
            startMoveA(this,{marginTop:0});
        }
    }









}