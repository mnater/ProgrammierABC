//Quicksort in Javascript
counter = 0;
b = a;
function numsort(a,b)
{
    return a-b;
}

    var len = hi-low+1;
    var last = low;
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
    swap(low, p);
    qsort(a,last+1,hi);
start = new Date();
end = new Date();
diff = end-start;
output('QUICKSORT()');
output('L&Auml;nge der Liste: '+a.length);
output(a);
output('Rechenzeit (ms): '+diff);
output('Calls: '+counter);

start = new Date();
end = new Date();
diff = end-start;
output(' ');
output('ARRAY.SORT()');
output('L&Auml;nge der Liste: '+b.length);
output(b);
output('Rechenzeit (ms): '+diff);