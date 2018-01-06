/*
名称:缓速运动--更新
作者:web1703
创建日期:2017.10.12
修改日期:2017.10.17
版本号:
所属项目:
备注:
1.能实现的CSS属性:opacity,height,width,font-size,border-width等数值型的CSS样式
2.各种定位的方向:top,left,right,bottom
*/
function getStyle(obj,attr){//获取css内嵌式属性
	if(obj.currentStyle){//IE
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}

}
// console.log(getStyle(oDiv[0],'width'));
// console.log(parseInt(getStyle(oDiv[0],'width')));
//obj:元素名称,attr:属性,iTarget:目标,fn:回调函数

function startMoveA(obj,json,fn){//缓动框架
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var bStop=true;//判断json中所有的值有没有运行完毕,true:已全部运行完毕;false:未全部运行完毕
		for(var attr in json){
			var iCur=0;
			if(attr=='opacity'){
				iCur=parseFloat(getStyle(obj,attr))*100;//原有的alpha值
			}else{
 				iCur=parseInt(getStyle(obj,attr));
			}

			//json[attr]就是原来的iTarget
			var iSpeed=(json[attr]-iCur)/8;//1.获取速度
			iSpeed=iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			if(json[attr]!=iCur){//2.判断是否到达目的地
				bStop=false;//json中的元素还没有全部执行完毕
			}
			if(attr=='opacity'){
				iCur += iSpeed;
				obj.style.opacity=iCur/100;
				obj.style.filter='alpha(opacity:'+iCur+')';
			}else{
				obj.style[attr]=iCur+iSpeed+"px";
			
			}
			console.log("in="+bStop);
			
		}
		if(bStop){//当json中所有元素全部执行后
			clearInterval(obj.timer);
			if(fn) fn();//停止后执行回调函数
		}
			console.log("out="+bStop);
	},30);
	}
	