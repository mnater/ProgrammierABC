function ProgABC_Checker_check(elem,num)
{
    var sum=0;
    for(var i=0;i<elem.length;i++)
    {
        if(elem.antwort[i].checked == true)
        sum = sum + parseInt(elem.antwort[i].value);
    }
    elem = document.getElementById('auswertung');
    if(sum == num)
    {
        elem.setAttribute('style','color:green;');
        elem.firstChild.nodeValue=' Richtig!';
    }
    else
    {
        if(sum == 0)
        {
            elem.setAttribute('style','color:orange;');
            elem.firstChild.nodeValue=' Bitte Haken setzen!';
        }
        else
        {
            elem.setAttribute('style','color:red;');
            elem.firstChild.nodeValue=' Nicht ganz!';
        }
    }
}

function ProgABC_Checker_checkArray(elem,solutions_array)
{
    var sum=0;
    for(var i=0;i<elem.length;i++)
    {        
        if(elem.antwort[i].value==solutions_array[i])
        {
            sum++;
        }
    }
    elem = document.getElementById('auswertung');
    if(sum == solutions_array.length)
    {
        elem.setAttribute('style','color:green;');
        elem.firstChild.nodeValue=' Richtig!';
    }
    else
    {
        if(sum == 0)
        {
            elem.setAttribute('style','color:orange;');
            elem.firstChild.nodeValue=' Bitte Haken setzen!';
        }
        else
        {
            elem.setAttribute('style','color:red;');
            elem.firstChild.nodeValue=' Nicht ganz!';
        }
    }
}

function ProgABC_Checker_checkString(elem,solutions_array)
{
    var richtig=0;
    for(var i=0;i<solutions_array.length;i++)
    {        
        if(elem.antwort.value==solutions_array[i])
        {
            richtig++;
        }
    }
    elem = document.getElementById('auswertung');
    if(richtig >= 1)
    {
        elem.setAttribute('style','color:green;');
        elem.firstChild.nodeValue=' Richtig!';
    }
    else
    {
            elem.setAttribute('style','color:red;');
            elem.firstChild.nodeValue=' Nicht ganz!';
    }
}