//Quicksort in Javascript//Array erstellen
counter = 0;a = new Array();for(var i=0; i<1000; i++){    a[i]=Math.floor(Math.random()*100)+1;}
b = a;
function numsort(a,b)
{
    return a-b;
}
function qsort(a,low,hi){    counter++;    
    var len = hi-low+1;    if(len<=1)    {        return;    }
    var last = low;    var p=Math.floor(Math.random()*len)+low;
    if((low+hi)/2 == p)
    {
        var sorted=true;
        for(var i=low; i<=hi; i++)
        {
            if(a[i]!=a[p])
            {
                sorted=false;
            }
        }
        if(sorted==true)
        {
            return;
        }
    }
    swap(low, p);    for(var i=low; i<=hi; i++)    {        if(a[i]<a[low])        {            last++;            swap(last,i);        }    }    swap(last, low);    qsort(a,low,last-1);
    qsort(a,last+1,hi);}function swap(e1, e2){    var etemp=a[e1];    a[e1] = a[e2];    a[e2] = etemp;}
start = new Date();qsort(a,0,a.length-1);
end = new Date();
diff = end-start;
output('QUICKSORT()');
output('L&Auml;nge der Liste: '+a.length);
output(a);
output('Rechenzeit (ms): '+diff);
output('Calls: '+counter);

start = new Date();b.sort(numsort);
end = new Date();
diff = end-start;
output(' ');
output('ARRAY.SORT()');
output('L&Auml;nge der Liste: '+b.length);
output(b);
output('Rechenzeit (ms): '+diff);