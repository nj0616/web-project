function $(id){
	return document.getElementById(id);
}
//---box----默认box---------出错box.error---正确box.right
//---tip----默认.tip.hide---出错tip.error---正确tip default
var regs = {
	//---密码--{6,20}字符
	pwdReg:/^.{6,20}$/,
	//---邮箱
	emailReg:/^[a-zA-Z\d]+([-_.][A-Za-z\d]+)*@([a-zA-Z\d]+[-.])+[a-zA-Z\d]{2,5}$/,
	//---密码等级
	numReg:/\d/,
	strReg:/[a-zA-Z]/,
	tsReg:/[^\u4e00-\u9fa5a-zA-Z0-9]/
}

var pwd = $('pwd');
var pwd2 = $('pwd2');
var email = $('email');
var btn = $('btn');

//---设置密码
pwd.onkeyup=pwd.onfocus=pwd.onblur = function(ev){
	var Event = ev||window.event;
	checkPwd(Event);
}
function checkPwd(Event){
	//---判断事件类型
	var type;
	if(Event){
		type = Event.type;
	}
	var value = pwd.value;
	var box = pwd.parentNode;
	var tip = box.parentNode.children[1];
	var span = tip.children[1];
	if(type=='focus'){
		if(value==''){
			box.className='box';
			tip.className='tip default';
			span.innerHTML = '建议使用字母、数字和符号的组合，6-20位';
			return false;
		}
	}
	if(type=='blur'){
		if(value==''){
			box.className='box';
			tip.className='tip hide';
			return false;
		}
	}
	//---出错情况
	if(value==''){
		box.className='box error';
		tip.className='tip error';
		span.innerHTML = '密码不能为空';
		return false;
	}else if(regs.pwdReg.test(value)){
		box.className='box right';
		console.log('11111');
//		tip.className='tip hide';
		//---密码等级判断
		var level = getPwdLevel(value);

		switch(level){
			case 1:
				tip.className='tip ruo';
				span.innerHTML = '建议修改密码';	
				break;
			case 2:
				tip.className='tip zhong';
				span.innerHTML = '可以使用';	
				break;
			case 3:
				tip.className='tip qiang';
				span.innerHTML = '非常完美';	
				break;
				console.log('333');
		};
		return true;
	}else{
		console.log('444');
		box.className='box error';
		tip.className='tip error';
		span.innerHTML = '密码应在6-20之间的字符';
		return false;
	}
	
}
//---密码等级判断函数
function getPwdLevel(pwd){
	var level = 0;
	var numReg=true;
	var strReg=true;
	var tsReg=true;
	for(var i=0;i<pwd.length;i++){
		if(numReg&&regs.numReg.test(pwd[i])){
			level++;
			numReg=false;
			continue;
		}
		if(strReg&&regs.strReg.test(pwd[i])){
			level++;
			strReg=false;
			continue;
		}
		if(tsReg&&regs.tsReg.test(pwd[i])){
			level++;
			tsReg=false;
		}
	};
	return level;
}
//---确认密码
pwd2.onkeyup=pwd2.onfocus=pwd2.onblur = function(ev){
	var Event = ev||window.event;
	checkPwd2(Event);
}
function checkPwd2(Event){
	//---判断事件类型
	var type;
	if(Event){
		type = Event.type;
	}
	var value1 = pwd.value;
	var value = pwd2.value;
	var box = pwd2.parentNode;
	var tip = box.parentNode.children[1];
	var span = tip.children[1];
	if(type=='focus'){
		if(value==''){
			box.className='box';
			tip.className='tip default';
			span.innerHTML = '请再次输入密码';
			return false;
		}
	}
	if(type=='blur'){
		if(value==''){
			box.className='box';
			tip.className='tip hide';
			return false;
		}
	}
	//---出错情况
	if(value==''){
		box.className='box error';
		tip.className='tip error';
		span.innerHTML = '请再次输入密码';
		return false;
	}else if(value1==value){
		box.className='box right';
		tip.className='tip hide';
		return true;
	}else{
		box.className='box error';
		tip.className='tip error';
		span.innerHTML = '两次密码输入不一致';
		return false;
	}
	
}
//---邮箱验证
email.onkeyup=email.onfocus=email.onblur = function(ev){
	var Event = ev||window.event;
	checkEmail(Event);
}
function checkEmail(Event){
	//---判断事件类型
	var type;
	if(Event){
		type = Event.type;
	}
	var value = email.value;
	var box = email.parentNode;
	var tip = box.parentNode.children[1];
	var span = tip.children[1];
	if(type=='focus'){
		if(value==''){
			box.className='box';
			tip.className='tip default';
			span.innerHTML = '请输入邮箱，格式类似：875221695@qq.com';
			return false;
		}
	}
	if(type=='blur'){
		if(value==''){
			box.className='box';
			tip.className='tip hide';
			return false;
		}
	}
	//---出错情况
	if(value==''){
		box.className='box error';
		tip.className='tip error';
		span.innerHTML = '邮箱不能为空';
		return false;
	}else if(regs.emailReg.test(value)){
		box.className='box right';
		tip.className='tip hide';
		return true;
	}else{
		box.className='box error';
		tip.className='tip error';
		span.innerHTML = '格式错误，必须包含‘ @ ’,‘ . ’等符号';
		return false;
	}
	
}

//---表单提交
function checkData(){
	var box = ck.parentNode;
	var tip = box.parentNode.children[1];
	var span = tip.children[1]; 
	if(ck.checked){
		if(checkUserName()&&checkPwd()&&checkPwd2()&&checkEmail()&&checkMobile()){
			alert('信息正确，正在为您跳转');
			return true;
		}else{
			alert('填写格式有误，请重新输入');
			return false;
		}
	}else{
		return false;
	}
	return false;
}