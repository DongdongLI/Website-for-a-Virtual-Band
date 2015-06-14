function insertAfter(newElement,targetElement)
{
    var parent=targetElement.parentNode;
    if(parent.lastChild==targetElement)
        parent.appendChild(newElement);
    else
        parent.insertBefore(newElement,targetElement.siblings);
}

function addClass(element,value)
{
    if(!element.className)
        element.className=value;
    else{
        newClassName=element.className;
        newClassName=newClassName+" "+value;
        element.className=newClassName;
    }
}

function highlightPage(){
    var headers=document.getElementsByTagName("header");
    if(headers.length==0)return false;
    var navs=headers[0].getElementsByTagName("nav");
    if(navs.length==0)return false;
    
    var links=navs[0].getElementsByTagName("a");
    for(var i=0;i<links.length;i++)
    {
        var linkurl;
        for(var i=0;i<links.length;i++)
        {
            linkurl=links[i].getAttribute("href");
            if(window.location.href.indexOf(linkurl)!=-1){
                links[i].className="here";
                var linktext=links[i].lastChild.nodeValue.toLowerCase();
                document.body.setAttribute("id",linktext);
            }
        }
    }
}

function moveElement(elementID,final_x,final_y,interval)
{
    //just check anything
    if(!document.getElementById)return false;
    if(!document.getElementById(elementID))return false;
    
    var elem=document.getElementById(elementID);
    
    if(elem.movement){
        clearTimeout(elem.movement);
    }
    
    //check if left and top attributes exist
    if(!elem.style.top)
        elem.style.top="0px";
    if(!elem.style.left)
        elem.style.left="0px";
    
    var xpos=parseInt(elem.style.left);
    var ypos=parseInt(elem.style.top);
    var dist=0;
    if(xpos==final_x && ypos==final_y)
        return true;
    
    /*if(xpos<final_x)
        xpos++;
    if(xpos>final_x)
        xpos--;
    
    if(ypos<final_y)
        ypos++;
    if(ypos>final_y)
        ypos--;*/
    
    if(xpos<final_x)
    {
        dist=Math.ceil((final_x-xpos)/10);
        xpos+=dist;
    }
    if(xpos>final_x){
        dist=Math.ceil((xpos-final_x)/10);
        xpos-=dist;
    }
    if(ypos<final_y){
        dist=Math.ceil((final_y-ypos)/10);
        ypos+=dist;
    }
    if(ypos>final_y){
        dist=ypos-final_y;
        ypos-=dist;
    }
    elem.style.left=xpos+"px";
    elem.style.top=ypos+"px";
    var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement=setTimeout(repeat,interval);
}

function prepareSlideshow(){
    if(!document.getElementById("intro"))return false;
    var intro=document.getElementById("intro");
    var slideshow=document.createElement("div");
    slideshow.setAttribute("id","slideshow");
    
    var preview=document.createElement("img");
    preview.setAttribute("id","preview");
    preview.setAttribute("src","img/slideshow.gif");
    preview.setAttribute("alt","a glimpse of what awaits you");
    slideshow.appendChild(preview);
    insertAfter(slideshow,intro);
    
    var links=intro.getElementsByTagName("a");
    var destination;
    for(var i=0;i<links.length;i++){
        links[i].onmouseover=function(){
            destination=this.getAttribute("href");
            if(destination.indexOf("index.html")!=-1){
                moveElement("preview",0,0,5);
            }
            if(destination.indexOf("about.html")!=-1){
                moveElement("preview",-150,0,5);
            }
            if(destination.indexOf("photos.html")!=-1){
                moveElement("preview",-300,0,5);
            }
            if(destination.indexOf("live.html")!=-1)
            {
                moveElement("preview",-450,0,5);
            }
            if(destination.indexOf("contact.html")!=-1){
                moveElement("preview",-600,0,5);
            }
        };
    }
}

function showSection(id){
    var sections=document.getElementsByTagName("section");
    for(var i=0;i<sections.length;i++)
    {
        if(sections[i].getAttribute("id")!=id)
        {
            sections[i].style.display="none";
        }
        else{
            sections[i].style.display="block";
        }
    }
}

function prepareInternalnav(){
    var articles=document.getElementsByTagName("article");
    if(articles.length==0)return false;
    var navs=articles[0].getElementsByTagName("nav");
    if(navs.length==0)return false;
    var nav=navs[0];
    var links=nav.getElementsByTagName("a");
    for(var i=0;i<links.length;i++)
    {
        var sectionid=links[i].getAttribute("href").split("#")[1];
        if(!document.getElementById(sectionid))continue;
        
        document.getElementById(sectionid).style.display="none";
        links[i].destination=sectionid;
        links[i].onclick=function(){
            showSection(this.destination);
            return false;
        };
    }
}

function showPic(which)
{
    var source = which.getAttribute("href");
    var placeholder=document.getElementById("placeholder");
    
    placeholder.setAttribute("src",source);
    var text=which.getAttribute("title");
    var description=document.getElementById("description");
    description.firstChild.nodeValue=text;
    
    return true;
}
function prepareGallery()
{
    if(!document.getElementsByTagName)
        return false;
    if(!document.getElementById)
        return false;
    if(!document.getElementById("imageGallery"))
        return false;
    var gallery=document.getElementById("imageGallery");
    var links=gallery.getElementsByTagName("a");
    for(var i=0;i<links.length;i++)
    {
        links[i].onclick=function(){
            return showPic(this) ? false:true;
        };
        links[i].onkeypress=links[i].onclick;
    }
}


function preparePlaceholder()
{
    var placeholder=document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","images/placeholder.gif");
    placeholder.setAttribute("alt","my image gallery");
    
    var description=document.createElement("p");
    description.setAttribute("id","description");
    var txt=document.createTextNode("Choose an image");
    description.appendChild(txt);
    
    if(!document.getElementById("imageGallery"))return false;
    var gallery=document.getElementById("imageGallery");
    insertAfter(placeholder,gallery);
    insertAfter(description,placeholder);
}

function stripeTables()
{
    if(!document.getElementsByTagName)return false;
    var tables=document.getElementsByTagName("table");
    for(var i=0;i<tables.length;i++)
    {
        var odd=false;
        var rows=tables[i].getElementsByTagName("tr");
        for(var j=0;j<rows.length;j++){
            if(odd==true)
            {
                addClass(rows[j],"odd");
                odd=false;
            }
            else
                odd=true;
        }
    }
}

function highlightRows(){
    if(!document.getElementsByTagName)return false;
    if(!document.getElementsByTagName("tr"))return false;
    var rows=document.getElementsByTagName("tr");
    for(var i=0;i<rows.length;i++)
    {
        rows[i].oldClassName=rows[i].className;
        rows[i].onmouseover=function(){
            addClass(this,"highlight");
        };
        rows[i].onmouseout=function(){
            this.className=this.oldClassName;
        };
    }
}

function focusLabels(){
    if(!document.getElementsByTagName)return false;
    var labels=document.getElementsByTagName("label");
    for(var i=0;i<labels.length;i++)
    {
        if(!labels[i].getAttribute("for"))continue;
        labels[i].onclick=function(){
            var id=this.getAttribute("for");
            if(!document.getElementById(id))return false;
            var element=document.getElementById(id);
            element.focus();
        }
    }
}

function resetFields(whichform)
{
    if(Modernizr.input.placeholder)return;
    for(var i=0;i<whichform.elements.length;i++)
    {
        var element=whichform.elements[i];
        if(element.type=="submmit")continue;
        var check=element.placeholder||element.getAttribute("placeholder");
        if(!check)continue;
        element.onfocus=function(){
            var text=this.placeholder||this.getAttribute("placeholder");
            if(this.value==text){
                this.className='';
                this.value="";
            }
        };
        element.onblur=function(){
            if(this.value==""){
                this.className='placeholder';
                this.value=this.placeholder||this.getAttribute("placeholder");
            }
        };
        element.onblur();
    }
}

function prepareForms() {
  for (var i=0; i<document.forms.length; i++) {
    var thisform = document.forms[i];
    resetFields(thisform);
    thisform.onsubmit = function() {
      if (!validateForm(this)) return false;
      var article = document.getElementsByTagName('article')[0];
      if (submitFormWithAjax(this, article)) return false;
      return true;
    }
  }
}

function isEmail(field)
{
    return (field.value.indexOf("@")!=-1 && field.value.indexOf(".")!=-1);
}
function isFilled(field)
{
    if(field.value.replace(' ','').length==0)return false;
    var placeholder=field.placeholder||field.getAttribute('placeholder');
    return (field.value!=placeholder);
}
function validateForm(whichform) {
  for (var i=0; i<whichform.elements.length; i++) {
    var element = whichform.elements[i];
    if (element.getAttribute("required") == 'required') {
      if (!isFilled(element)) {
        alert("Please fill in the "+element.name+" field.");
        return false;
      }
    }
    if (element.getAttribute("type") == 'email') {
      if (!isEmail(element)) {
        alert("The "+element.name+" field must be a valid email address.");
        return false;
      }
    }
  }
  return true;
}

function displayAjaxLoading(element)
{
    while(element.hasChildNodes())
    {
        element.removeChild(element.lastChild);
    }
    var content=document.createElement("img");
    content.setAttribute("src","img/loading.gif");
    content.setAttribute("alt","Loading...");
    element.appendChild(content);
}

function getHTTPObject() {
  if (typeof XMLHttpRequest == "undefined")
    XMLHttpRequest = function () {
      try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
        catch (e) {}
      try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
        catch (e) {}
      try { return new ActiveXObject("Msxml2.XMLHTTP"); }
        catch (e) {}
      return false;
  }
  return new XMLHttpRequest();
}

function submitFormWithAjax(whichform,thetarget)
{
    var request = getHTTPObject();
  if (!request) { return false; }

  // Display a loading message.
  displayAjaxLoading(thetarget);

  // Collect the data.
  var dataParts = [];
  var element;
  for (var i=0; i<whichform.elements.length; i++) {
    element = whichform.elements[i];
    dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
  }
  var data = dataParts.join('&');
  request.open('POST', whichform.getAttribute("action"), true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function () {
    if (request.readyState == 4) {
        if (request.status == 200 || request.status == 0) {
          var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
          if (matches.length > 0) {
              //alert("a");
            thetarget.innerHTML = matches[1];
          } else {
              //alert("b");
            thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>';
          }
        } else {
            //alert("c");
          thetarget.innerHTML = '<p>' + request.statusText + '</p>';
        }
    }
  };

  request.send(data);
   
  return true;
}

window.onload=function(){
    highlightPage();
    prepareSlideshow();
    prepareInternalnav();
    preparePlaceholder()
    prepareGallery();
    stripeTables();
    highlightRows();
    prepareForms();
    focusLabels();
    //alert("shit");
};

