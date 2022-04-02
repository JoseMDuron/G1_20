var urlSocios = 'http://52.152.236.67:90/G1_20/controller/socio_negocio.php?op=GetSocios';
var urlPostSocio = 'http://52.152.236.67:90/G1_20/controller/socio_negocio.php?op=InsertSocio';
var urlSocio = 'http://52.152.236.67:90/G1_20/controller/socio_negocio.php?op=GetSocio';
var urlPutSocio = 'http://52.152.236.67:90/G1_20/controller/socio_negocio.php?op=UpdateSocio';
var urlPutSocios = 'http://52.152.236.67:90/G1_20/controller/socio_negocio.php?op=DeleteSocio';

$(document).ready(function(){
CargarSocios();
});

function CargarSocios(){
    $.ajax({
        url:urlSocios,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var valores='';

            for(i=0; i < MiItems.length; i++){
                valores +='<tr>'+
                '<td>'+ MiItems[i].ID +'</td>'+
                '<td>'+ MiItems[i].NOMBRE +'</td>'+
                '<td>'+ MiItems[i].RAZON_SOCIAL +'</td>'+
                '<td>'+ MiItems[i].DIRECCION +'</td>'+
                '<td>'+ MiItems[i].TIPO_SOCIO +'</td>'+
                '<td>'+ MiItems[i].CONTACTO +'</td>'+
                '<td>'+ MiItems[i].EMAIL +'</td>'+
                '<td>'+ MiItems[i].FECHA_CREADO +'</td>'+
                '<td>'+ MiItems[i].ESTADO +'</td>'+
                '<td>'+ MiItems[i].TELEFONO +'</td>'+
                '<td>'+
                '<button class="btn btn-outline-info" onclick="CargarSocio(' + MiItems[i].ID + ')">Editar</button>' +
                '<button class="btn btn-outline-danger" onclick="EliminarSocio(' + MiItems[i].ID + ')">Eliminar</button>' +
                '</td>'+
                '</tr>';
            $('.Sociosnegocio').html(valores);
            }         
        }
    });
}

function AgregarSocio(){
    var datossocio={
            NOMBRE:$('#NOMBRE').val(),
            RAZON_SOCIAL:$('#RAZON_SOCIAL').val(),
            DIRECCION:$('#DIRECCION').val(),
            TIPO_SOCIO:$('#TIPO_SOCIO').val(),
            CONTACTO:$('#CONTACTO').val(),
            EMAIL:$('#EMAIL').val(),
            FECHA_CREADO:$('#FECHA_CREADO').val(),
            ESTADO:$('#ESTADO').val(),
            TELEFONO:$('#TELEFONO').val()
    };
    var datossociojson = JSON.stringify(datossocio);
    $.ajax({
        url:urlPostSocio,
        type: 'POST',
        data: datossociojson,
        datatype: 'JSON',
        contenttype:'aplication /json',
        success: function(reponse){
            console.log(reponse);
        },
        error: function(){
            alert('Error al crear socio');
        }
    });
    alert('Socio Agregado');
}

function CargarSocio(idSocio){
    var datossocio = { 
        ID: idSocio
    };

    var datossociojson = JSON.stringify(datossocio);

    $.ajax({
        url:urlSocio,
        type: 'POST',
        data: datossociojson,
        dataType: 'JSON',
        contenttype: 'application/json',
        success: function (response){
            var MiItems =  response;
            $('#NOMBRE').val(MiItems[0].NOMBRE);
            $('#RAZON_SOCIAL').val(MiItems[0].RAZON_SOCIAL);
            $('#DIRECCION').val(MiItems[0].DIRECCION);
            $('#TIPO_SOCIO').val(MiItems[0].TIPO_SOCIO);
            $('#CONTACTO').val(MiItems[0].CONTACTO);
            $('#EMAIL').val(MiItems[0].EMAIL);
            $('#FECHA_CREADO').val(MiItems[0].FECHA_CREADO);
            $('#ESTADO').val(MiItems[0].ESTADO);
            $('#TELEFONO').val(MiItems[0].TELEFONO);
            var btnactualizar = '<input type="submit" id="btnalerta" onclick="ActualizarSocio('+ MiItems[0].ID +')" value="Actualizar" class="btn btn-secondary"></input>'
            $('.btnsocio').html(btnactualizar);
        }
    })

}

function ActualizarSocio(idSocio){
    var datossocio = {
        ID:idSocio,
        NOMBRE:$('#NOMBRE').val(),
        RAZON_SOCIAL:$('#RAZON_SOCIAL').val(),
        DIRECCION:$('#DIRECCION').val(),
        TIPO_SOCIO:$('#TIPO_SOCIO').val(),
        CONTACTO:$('#CONTACTO').val(),
        EMAIL:$('#EMAIL').val(),
        FECHA_CREADO:$('#FECHA_CREADO').val(),
        ESTADO:$('#ESTADO').val(),
        TELEFONO:$('#TELEFONO').val()
    };
    var datossociojson = JSON.stringify(datossocio);

    $.ajax({
         url: urlPutSocio,
         type: 'PUT',
         data: datossociojson,
         datatype: 'JSON',
         contentType:'application/json',
        success: function(response) {
            console.log(response);
        }
    });
    alert("Socio Actualizado");
}

function EliminarSocio(idSocio) {
    var datossocio = {
        ID:idSocio
    };
    var datossociojson = JSON.stringify(datossocio);

    $.ajax({
        url: urlPutSocios,
        type: 'DELETE',
        data: datossociojson,
        datatype: 'JSON',
        contentType:'application/json',
        success: function(response) {
            console.log(response);
        }
    });
    alert("Socio Eliminado");
}
