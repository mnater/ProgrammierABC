function ProgABC_JavaScript_SyntaxDefinition()
{
    //Zeichen die ersetzt werden müssen
    //Das Zeichen fromEntity[n] wird durch das Zeichen toEntity[n] ersetzt
    this.fromEntity = new Array('<','>','"','&',' ');
    this.toEntity = new Array('&lt;','&gt;','&quot;','&amp;','&nbsp;');
    
    this.keywords = new Array('break','case','catch','const','continue','default','delete','do','else','export','false','finally','for','function','if','in','instanceof','new','null','return','switch','this','throw','true','try','typeof','undefined','var','void','while','with');
    
    this.singlecomment = '//';
    this.longcomment = new Array('/*','*/');
    this.string = '\'';
}