function testTest(){ 
    let valor; 
    do{ 
        valor= prompt('Ingrese un valor entre 0 y 999: ', ''); 
        valor=parseInt(valor); 
        document.write('El valor ' + valor + 'tiene'); 
        if (valor<0 || valor >999 || isNaN(valor)){ 
            document.write("El número no está en rango ")
        }
        if (valor<10)
            document.write('Tiene 1 dígito'); 
        else{ 
            if(valor<100)
                document.write('Tiene 2 dígitos'); 
            else if (valor<999) 
                document.write('Tiene 3 digitos');
        } 
        document.write('<br>  />'); 
        
    }
    while(valor>0 && valor<=999);
}