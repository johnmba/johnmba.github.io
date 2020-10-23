
Validate = {
	invalids : [],

	addInvalids: function(msg){
		this.invalids.push(msg);
	},

	getInvalids: function(){
		return this.invalids.join('. \n');
	},

	checkValidity(input, validchecks){
	
		validchecks.forEach (check =>{

			var isInvalid = check.isInvalid(input);
			if(isInvalid){
				this.addInvalids(check.isInvalid.msg);
			}
			
			var reqElem = check.element;
			if (reqElem) {
				if (isInvalid) {
					check.element.classList.add('invalid');
					check.element.classList.remove('valid');
				}else{
					check.element.classList.remove('invalid');
					check.element.classList.add('valid');
				}
			}
		})
	}
}

var nameValidate = [
	{
		isInvalid: function(name){
			return name.value.length < 3;
		},
		msg: 'this input is too short, enter at least 3 characters',
		element : document.querySelector('label[for="fname"] li:nth-child(1)')
	},

	{
		isInvalid: function(name){
			var badcharacters = name.value.match(/[^a-zA-Z0-9]/g);
			return badcharacters ? true : false;
		},
		msg: 'only letters and numbers are allowed',
		element : document.querySelector('label[for="fname"] li:nth-child(2)')
	}
]

var contactValidate = [
	{
		isInvalid: function(contact){
			return contact.value.match(/[^a-zA-Z0-9._-]/g);
		},
		msg: 'it neither starts with alphabets nor numbers',
		element : document.querySelector('label[for="reg_cont"] li:nth-child(1)')
	},

	{
		isInvalid: function(contact){
			return contact.value.match(
				/^([a-z0-9._-]+@[a-z0-9._-])/i
			);
		},
		msg: 'it neither contains or continue only numbers',
		element : document.querySelector('label[for="reg_cont"] li:nth-child(2)')
	},

	{
		isInvalid: function(contact){
			return contact.value.match(/^\.[a-z]{2,4}$/i);
		},
		msg: 'it neither ends with domain nor continue only numbers',
		element : document.querySelector('label[for="reg_cont"] li:nth-child(3)')
	},

	{
		isInvalid: function(contact){
			var contact = contact.value.match(
				/^([a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,4}$)/i
			);
			return contact ? true : false;
		},
		msg: 'it is neither a phone nor E-mail',
		element : document.querySelector('label[for="reg_cont"] li:nth-child(4)')
	}
]

var passwordValidate = [
	{
		isInvalid: function(pwd){
			return pwd.value < 8 | pwd.value > 100;
		},
		msg: 'the password needs to be between 8 and 100 characters',
		element : document.querySelector('label[for="reg_pwd"] li:nth-child(1)')
	},

	{
		isInvalid: function(pwd){
			var pwd = pwd.value.match(/[0-9]/i);
			return pwd ? true : false;
		},
		msg: 'password needs to have 1 number',
		element : document.querySelector('label[for="reg_pwd"] li:nth-child(2)')
	},

	{
		isInvalid: function(pwd){
			return pwd.value.match(/[a-z]/i);
		},
		msg : 'password needs to have at least 1 lower case character',
		element : document.querySelector('label[for="reg_pwd"] li:nth-child(3)')
	},

	{
		isInvalid: function(pwd){
			return pwd.value.match(/[A-Z]/i);
		},
		msg : 'password needs to have at least 1 upper case character',
		element : document.querySelector('label[for="reg_pwd"] li:nth-child(4)')
	},

	{
		isInvalid: function(pwd){
			return pwd.value.match(/[\!\@\#\%\*\&]/i);
		},
		msg: 'there need to be at least one special character',
		element : document.querySelector('label[for="reg_pwd"] li:nth-child(5)')
	}
];

function isHuman(){
	var honeypot = $('form #honeypot').val();
	var humanCheck = $('form #humanCheck').val();
	if (honeypot != 'http://') {
			valid += '<p>Spambots are not allowed.</p>';	
	}

	if (humanCheck != '') {
			valid += '<p>A human user' + required + '</p>';	
	}
};

function checkInput(input, validator){
	
	Validate.invalids = [];
	Validate.checkValidity(input, validator);
	if (Validate.invalids.length == 0 && input.value != '') {
		input.setCustomValidity('');
	} else {
		var msg = Validate.getInvalids();
		input.setCustomValidity(msg);
	}
};

var regCheck = [
	[document.getElementById('fname'), nameValidate],
	[document.getElementById('lname'), nameValidate],
	[document.getElementById('reg_cont'), contactValidate],
	[document.getElementById('reg_pwd'), passwordValidate]
]

var submit = document.querySelector('button[type="submit"]');
regCheck.forEach(input => {
	input[0].addEventListener('keyup', function(){
		checkInput(input[0], input[1])
	})	
}); 

//ajax submit form
submit.addEventListener('click', function(e){
	e.preventDefault();
	var error = [];
	regCheck.forEach(input => {
		checkInput(input[0], input[1])
		error.push(Validate.invalids)
	})
	if(error == ''){
		$('form #regForm').removeClass().addClass('processing').html('Processing...').fadeIn('fast');									
		var formData = inputs.serialize();
		submitForm(formData);
	}else{
		console.log(error)
	}
})

function submitForm(formData) {
	$.ajax({
		
		type:		'POST',
		url:		'php/feedback.php',
		data:		formData,
		dataType:	'json',
		cache:		false,
		timeout:	7000,
		success:	
		function(data) {
			//we are getting data.error (from ajax, which is formData) and data.msg from our feedback.php
			$('form #response').removeClass().addClass((data.error === true) ? 'error':'success')
										.html(data.msg).fadeIn('fast');
			if ($('form #response').hasClass('success')) {
				setTimeout ("$('form #response').fadeOut('fast')",5000);
			}
		},
		error: 
		function (XMLHttpRequest, textStatus, errorThrown) {
			$('form #response').removeClass().addClass('error')
						.html('<div class="alert alert-danger">' +
							'<p>There was an <strong>' + errorThrown + 
									'</strong> error due to a <strong>' + textStatus +
										'</strong> condition.</p>' +
											'</div>').fadeIn('fast');
		},
		complete: function(XMLHttpRequest, status) {
			$('form')[0].reset();
		}	
		
	});
};


// check contact if already in use
function checkcontact(user)
      {
        if (user.value == '')
        {
          O('info').innerHTML = ''
          return
        }
        params  = "user=" + user.value
        request = new ajaxRequest()
        request.open("POST", "checkcontact.php", true)
        request.setRequestHeader("Content-type",
          "application/x-www-form-urlencoded")
        request.setRequestHeader("Content-length", params.length)
        request.setRequestHeader("Connection", "close")
        request.onreadystatechange = function()
        {
			if (this.readyState == 4)
            if (this.status == 200)
              if (this.responseText != null)
                O('info').innerHTML = this.responseText
        }
        request.send(params)
      }
      function ajaxRequest()
      {
        try { var request = new XMLHttpRequest() }
        catch(e1) {
          try { request = new ActiveXObject("Msxml2.XMLHTTP") }
          catch(e2) {
            try { request = new ActiveXObject("Microsoft.XMLHTTP") }
            catch(e3) {
              request = false
        } } }
        return request
      }


const log_btn = document.getElementById('log_btn')
const log_form = document.getElementById('logForm')
log_btn.addEventListener('click', ()=>{
	//log_form.classList.remove('hidden');
	//log_form.classList.add('unhidden');
	console.log(log_form)
})