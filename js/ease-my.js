/*
名称: 缓动运动
作者: 1703
创建日期: 2017.10.12
修改日期: 
版本号:
所属项目:
备注: 
1.能实现的CSS属性: opacity,height,width,font-size,border-width等数值型的CSS样式
2.各种定位的: top,left,right,bottom
*/

	function getStyle(obj,attr){//1.获取css内嵌样式
		if(obj.currentStyle){//IE
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj,false)[attr];
		}
	}


//obj:元素名称, attr:属性, iTarget:目的地
	function startMoveB(obj,attr,iTarget,fn){//2.缓动框架
		
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var iCur=0;
			if(attr=="opacity"){
				iCur=parseInt(parseFloat(getStyle(obj,attr))*100);//原有的alpha
			}else{
				iCur=parseInt(getStyle(obj,attr));
			}

			var iSpeed=(iTarget-iCur)/8;
			iSpeed=iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed) ;

			if(iTarget==iCur){
				clearInterval(obj.timer);
				if(fn) fn();
			}else{
				if(attr=="opacity"){
					iCur += iSpeed;
					obj.style.opacity=iCur/100;
					obj.style.filter='alpha(opacity:'+iCur+')';
				}else{
					obj.style[attr]=iCur+iSpeed+"px";
				}				
			}
		},40);
	}