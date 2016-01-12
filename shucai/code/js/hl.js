$(function(){

	// ----------------登录页面---------------------
	$('#loginBtn').click(function(){
		console.info("登录!");
		var un = $('#username').val();
		var ps = $('#password').val();
		if( un == "" && ps == ""  ){
			console.info("访客登录!");
		}
		var sendData = {UserName:"ceshi",UserPwd:"123456"} ;
		var postUrl = "http://gaohui11202.vicp.cc/ForAndroid/Login" ;
		var proxyUrl = "http://www.g6game.com/h5game/interfaces/proxy.php"  ;
		// var proxyData = {url: postUrl , value: encodeURI( JSON.stringify(sendData) ) } ; 
		// var proxyData = {url: postUrl , value: encodeURI( "UserName=" + "ceshi" + "&UserPwd=" + "123456" ) } ; 
		var dataStr = objToStr(sendData) ;
		var proxyData = {url: postUrl , value: encodeURI( dataStr ) } ; 
		$.ajax({
	        type:"POST",
	        url: proxyUrl ,
	        data: proxyData , //sendData,
	        datatype: "text",//"xml", "html", "script", "json", "jsonp", "text".
	        //成功返回之后调用的函数             
	        success:function(data){
	       		// $("#msg").html(decodeURI(data));     
	       		console.info("返回数据:"+data);
	       		data = JSON.parse(data); 
	       		window.location.href = "price.html" ;
	       		if( data.success ){	//成功
	       			console.info("成功! name:" + data.name );
	       		}
	        }   ,
	        //调用执行后调用的函数
	        complete: function(XMLHttpRequest, textStatus){
	            //HideLoading();
	        },
	        //调用出错执行的函数
	        error: function(){
	        }         
        });
  	
	});
	$('#resetBtn').click(function(){
		console.info("重置!");
		$('#password').val("");
		$('#username').val("");
	});
	// ----------------登录页面---------------------

	$('#show tr').click(function(){
		$('#info').removeClass('normal').addClass('left');
	});
	$('#callout-help-text-accessibility').click(function(){
		$('#info').removeClass('left').addClass('normal');
	});

	$('#priceBtn').click(function(){
		window.location.href = "price.html" ;
		console.info("价格!");
	});
	$('#nativeBtn').click(function(){
		window.location.href = "native.html" ;
		console.info("灾害!");
		
	});
	$('#manageBtn').click(function(){
		window.location.href = "manage.html" ;
		console.info("管理!");
		
	});
	

})

function objToStr( data ){
	var str = "" ;
	for (var key in data) {
		if( str.length > 0 ){
			str += "&"+ key + "=" + data[key] ;
		}else{
			str += key + "=" + data[key] ;
		}
		// "UserName=" + "ceshi" + "&UserPwd=" + "123456"
	};
	return str ;
}

//获取省的数据;
function getProvice(){
	var sendData = {} ;
	var postUrl = "http://gaohui11202.vicp.cc/ForAndroid/GetAllProvince" ;
	var proxyUrl = "http://www.g6game.com/h5game/interfaces/proxyGet.php"  ;
	// var proxyData = {url: postUrl , value: encodeURI( JSON.stringify(sendData) ) } ; 
	// var proxyData = {url: postUrl , value: encodeURI( "UserName=" + "ceshi" + "&UserPwd=" + "123456" ) } ; 
	var dataStr = objToStr(sendData) ;
	var proxyData = {url: postUrl , value: encodeURI( dataStr ) } ; 
	$.ajax({
        type:"GET",
        url: proxyUrl ,
        data: proxyData , //sendData,
        datatype: "text",//"xml", "html", "script", "json", "jsonp", "text".
        //成功返回之后调用的函数             
        success:function(data){
       		// $("#msg").html(decodeURI(data));     
       		console.info("返回数据:"+data);
       		data = JSON.parse(data); 
       		// window.location.href = "price.html" ;
       		if( data.success ){	//成功
       			console.info("成功! name:" + data.name );
       		}
        }   ,
        //调用执行后调用的函数
        complete: function(XMLHttpRequest, textStatus){
            //HideLoading();
        },
        //调用出错执行的函数
        error: function(){
        }         
    });
}


//获取市的数据;
function getCity(cityCody){
	cityCody = cityCody || 510000 ;
	var sendData = {code:cityCody} ;
	var postUrl = "http://gaohui11202.vicp.cc/ForAndroid/GetCitysByProvinceCode" ;
	var proxyUrl = "http://www.g6game.com/h5game/interfaces/proxyGet.php"  ;
	// var proxyData = {url: postUrl , value: encodeURI( JSON.stringify(sendData) ) } ; 
	// var proxyData = {url: postUrl , value: encodeURI( "UserName=" + "ceshi" + "&UserPwd=" + "123456" ) } ; 
	var dataStr = objToStr(sendData) ;
	var proxyData = {url: postUrl , value: encodeURI( dataStr ) } ; 
	$.ajax({
        type:"GET",
        url: proxyUrl ,
        data: proxyData , //sendData,
        datatype: "text",//"xml", "html", "script", "json", "jsonp", "text".
        //成功返回之后调用的函数             
        success:function(data){
       		console.info("返回数据:"+data);
       		data = JSON.parse(data); 
       		// window.location.href = "price.html" ;
       		if( data.success ){	//成功
       			console.info("成功! name:" + data.name );
       		}
        }   ,
        //调用执行后调用的函数
        complete: function(XMLHttpRequest, textStatus){
            //HideLoading();
        },
        //调用出错执行的函数
        error: function(){
        }         
    });
}
// 2.4 获取市的数据;
function getArea(code){
	code = code || 510100 ;
	var sendData = {code:code} ;
	var postUrl = "http://gaohui11202.vicp.cc/ForAndroid/GetAreaByCityCode" ;
	var proxyUrl = "http://www.g6game.com/h5game/interfaces/proxyGet.php"  ;
	var dataStr = objToStr(sendData) ;
	var proxyData = {url: postUrl , value: encodeURI( dataStr ) } ; 
	$.ajax({
        type:"GET",url: proxyUrl ,data: proxyData , datatype: "text",
        success:function(data){
       		console.info("返回数据:"+data);
       		data = JSON.parse(data); 
       		// window.location.href = "price.html" ;
       		if( data.success ){	//成功
       			console.info("成功! name:" + data.name );
       		}
        }   ,
        complete: function(XMLHttpRequest, textStatus){
            //HideLoading();
        },
        error: function(){
        }         
    });
}

//2.5获取所有蔬菜大类数据;
function GetTypeList(){
	var sendData = {} ;
	var postUrl = "http://gaohui11202.vicp.cc/ForAndroid/GetTypeList" ;
	var proxyUrl = "http://www.g6game.com/h5game/interfaces/proxyGet.php"  ;
	var dataStr = objToStr(sendData) ;
	var proxyData = {url: postUrl , value: encodeURI( dataStr ) } ; 
	$.ajax({
        type:"GET",url: proxyUrl ,data: proxyData , datatype: "text",
        success:function(data){
       		console.info("返回数据:"+data);
       		data = JSON.parse(data); 
       		// window.location.href = "price.html" ;
       		if( data.success ){	//成功
       			console.info("成功! name:" + data.name );
       		}
        }   ,
        complete: function(XMLHttpRequest, textStatus){
            //HideLoading();
        },
        error: function(){
        }         
    });
}

//2.6根据蔬菜类型获取蔬菜品种
function GetVegetablesListByType(typeId){
	typeId = typeId || 14 ;
	var sendData = {TypeID:typeId} ;
	var postUrl = "http://gaohui11202.vicp.cc/ForAndroid/GetVegetablesListByType" ;
	var proxyUrl = "http://www.g6game.com/h5game/interfaces/proxyGet.php"  ;
	var dataStr = objToStr(sendData) ;
	var proxyData = {url: postUrl , value: encodeURI( dataStr ) } ; 
	$.ajax({
        type:"GET",url: proxyUrl ,data: proxyData , datatype: "text",
        success:function(data){
       		console.info("返回数据:"+data);
       		data = JSON.parse(data); 
       		// window.location.href = "price.html" ;
       		if( data.success ){	//成功
       			console.info("成功! name:" + data.name );
       		}
        }   ,
        complete: function(XMLHttpRequest, textStatus){
            //HideLoading();
        },
        error: function(){
        }         
    });
}

// 2.7获取批发市场基础数据
function WholesaleMarketQuotationList(pcode,ccode,acode){
	pcode = pcode || 510000 ;  ccode = ccode || 510100 ;  
	var sendData = {ProvinceCode:pcode , CityCode:ccode  } ;
	if( acode ){
		sendData.AreaCode = acode ;
	}
	var postUrl = "http://gaohui11202.vicp.cc/ForAndroid/GetWholesaleMarketList" ;
	var proxyUrl = "http://www.g6game.com/h5game/interfaces/proxy.php"  ;
	var dataStr = objToStr(sendData) ;
	var proxyData = {url: postUrl , value: encodeURI( dataStr ) } ; 
	$.ajax({
        type:"POST",url: proxyUrl ,data: proxyData , datatype: "text",
        success:function(data){
       		console.info("返回数据:"+data);
       		data = JSON.parse(data); 
       		// window.location.href = "price.html" ;
       		if( data.success ){	//成功
       			console.info("成功! name:" + data.name );
       		}
        }   ,
        complete: function(XMLHttpRequest, textStatus){
            //HideLoading();
        },
        error: function(){
        }         
    });
}

// 2.8批发市场行情查询
function getMarket(page,rows,typeId,vegetNum,pcode,ccode,acode,marketName,dateTime){
	pcode = pcode || 510000 ;  ccode = ccode || 510100 ;  
	var sendData = {page:page ,rows:rows, typeId:TypeID ,VegetableNum:vegetNum,ProvinceCode:pcode,CityCode:ccode,
	AreaCode:acode,WholesaleMarketName:marketName,DateTime:dateTime  } ;	
	var postUrl = "http://gaohui11202.vicp.cc/ForAndroid/WholesaleMarketQuotationList" ;
	var proxyUrl = "http://www.g6game.com/h5game/interfaces/proxy.php"  ;
	var dataStr = objToStr(sendData) ;
	var proxyData = {url: postUrl , value: encodeURI( dataStr ) } ; 
	$.ajax({
        type:"POST",url: proxyUrl ,data: proxyData , datatype: "text",
        success:function(data){
       		console.info("返回数据:"+data);
       		data = JSON.parse(data); 
       		// window.location.href = "price.html" ;
       		if( data.success ){	//成功
       			console.info("成功! name:" + data.name );
       		}
        }   ,
        complete: function(XMLHttpRequest, textStatus){
            //HideLoading();
        },
        error: function(){
        }         
    });
}

