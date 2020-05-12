function ProgABC_HLCode(code, syntaxdef) //Highlighter-Klasse
{
    this.code = code; //Code zum highlighten
    this.syntaxdef = syntaxdef; //Syntax-Definition-Object
    
    this.hlcode = document.createElement('pre'); //DOM-Objekt <pre>(eingefärbter Code)</pre>
    
    this.get = function()
    {
        return this.hlcode;
    };


    this.highlight = function()
    {
        //Variablen definieren
        var codelength = this.code.length;
        var temp = '';
        var i,k; //increments
        var begin = 0;
        var myspan, mytext, myclass;
        
        
        //Entities ersetzen
        for (i = 0; i < codelength; i++)
        {
            temp += this.entities(this.code.substr(i,1));
        }
        //this.code = temp;
        //Einfärben
        codelength = this.code.length;
        temp = '';
        for (i = 0; i < codelength; i++)
        {
            if(this.code.substr(i,1).match(/\w/))  //alphanumerisch -> function, keyword, variable, string
            {
                //isolieren des wortes in temp:
                begin = i;
                while(this.code.substr(i,1).match(/\w/))
                {
                    i++;
                }
                temp = this.code.substring(begin,i);
                //ist temp ein keyword?
                for(k = 0; k < this.syntaxdef.keywords.length; k++)
                {
                    if(this.syntaxdef.keywords[k] == temp)
                    {
                        myspan = document.createElement('span');
                        mytext = document.createTextNode(temp);
                        myclass = document.createAttribute('class');
                        myclass.nodeValue = 'keyword';
                        myspan.appendChild(mytext);
                        myspan.setAttributeNode(myclass);
                        this.hlcode.appendChild(myspan);
                        temp='';
                    }
                }
                
                //ist temp ein funktionsname (temp gefolgt von einer Klammer '(' )?
                if(this.code.substr(i,1).match(/\(/))
                {
                    myspan = document.createElement('span');
                    mytext = document.createTextNode(temp);
                    myclass = document.createAttribute('class');
                    myclass.nodeValue = 'function';
                    myspan.appendChild(mytext);
                    myspan.setAttributeNode(myclass);
                    this.hlcode.appendChild(myspan);
                    temp = '';
                }
                
                //ist temp eine Zahl?
                if(temp.match(/\d/))
                {
                    myspan = document.createElement('span');
                    mytext = document.createTextNode(temp);
                    myclass = document.createAttribute('class');
                    myclass.nodeValue = 'number';
                    myspan.appendChild(mytext);
                    myspan.setAttributeNode(myclass);
                    this.hlcode.appendChild(myspan);
                    temp = '';
                }
                
                /*mytext = document.createTextNode(temp);
                this.hlcode.appendChild(mytext);*/
                
            }
            
            if(this.code.substr(i,2) == this.syntaxdef.singlecomment) //Ein Kommentar
            {
                //isolieren des Kommentars in temp:
                begin = i;
                while((0<this.code.substr(i,1).length) && !this.code.substr(i,1).match(/[\n\r]/))
                {
                    i++;
                }
                temp = this.code.substring(begin,i);
                myspan = document.createElement('span');
                mytext = document.createTextNode(temp);
                myclass = document.createAttribute('class');
                myclass.nodeValue = 'comment';
                myspan.appendChild(mytext);
                myspan.setAttributeNode(myclass);
                this.hlcode.appendChild(myspan);
                temp='';
            }

            if(this.code.substr(i,2) == this.syntaxdef.longcomment[0]) //Ein langer Kommentar
            {
                //isolieren des Kommentars in temp:
                begin = i;
                while(this.code.substr(i,2) != this.syntaxdef.longcomment[1])
                {
                    i++;
                }
                i=i+2;
                temp = this.code.substring(begin,i);
                myspan = document.createElement('span');
                mytext = document.createTextNode(temp);
                myclass = document.createAttribute('class');
                myclass.nodeValue = 'comment';
                myspan.appendChild(mytext);
                myspan.setAttributeNode(myclass);
                this.hlcode.appendChild(myspan);
                temp='';
            }
            
            if(this.code.substr(i,1) == this.syntaxdef.string) //Ein String
            {
                //isolieren des Strings in temp:
                begin = i;
                i++;
                while(this.code.substr(i,1) != this.syntaxdef.string && i<=codelength)
                {
                    i++;
                }
                i++;
                temp = this.code.substring(begin,i);
                myspan = document.createElement('span');
                mytext = document.createTextNode(temp);
                myclass = document.createAttribute('class');
                myclass.nodeValue = 'string';
                myspan.appendChild(mytext);
                myspan.setAttributeNode(myclass);
                this.hlcode.appendChild(myspan);
                temp='';
            }
            temp += this.code.substr(i,1);
            mytext = document.createTextNode(temp);
            this.hlcode.appendChild(mytext);
            temp = '';
        }
        
        
        
    };
    
    this.entities = function(zeichen)
    {
        var from = this.syntaxdef.fromEntity;
        var to = this.syntaxdef.toEntity;
        var i;
        for(i = 0; i < from.length; i++)
        {
            if(zeichen == from[i])
            {
                return to[i];
            }
        }
        return zeichen;
    };
    
}