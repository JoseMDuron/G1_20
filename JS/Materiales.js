var UrlMateriales='http://52.152.236.67:90/G1_20/controller/Materiales.php?op=GetMateriales';
var UrlMaterial='http://52.152.236.67:90/G1_20/controller/Materiales.php?op=GetMaterial';
var UrlPostMateriales='http://52.152.236.67:90/G1_20/controller/materiales.php?op=InsertMaterial';
var UrlPutMateriales='http://52.152.236.67:90/G1_20/controller/materiales.php?op=UpdateMaterial';
var UrlDeleteMateriales='http://52.152.236.67:90/G1_20/controller/materiales.php?op=DeleteMaterial';

$(document).ready(function(){
    CargarMateriales();
});

function CargarMateriales(){
    $.ajax({
        url: UrlMateriales,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores='';

            for(i=0; i<MiItems.length; i++){
                Valores+= '<tr>'+
                '<td>'+ MiItems[i].ID +'</td>'+
                '<td>'+ MiItems[i].DESCRIPCION +'</td>'+
                '<td>'+ MiItems[i].UNIDAD +'</td>'+
                '<td>'+ MiItems[i].COSTO +'</td>'+
                '<td>'+ MiItems[i].PRECIO +'</td>'+
                '<td>'+ MiItems[i].APLICA_ISV +'</td>'+
                '<td>'+ MiItems[i].PORCENTAJE_ISV +'</td>'+
                '<td>'+ MiItems[i].ESTADO +'</td>'+
                '<td>'+ MiItems[i].ID_SOCIO +'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarMaterial('+ MiItems[i].ID + ')">Editar</button>'+
                '<button class="btn btn-danger" onclick="EliminarMaterial('+ MiItems[i].ID + ')">Eliminar</button>' +
            '</tr>';
            $('.Materiales').html(Valores);
            }



        }
    });
}

function CargarMaterial(idmaterial){
    var datosmaterial = { 
        ID: idmaterial
    };

    var datosmaterialjson = JSON.stringify(datosmaterial);

    $.ajax({
        url:UrlMaterial,
        type: 'POST',
        data: datosmaterialjson,
        dataType: 'JSON',
        contenttype: 'application/json',
        success: function (response){
            var MiItems =  response;
            $('#DESCRIPCION').val(MiItems[0].DESCRIPCION);
            $('#UNIDAD').val(MiItems[0].UNIDAD);
            $('#COSTO').val(MiItems[0].COSTO);
            $('#PRECIO').val(MiItems[0].PRECIO);
            $('#APLICA_ISV').val(MiItems[0].APLICA_ISV);
            $('#PORCENTAJE_ISV').val(MiItems[0].PORCENTAJE_ISV);
            $('#ESTADO').val(MiItems[0].ESTADO);
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            var btnactualizar =    '<input type="submit" id="btnalerta" onclick="ActualizarMaterial('+ MiItems[0].ID +' )" value="Actualizar" class="btn btn-secondary"></input>' 
            $('.btnmaterial').html(btnactualizar);
         
        }


    })

}

function AgregarMaterial(){
    var datosmaterial={
        DESCRIPCION:$('#DESCRIPCION').val(),
        UNIDAD:$('#UNIDAD').val(),
        COSTO:$('#COSTO').val(),
        PRECIO:$('#PRECIO').val(),
        APLICA_ISV:$('#APLICA_ISV').val(),
        PORCENTAJE_ISV:$('#PORCENTAJE_ISV').val(),
        ESTADO:$('#ESTADO').val(),
        ID_SOCIO:$('#ID_SOCIO').val()
        

    };
    var datosmaterialjson= JSON.stringify(datosmaterial);
    $.ajax({
        url: UrlPostMateriales,
        type: 'POST',
        data : datosmaterialjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
        },
        error: function(){
            alert('Error al crear Material');
        }

    });
    alert('Material Agregado');
}

function ActualizarMaterial(idmaterial){
    var datosmaterial ={
        ID:idmaterial,
        DESCRIPCION:$('#DESCRIPCION').val(),
        UNIDAD:$('#UNIDAD').val(),
        COSTO:$('#COSTO').val(),
        PRECIO:$('#PRECIO').val(),
        APLICA_ISV:$('#APLICA_ISV').val(),
        PORCENTAJE_ISV:$('#PORCENTAJE_ISV').val(),
        ESTADO:$('#ESTADO').val(),
        ID_SOCIO:$('#ID_SOCIO').val()
        

    };
    var datosmaterialjson= JSON.stringify(datosmaterial);
    $.ajax({
        url: UrlPutMateriales,
        type: 'PUT',
        data : datosmaterialjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
        }
    });
    alert("Material Actualizado");
}

function EliminarMaterial(idmaterial){
    var datosmaterial ={
        ID:idmaterial,
        DESCRIPCION:$('#DESCRIPCION').val(),
        UNIDAD:$('#UNIDAD').val(),
        COSTO:$('#COSTO').val(),
        PRECIO:$('#PRECIO').val(),
        APLICA_ISV:$('#APLICA_ISV').val(),
        PORCENTAJE_ISV:$('#PORCENTAJE_ISV').val(),
        ESTADO:$('#ESTADO').val(),
        ID_SOCIO:$('#ID_SOCIO').val()
        

    };
    var datosmaterialjson= JSON.stringify(datosmaterial);
    $.ajax({
        url: UrlDeleteMateriales,
        type: 'DELETE',
        data : datosmaterialjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
        }
    });
    alert("Material Eliminado");
    CargarMateriales();
}