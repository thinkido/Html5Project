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
	getPageData() ;
	
	initData();
})

var PAGE_Login = 1 ,PAGE_Price = 2 ,PAGE_Native = 3,PAGE_Manage = 4 ;

function initData(){
	//显示用户名;
	var name = $.cookie('username') ? $.cookie('username') : "游客" ;
	$("#boss span").text( name );	
	
}

function setTableType( type){
	type = type || 1 ;
	$("#first th").remove();
	if( type ==1 ){
		$("#first").append("<th>城市</th><th>批发市场</th><th>价格(元)</th><th>销量(斤)</th>");
	}else{
		$("#first").append("<th>蔬菜大类</th><th>蔬菜品名</th><th>价格(元)</th><th>销量(斤)</th>");
	}
}

function getPageData(){
	var path = window.location.href ;
	if( path.indexOf("price") != -1 ){
		$.cookie('currPage', PAGE_Price );
		getProvice();
	}
}

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

var provinceDic = null ,cityDic = null ,selectObj = {} ;
var locationObj = null ;

function getLocation(){	
	var sendData = {} ;
	var postUrl = "http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js" ;
	var proxyUrl = "http://www.g6game.com/h5game/interfaces/proxyGet.php"  ;
	var dataStr = objToStr(sendData) ;
	var proxyData = {url: postUrl , value: encodeURI( dataStr ) } ; 
	$.ajax({
        type:"GET",url: proxyUrl ,data: proxyData ,datatype: "text",
        success:function(data){
       		console.info("返回数据:"+data);    
       		eval( data );   
       		locationObj = remote_ip_info ;      
       		setDefPro() ;		
        }       
    });
}
function setDefPro(){
	if( locationObj != null && provinceDic != null ){
		var item , name ;
		for (var i = 0; i < provinceDic.length; i++) {
			item = provinceDic[i] ;
			name = item.name.replace(" ","")
			if( name.indexOf(locationObj.province) != -1 ){
				$("#checkbox1 select").find("option:selected").text(item.name);
				$("#checkbox1 select").find("option:selected").val( item.code ) ;
				getCity( item.code ); 
				console.info("当前省:" + item.name );    
				selectObj.proCode = item.code ;
				break ;
			}
		};
	}
}
function setDefCity(){
	if( locationObj != null && cityDic != null ){
		var item , name ;
		for (var i = 0; i < cityDic.length; i++) {
			item = cityDic[i] ;
			name = item.name.replace(" ","")
			if( name.indexOf(locationObj.city) != -1 ){
				$("#checkbox2 select").find("option:selected").text(item.name);
				$("#checkbox2 select").find("option:selected").val( item.code ) ;
				getArea(item.code);
				console.info("当前省:" + item.name );      
				selectObj.cityCode = item.code ;
				break ;
			}
		};
		getMarketList() ;
	}
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
       		provinceDic = data ;
       		$("#checkbox1 select").empty();
       		for (var i = 0; i < provinceDic.length; i++) {
				$("#checkbox1 select").append("<option value='"+ provinceDic[i].code +"'>"+ provinceDic[i].name +"</option>");
       		};
       		getLocation() ;
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
       		cityDic = data ;
       		$("#checkbox2 select").empty();
       		var item ;
       		for (var i = 0; i < cityDic.length; i++) {
       			item = cityDic[i] ;
				$("#checkbox2 select").append("<option value='"+ item.code +"'>"+ item.name +"</option>");
       		};
			setDefCity() ;
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

// 2.7获取批发市场基础数据	WholesaleMarketQuotationList
function getMarketList(pcode,ccode,acode){
	pcode = pcode || selectObj.proCode || 510000 ;  ccode = ccode  || selectObj.cityCode|| 510100 ;  
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
       		console.info("返回市场:"+data);
       		data = JSON.parse(data);        		

			// $("#show tr:has('td')").remove();
			// $("#show tbody").append("<tr><td>"+  +"</td><td>"+  +"</td><td>"+  +"</td><td>"+  +"</td></tr>");

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

// 2.9添加、修改批发市场行情数据
function getMarket(page,rows,typeId){
	pcode = pcode || 510000 ;  ccode = ccode || 510100 ;  
	var sendData = {Domain:page ,entity:rows, Token:TypeID } ;	
	var postUrl = "http://gaohui11202.vicp.cc/ForAndroid/WholesaleMarketQuotationEdit" ;
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


