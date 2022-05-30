
var x1 = "";
var y1 = "";


var x2 = "";
var y2 = "";

var xc = "";
var yc = "";
var rc = "";

var dibujo = false;
var blaDibujo = false;
var ddaDibujo = false;
var bresenDibujo = false;

var puntoMed = false;
var bresenCircle = false;

//window.onload = setInterval(crono, 10);

window.onload = function () {
    var canvas = document.getElementById('screen');
    new Processing(canvas, proceso);
}

function cuadricula(P) {
    for (i = 0; i <= P.height; i = i + 10) {
        P.stroke(i % 100 == 0 ? 0
            : i % 50 == 0 ? 85
                : 180);
        P.line(i, 0, i, P.height);
        P.line(0, i, P.width, i);
    }
}

function proceso(P) {

    P.size(600, 600);
    P.draw = function () {
        P.background(100, 160, 255);
        cuadricula(P);

        P.pushMatrix();
        P.translate(300, 300);
        P.ellipse(0, 0, 10, 10);
        P.popMatrix();

        if (dibujo) {
            var ax1 = parseInt(x1);
            var ay1 = parseInt(y1);

            var ax2 = parseInt(x2);
            var ay2 = parseInt(y2);

            P.pushMatrix();
            pintarPunto(P, ax1, ay1);
            P.popMatrix();

            P.pushMatrix();
            pintarPunto(P, ax2, ay2);
            P.popMatrix();

        }

        if (blaDibujo) {
            P.pushMatrix();
            blAlgorithm(P);
            P.popMatrix();
        }

        if (ddaDibujo) {
            P.pushMatrix();
            ddAlgorithm(P);
            P.popMatrix();
        }

        if (bresenDibujo) {
            P.pushMatrix();
            bresenhamAlgorithm(P);
            P.popMatrix();
        }

        if (puntoMed) {
            P.pushMatrix();
            puntoMedio(P);
            P.popMatrix();
        }

        if(bresenCircle){
            P.pushMatrix();
            bresenhamCircle(P);
            P.popMatrix();
        }

    }

}

function bresenhamAlgorithm(P) {
    var ax1 = parseInt(x1);
    var ay1 = parseInt(y1);

    var ax2 = parseInt(x2);
    var ay2 = parseInt(y2);

    P.pushMatrix();
    pintarPunto(P, ax1, ay1);
    P.popMatrix();

    var dx = ax2 - ax1;
    var dy = ay2 - ay1;

    var p0 = 2 * dy - dx;

    var x0 = ax1;
    var y0 = ay1;

    for (var k = 0; k < dx - 1; k++) {
        if (p0 < 0) {
            x0 = x0 + 1;
            P.pushMatrix();
            pintarPunto(P, x0, y0);
            P.popMatrix();
            p0 = p0 + 2 * dy;
        } else {
            x0 = x0 + 1;
            y0 = y0 + 1;
            P.pushMatrix();
            pintarPunto(P, x0, y0);
            P.popMatrix();
        }
    }

    P.pushMatrix();
    pintarPunto(P, ax2, ay2);
    P.popMatrix();
}


function blAlgorithm(P) {
    var ax1 = parseInt(x1);
    var ay1 = parseInt(y1);

    var ax2 = parseInt(x2);
    var ay2 = parseInt(y2);

    var m = (ay2 - ay1) / (ax2 - ax1);
    if (0 <= Math.abs(m) && Math.abs(m) <= 1) {
        P.pushMatrix();
        pintarPunto(P, ax1, ay1);
        P.popMatrix();

        P.pushMatrix();
        pintarPunto(P, ax2, ay2);
        P.popMatrix();

        var y0 = ay1;
        for (var x0 = ax1 + 1; x0 <= ax2; x0++) {
            auxy0 = y0 + m;
            y0 = Math.round(auxy0);
            P.pushMatrix();
            pintarPunto(P, x0, y0);
            P.popMatrix();
        }
    } else {
        alert('La pendiente no se encuentra entre 0 y 1');
        blaDibujo = false;
        return false;
    }
}

function ddAlgorithm(P) {

    var ax1 = parseInt(x1);
    var ay1 = parseInt(y1);

    var ax2 = parseInt(x2);
    var ay2 = parseInt(y2);

    var dx = ax2 - ax1;
    var dy = ay2 - ay1;

    var y0 = ay1;
    var x0 = ax1;

    var steps = 0;
    if (Math.abs(dx) > Math.abs(dy)) {
        steps = Math.abs(dx);
    } else {
        steps = Math.abs(dy);
    }

    var xI = dx / steps;
    var yI = dy / steps;

    P.pushMatrix();
    pintarPunto(P, x0, y0);
    P.popMatrix();

    for (k = 0; k < steps; k++) {
        x0 = x0 + xI;
        y0 = y0 + yI;
        P.pushMatrix();
        pintarPunto(P, Math.trunc(x0), Math.trunc(y0));
        P.popMatrix();
    }


}



function validar() {
    if (document.formulario.cx1.value.length != 0 && document.formulario.cy1.value.length != 0
        && document.formulario.cx2.value.length != 0 && document.formulario.cy2.value.length != 0) {
        alert('Buenos datos');
        return true;
    } else {
        alert('Rellene todos los datos');
        return false;
    }
}

function asignarCoordenadas(identificador) {

    if (validar()) {
        x1 = document.formulario.cx1.value;
        y1 = document.formulario.cy1.value;

        x2 = document.formulario.cx2.value;
        y2 = document.formulario.cy2.value;

        dibujo = false;
        blaDibujo = false;
        ddaDibujo = false;

        switch (identificador) {
            case 0:
                dibujo = true;
                break;

            case 1: // Basic line algorithm
                blaDibujo = true;
                break;

            case 2:
                ddaDibujo = true;
                break;

            case 3:
                bresenDibujo = true;
        }

    } else {
        x1 = "";
        y1 = "";

        x2 = "";
        y2 = "";
    }
}

function pintarPunto(P, cx1, cy1) {
    if (cx1 >= 0) {
        cx1 = cx1 * 10 - 10;
    } else {
        cx1 = cx1 * 10;
    }
    if (cy1 >= 0) {
        cy1 = cy1 * 10;
    } else {
        cy1 = cy1 * 10 + 10;
    }

    P.translate(300 + cx1, 300 - cy1);
    P.rect(0, 0, 10, 10);

}

function borrar() {
    // Creamos nuestro canvas
    var canvas = document.getElementById("screen");
    var ctx = canvas.getContext("2d");
    // Borramos el área que nos interese
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujo = false;
    blaDibujo = false;
    ddaDibujo = false;
    bresenDibujo = false;
}

function validarCirculo() {
    if (document.formulario.xc.value.length != 0 && document.formulario.yc.value.length != 0
        && document.formulario.rc.value.length != 0) {
        alert('Buenos datos');
        return true;
    } else {
        alert('Rellene todos los datos');
        return false;
    }
}

function asignarDatosCirculo(identificador) {
    if (validarCirculo()) {
        xc = document.formulario.xc.value;
        yc = document.formulario.yc.value;

        rc = document.formulario.rc.value;

        puntoMed = false;
        bresenCircle = false;

        switch (identificador) {
            case 0:
                puntoMed = true;
                break;

            case 1:
                bresenCircle = true;
                break;

        }

    } else {
        xc = "";
        yc = "";

        rc = "";
    }
}

function centrar(P, x, y) {
    if (x >= 0) {
        x = x * 10;
    } else {
        x = x * 10 + 10;
    }
    if (y >= 0) {
        y = y * 10;
    } else {
        y = y * 10 + 10;
    }
    P.translate(x, -1 * y);
}

function puntoMedio(P) {
    var x0 = parseInt(xc);
    var y0 = parseInt(yc);

    var r = parseInt(rc);


    centrar(P, x0, y0);

    P.pushMatrix();
    pintarPunto(P, 0, 0);
    P.popMatrix();

    x0 = 0;
    y0 = r;

    P.pushMatrix();
    pintarPunto(P, x0, y0);
    P.popMatrix();


    var p0 = (5 / 4) - r;

    while (x0 < y0) {
        if (p0 < 0) {
            x0 = x0 + 1;
            P.pushMatrix();
            pintarPunto(P, x0, y0);
            P.popMatrix();

            P.pushMatrix();
            pintarPunto(P, -1 * x0, y0);
            P.popMatrix();

            P.pushMatrix();
            pintarPunto(P, x0, -1 * y0);
            P.popMatrix();

            P.pushMatrix();
            pintarPunto(P, -1 * x0, -1 * y0);
            P.popMatrix();




            P.pushMatrix();
            pintarPunto(P, y0, x0);
            P.popMatrix();

            P.pushMatrix();
            pintarPunto(P, -1 * y0, x0);
            P.popMatrix();

            P.pushMatrix();
            pintarPunto(P, y0, -1 * x0);
            P.popMatrix();

            P.pushMatrix();
            pintarPunto(P, -1 * y0, -1 * x0);
            P.popMatrix();

            p0 = p0 + 2 * x0 + 1
        } else {
            x0 = x0 + 1;
            y0 = y0 - 1;

            P.pushMatrix();
            pintarPunto(P, x0, y0);
            P.popMatrix();

            P.pushMatrix();
            pintarPunto(P, -1 * x0, y0);
            P.popMatrix();

            P.pushMatrix();
            pintarPunto(P, x0, -1 * y0);
            P.popMatrix();

            P.pushMatrix();
            pintarPunto(P, -1 * x0, -1 * y0);
            P.popMatrix();



            P.pushMatrix();
            pintarPunto(P, y0, x0);
            P.popMatrix();

            P.pushMatrix();
            pintarPunto(P, -1 * y0, x0);
            P.popMatrix();

            P.pushMatrix();
            pintarPunto(P, y0, -1 * x0);
            P.popMatrix();

            P.pushMatrix();
            pintarPunto(P, -1 * y0, -1 * x0);
            P.popMatrix();

            p0 = p0 + 2 * x0 + 1 - 2 * y0;
        }
    }

}

function bresenhamCircle(P) {
    var x0 = parseInt(xc);
    var y0 = parseInt(yc);

    var r = parseInt(rc);


    centrar(P, x0, y0);

    P.pushMatrix();
    pintarPunto(P, 0, 0);
    P.popMatrix();

    x0 = 0;
    y0 = r;

    P.pushMatrix();
    pintarPunto(P, x0, y0);
    P.popMatrix();


    var p0 = 3 - (2 * r);

    while (x0 < y0) {
        x0++;
        if (p0 < 0) {
            p0 = p0 + (4 * x0) + 6;
        } else {
            y0--;
            p0 = p0 + 4 * (x0 - y0) + 10;
        }
        P.pushMatrix();
        pintarPunto(P, x0, y0);
        P.popMatrix();

        P.pushMatrix();
        pintarPunto(P, -1*x0, y0);
        P.popMatrix();

        P.pushMatrix();
        pintarPunto(P, x0, -1*y0);
        P.popMatrix();

        P.pushMatrix();
        pintarPunto(P, -1*x0, -1*y0);
        P.popMatrix();

        P.pushMatrix();
        pintarPunto(P, y0, x0);
        P.popMatrix();

        P.pushMatrix();
        pintarPunto(P, -1*y0, x0);
        P.popMatrix();

        P.pushMatrix();
        pintarPunto(P, y0, -1*x0);
        P.popMatrix();

        P.pushMatrix();
        pintarPunto(P, -1*y0, -1*x0);
        P.popMatrix();
    }

}


