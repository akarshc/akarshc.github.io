
var head = document.getElementsByTagName('HEAD')[0];  
var link = document.createElement('link'); 

link.rel = 'stylesheet';  
link.type = 'text/css'; 
link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';  
head.appendChild(link);  

var content = '';

function selector(query) {
	return document.querySelector(query);
}

var open_s = 0;

window.addEventListener('click', (e) => {   
	if (document.getElementById('font_size').contains(e.target) || document.getElementById('font_size_dropdown').contains(e.target)){
		// event triggered
	}
	else if(open_s) {
		closefontsize();
	}
});

selector('Editor').innerHTML += (`
	<div class="editor_controller">
	<button class="control fa fa-bold" onclick="getControl('bold');"> </button>
	<button class="control fa fa-italic" onclick="getControl('italic');"></button>
	<button class="control fa fa-underline" onclick="getControl('underline');"></button>
	<button class="control fa fa-font" onclick="forecolor()"></button>
	<button class="control fa fa-strikethrough" onclick="getControl('strikeThrough');"></button>
	<button class="control fa fa-align-left" onclick="getControl('justifyLeft');"></button>
	<button class="control fa fa-align-center" onclick="getControl('justifyCenter');"></button>
	<button class="control fa fa-align-right" onclick="getControl('justifyRight');"></button>
	<button class="control fa fa-align-justify" onclick="getControl('justifyFull');"></button>
	<button class="control fa fa-list-ol" onclick="getControl('insertOrderedList')"></button>
	<button class="control fa fa-list-ul" onclick="getControl('insertUnorderedList')"></button>
	<button class="control fa fa-link" onclick="addLink()"></button>
	<button class="control fa fa-unlink" onclick="unLink()"></button>
	<button class="control fa fa-header" onclick="heading()"></button>
	<button class="control fa fa-photo" onclick="insertImage()"></button>
	<button class="control popup_btn" id="font_size" onclick="fontsize()">Font size <span class="arrow fa fa-chevron-down"></span></button>
	<div id="font_size_dropdown" class="popup_menu_outer"></div>
	<button class="control popup_btn" onclick="fontname()">Font name <span class="arrow fa fa-chevron-down"></span></button>
	</div>
	<div class="editor" contenteditable="true"></div><br /><button onclick="submit()" class="btn">Preview</button><br />
`);

selector('div[contenteditable]').addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        document.execCommand('insertHTML', false, '<br/>');
        return false;
    }
});

selector('#font_size_dropdown').innerHTML += (`
	<div class="popup_menu">
	<button onclick="selectFontsize('3')">Normal</button>
	<button onclick="selectFontsize('5')"">Medium</button>
	<button onclick="selectFontsize('7')"">Large</button>
	</div>
`);

function getControl(handle) {
    document.execCommand(handle, false);
}

function forecolor() {
    var color = prompt('color:', '#');
    document.execCommand('forecolor', false, color);
}

function addLink() {
    var linkURL = prompt('Enter a URL:', 'http://');
    document.execCommand('createlink', false, linkURL);
}

function unLink() {
    document.execCommand('unlink', false);
}

function insertImage() {
    var imgsrc = prompt('Enter image URL:', 'http://');
    document.execCommand('insertImage', false, imgsrc);
}

function fontsize() {
	selector('#font_size').classList.add('popup_btn_active');
	selector('.popup_menu').style = "animation: popIn .15s ease-in-out forwards;";
	open_s = 1;
}

function selectFontsize(size) {
    document.execCommand('fontSize', false, size);
}

function closefontsize() {
	selector('#font_size').classList.remove('popup_btn_active');
	selector('.popup_menu').style = "animation: popOut .15s ease-in-out forwards;";
	open_s = 0;
}

function fontname() {
    var name = prompt('Font name: ', '');
    document.execCommand('fontName', false, name);
}

function heading() {
    var head = prompt('Heading: ', '');
    document.execCommand('formatBlock', true, head);
}

function submit() {
	content = selector('.editor').innerHTML;
	console.log(content)
	selector('content').innerHTML = content;
}
