function ProgABC_UIinit() {
	codelabwin=null;
    try {
        document.getElementById('infobtn').onclick = ProgABC_showinfo;
        document.getElementById('questbtn').onclick = ProgABC_showquest;
        document.getElementById('codelabbtn').onclick = ProgABC_showcodelab;
        document.getElementById('closeinfobtn').onclick = ProgABC_close;
        document.getElementById('closequestbtn').onclick = ProgABC_close;
        document.getElementById('logo').onclick = ProgABC_goIndex;
        ProgABC_highlightCode();
    }
    catch(e)
    {
        alert(e);
    }
    ProgABC_slidein('infobtn', 0, 300);
    ProgABC_slidein('questbtn', 0, 160);
    ProgABC_slidein('codelabbtn', 0, 20);
}

function ProgABC_highlightCode()
{
    var divs = new Array();
    var spans= new Array();
    var codedivs = new Array();
    var j=0;
    divs = document.getElementsByTagName('div');
    for(var i=0; i<divs.length; i++)
    {
        if(divs[i].className=="code")
        {
            codedivs[j] = divs[i];
            j++;
        }
    }
    spans = document.getElementsByTagName('span');
    for(var i=0; i<spans.length; i++)
    {
        if(spans[i].className=="code")
        {
            codedivs[j] = spans[i];
            j++;
        }
    }
    for(var i=0; i<codedivs.length; i++)
    {
        var script = codedivs[i].firstChild.data;
        var myCode = new ProgABC_HLCode(script, new ProgABC_JavaScript_SyntaxDefinition());
        //highlighten
        myCode.highlight();
        //neuen HLCode ausgeben
        codedivs[i].replaceChild(myCode.get(),codedivs[i].firstChild);
    }
}

function ProgABC_close()
{
    ProgABC_fade(this.parentNode.attributes[0].nodeValue, 1, 0);
}

function ProgABC_showinfo()
{
    ProgABC_hideall();
    ProgABC_fade('info', 0, 1);
}

function ProgABC_hideall()
{
    document.getElementById('info').style.visibility='hidden';
    document.getElementById('quest').style.visibility='hidden';
}

function ProgABC_showquest()
{
    ProgABC_hideall();
    ProgABC_fade('quest', 0, 1);
}

function ProgABC_showcodelab()
{
    if(document.getElementById('codelabtext'))
    {
        var text=encodeURIComponent(document.getElementById('codelabtext').firstChild.data);
    }
    else
    {
        var text="";    
    }
    var fheight = 600;
    var fwidth = 900;
    var ypos = (screen.height-fheight)/2;
    var xpos = (screen.width-fwidth)/2;
    var settings = 'dependent=yes,height='+fheight+',width='+fwidth+'top='+ypos+',left='+xpos+',location=no,menubar=no,resizable=yes,scrollbars=no,status=no,toolbar=no';
    if(codelabwin==null || codelabwin.closed==true)
    {
    	codelabwin=window.open('ProgABC_codelab.html?'+text,'CodeLab',settings);
    }
    else
    {
    	codelabwin.focus();
    }
}

function ProgABC_fade(elem, from, to)
{
    try
    {
        var infoelem = document.getElementById(elem);
    }
    catch(e)
    {
        alert(e);
    }
    infoelem.style.opacity=from;
    infoelem.style.visibility='visible';
    var i = from;
    var step = to - from;
    step = step/11;
    var inter = setInterval(
        function() {
            i = i+step;
            if((from < to) && (i < to)) //fadein
            {
                infoelem.style.opacity = i;
                //alert(infoelem.style.opacity);
            }
            else
            {
                if((from > to) && (i > to)) //fadeout
                {
                infoelem.style.opacity = i;
                }
                else
                {
                infoelem.style.opacity = to;
                if(to==0)
                {
                    infoelem.style.visibility='hidden';
                }
                clearInterval(inter);
                }
            }
        }, 11);
}

function ProgABC_slidein(elemid, from, to)
{
    try {
        var elem = document.getElementById(elemid);
    }
    catch(e)
    {
        alert(e);
    }
    elem.style.position = 'absolute';
    var x = from-80;
    elem.style.right = x+'px';
    var step = Math.abs(to-from)/10;
    if(step <= 5)
    {
        step = step + 5;
    }
    //alert(step);
    var inter = setInterval(
        function() {
            x = x+step;
            elem.style.right = x+'px';
            //alert(x);
            if(x>=to)
            {
                clearInterval(inter);
            }
    },50);
}

function ProgABC_goToc()
{
    window.location.href = 'toc.html';
}

function ProgABC_goIndex()
{
    window.location.href = 'index.html';
}


function ProgABC_OpenGlossar(wort)
{
    window.open('Glossar/'+wort+'.html', '_blank','dependent=yes,height=250,width=500,location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=no,top=40,left=40');
}