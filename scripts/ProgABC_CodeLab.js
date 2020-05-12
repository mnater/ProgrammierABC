//Copyright 2005, Mathias Nater (Dietikon, Switzerland), mnater@mac.com

/*
* Stellt Funktionen für das CodeLab bereit.
* Benötigt ausserdem die folgenden Dateien:
*     <script src="ProgABC_HLCode.js" type="text/javascript"></script>
*     <script src="ProgABC_JavaScript_SyntaxDefinition.js" type="text/javascript"></script>
*/


/*
* Initialisierer - muss beim Laden des Fensters ausgeführt werden
* 
* Registriert Event-Handler in verschiedenen Elementen (zur Vermeidung von onXYZ-Handlern im XHTML-Code).
*
* @param void
* @requires Elements output, hlcode, runB, runB2, testB, editB, formView, paragraphView
* @onerror alert(e);
*/
function ProgABC_codelabinit()
{    
    //Handler registrieren
    ProgABC_regEventListener('CL_runB','onclick','ProgABC_runScript');
    ProgABC_regEventListener('CL_runB2','onclick','ProgABC_runScript');
    ProgABC_regEventListener('CL_testB','onclick','ProgABC_showhighlight');
    ProgABC_regEventListener('CL_editB','onclick','ProgABC_showform');
    ProgABC_regEventListener('CL_code','onkeyup','ProgABC_FormKeyHandler');
    //ProgABC_regEventListener('CL_hlcode','ondblclick','ProgABC_showform');
    //Elemente anzeigen/ausblenden
    ProgABC_hide('CL_formView');
    ProgABC_hide('CL_paragraphView');
    script='';
    script1 = '';
    varString = '';
    script2 = '';
    scriptLocked = '';
    checkinterval = '';
    instring='';
}

/*
* Aktiviert die Codeeingabe
* 
* Verbirgt den HLCode und zeigt das Formular an, aktiviert dieses für die Eingabe
*
* @param void
* @requires function ProgABC_hide('id'), function ProgABC_show('id'), Elements paragraphView, formView, code
* @onerror void
*/
function ProgABC_showform()
{
    ProgABC_hide('CL_paragraphView');
    ProgABC_show('CL_formView');
    document.getElementById('CL_code').focus();
}

function ProgABC_FormKeyHandler(e)
{
    if(e.keyCode)
    {
        ch=e.keyCode;
    }
    if(ch==9)
    {
        if(this.selectionStart || this.selectionStart=='0')
        {
            var startPos = this.selectionStart;
            var endPos = this.selectionEnd;
            this.value = this.value.substring(0, startPos) + '\t' + this.value.substring(endPos);
            this.selectionEnd = endPos+1;
            this.selectionStart = endPos+1;
        }
    }
}

/*
* Aktiviert die Codeanzeige
* 
* Verbirgt das Eingabeformular und zeigt den HLCode an. Löscht alte Ausgaben
*
* @param void
* @requires function ProgABC_clearoldoutputs(), function ProgABC_hlScript(script), Elements code, formView, paragraphViews
* @onerror void
*/
function ProgABC_showhighlight()
{
    var code = document.getElementById('CL_code').value;
    ProgABC_clearoldoutputs();
    ProgABC_hlScript(code);
    ProgABC_hide('CL_formView');
    ProgABC_show('CL_paragraphView');
}

/*
* Zeigt ein Element an
*
* @param string id id des Elements
*/
function ProgABC_show(id)
{
    var elem = document.getElementById(id);
    elem.style.visibility='visible';
}

/*
* Verbirgt ein Element
*
* @param string id id des Elements
*/
function ProgABC_hide(id)
{
    var elem = document.getElementById(id);
    elem.style.visibility='hidden';
}

/*
* Registriert einen EventListener auf einem Element
*
* @param string id id des Elements
* @param string evt JavaScript Event (onclick, obdblclick etc.)
* @param string func Funktion die vom Event ausgelöst wird.
*/
function ProgABC_regEventListener(id, evt, func)
{
    var elem = document.getElementById(id);
    eval('elem.'+evt+' = '+func);
}

/*
* Stellt das Script farblich hervorgehoben dar
*  
* Konvertiert den Script-Text mittels der Klasse HLCode.js in farblich hervorgehobenen XHTML-Text
* und stellt gibt diesen in einem Element mit id="hlcode" aus.
*
* @param string script Das Script
* @requires class HLCode.js
* @requires Element mit id="hlcode" (<div id="hlcode"> </div>)
* @onerror alert(e);
*/
function ProgABC_hlScript(script)
{
    try{
        //Klasse initialisieren
        var myCode = new ProgABC_HLCode(script, new ProgABC_JavaScript_SyntaxDefinition());
        //highlighten
        myCode.highlight();
        //neuen HLCode ausgeben
        window.CL_hlcodeframe.document.getElementById('CL_hlcode').appendChild(myCode.get());
    }
    catch (e) {
        alert(e);
    }
}


/*
* Führt ein Script aus und zeigt Ausgaben an
*  
* Führt ein Script aus, tritt dabei ein Fehler auf, wird ein alert() ausgelöst.
* Mit dem Befehl output(mixed) können im Script Ausgaben direkt ins CodeLab geschrieben werden.
* Dafür wird ein Element mit der id="scriptout" benötigt.
*
* @param string script Das Script
* @requires Element mit id="scriptout" (<span id="scriptout"> </span>)
* @onerror alert(e);
*/
function ProgABC_runScript() //führt ein Script aus
{
    try{
        script = document.getElementById('CL_code').value;
        ProgABC_showhighlight();
        if(script.search(/input/) != -1) //script enthält input()
        {
            ProgABC_runGeekyScript(script);
        }
        else
        {
            eval(script); //script ausführen
        }
    }
    catch (e) {
        alert(e);
    }
}

function ProgABC_continueScript(script)
{
    try{
        if(script.search(/input/) != -1) //script enthält input()
        {
            ProgABC_runGeekyScript(script);
        }
        else
        {
            eval(script); //script ausführen
        }
    }
    catch (e) {
        alert(e);
    }
}

function ProgABC_runGeekyScript(script)
{
    var cutAt = script.match(/\w*\s*=\s*input\(\);/);
    cutAt = cutAt[0];
    var cutFrom = script.search(/\w*\s*=\s*input\(\);/);
    var cutTo = cutFrom+cutAt.length;
    script1 = script.substring(0,cutFrom);
    varString = cutAt.match(/\w*\s*=\s*/);
    script2 = script.substring(cutTo);
    checkinterval = window.setInterval('ProgABC_checkLock(script2);',1000);
    eval(script1);
    ProgABC_input();
}


/*
* Löscht die Ausgaben
*  
* Löscht die Ausgaben in den Elementen mit id="scriptout" und id="hlcode"
*
* @param void
* @requires Element mit id="scriptout" (<span id="scriptout"> </span>) und id="hlcode"
*/
function ProgABC_clearoldoutputs()
{
    try{
        //alten HLCode löschen
        var knoten = window.CL_hlcodeframe.document.getElementById('CL_hlcode').firstChild;
        window.CL_hlcodeframe.document.getElementById('CL_hlcode').removeChild(knoten);

        //alten scriptoutput löschen
        var parent = window.CL_outputframe.document.getElementById('CL_scriptout').parentNode;
        parent.removeChild(window.CL_outputframe.document.getElementById('CL_scriptout'));
        //<span id="scriptout"> </span> wieder herstellen
        knoten = window.CL_outputframe.document.createElement('span');
        var myid = window.CL_outputframe.document.createAttribute('id');
        myid.nodeValue = 'CL_scriptout';
        knoten.setAttributeNode(myid);
        parent.appendChild(knoten);
    }
    catch(e) {
        alert(e);
    }
}


/*
* Stellt einen Befehl für die Ausgabe bereit
*  
* Im Script können mit dem Befehl output(mixed) direkt Ausgaben ins CodeLab geschrieben werden.
* output() kann mehrmals verwendet werden; die Ausgaben werden einfach mit einem Zeilenumbruch angehängt.
* Dafür wird ein Element mit der id="scriptout" benötigt.
*
* @param string out Der Output
* @requires Element mit id="scriptout" (<span id="scriptout"> </span>)
*/
function output(out)
{
    ProgABC_output(out);
}
function ProgABC_output(out)
{
    //out in einen String verwandeln (parsen)
    out = out.toString();
    var mybreak, mytext;
    var myout = window.CL_outputframe.document.getElementById('CL_scriptout');
    //Zeilenumbruch einfügen
    mybreak = window.CL_outputframe.document.createElement('br');
    myout.appendChild(mybreak);
    //falls out mit Leerzeichen beginnt, diese ausgeben
    /*for(var i=0; i<out.length; i++)
    {
        if(out.charAt(i)==' ')
        {
            var myspace = window.CL_outputframe.document.createElement('\&nbsp;');
            myout.appendChild(myspace);
        }
        else
        {
            break;
        }
    }*/
    //out einfügen, wird automatisch ausgegeben
    mytext = window.CL_outputframe.document.createTextNode(out);
    myout.appendChild(mytext);
}

/*
* Verlangt eine Eingabe vom Benutzer
*
* Im Script kann mit dem Befehl input(mixed) eine Benutzereingabe verlangt werden.
* input zeigt im Script-Dialog ein Eingabefeld an.
* Dafür wird ein Element mit der id="scriptout" benötigt.
*
* @returns mixed
* @requires Element mit id="scriptout" (<span id="scriptout"> </span>)
*/
function ProgABC_checkLock()
{
    if(scriptLocked==false)
    {
        window.clearInterval(checkinterval);
        ProgABC_continueScript(script2);
    }    
}

function ProgABC_input()
{
    var myout=window.CL_outputframe.document.getElementById('CL_scriptout');
    //Zeilenumbruch einfügen
    var mybreak = window.CL_outputframe.document.createElement('br');
    myout.appendChild(mybreak);
    var myinput=document.createElement('input');
    var mytype=document.createAttribute('type');
    mytype.nodeValue='text';
    myinput.setAttributeNode(mytype);
    var myid=document.createAttribute('id');
    myid.nodeValue='infield';
    myinput.setAttributeNode(myid);
    var mysize=document.createAttribute('size');
    mysize.nodeValue='50';
    myinput.setAttributeNode(mysize);
    myout.appendChild(myinput);
    scriptLocked=true;
    window.CL_outputframe.document.getElementById('infield').onkeyup=ProgABC_inputKeyHandler;
    window.CL_outputframe.document.getElementById('infield').focus();
}

function ProgABC_inputKeyHandler(e)
{
    if(e.keyCode)
    {
        ch=e.keyCode;
    }
    if(ch==13)
    {
        var myinput = window.CL_outputframe.document.getElementById('infield');
        instring = myinput.value;
        eval(varString+'"'+instring+'";');
        myinput.onkeyup = '';
        var mytext = window.CL_outputframe.document.createTextNode(instring);
        var mypar=myinput.parentNode;
        mypar.replaceChild(mytext,myinput.parentNode.lastChild);
        scriptLocked=false;
    }
}


/*
* Belegt das CodeLab mit übergebenem Text
*
* Der Funktion kann ein Text (z.B. Code) übergeben werden, der dann in das
* textarea-Feld eingefügt und gehighlightet wird.
*
* @param string text Der Text
* @requires Element mit id="CL_code" (<textarea id="CL_code">)
*/
function ProgABC_setCLDefaultTextTo(text)
{
    var elem = document.getElementById('CL_code');
    if(text)
    {
        elem.value=decodeURIComponent(text);
    }
    else
    {
        var text="'Aendern' klicken, um Code einzugeben!";
        elem.value=text;
    }
}

function ProgABC_Zufall(min, max)
{
	return Math.round((max-min)*Math.random()+min);
}

/*
* Speichert einen übergebenen Text
*
* TODO!!
*
* @param string text Der zu speichernde Text
*/
function ProgABC_save(text)
{
    var F1 = window.open('', '_blank', 'width=310,height=400,left=0,top=0');
    //alert(F1.document.title);
    F1.document.open('text/plain');
    F1.document.write('<html><body><pre>'+text+'</pre></body></html>');


}