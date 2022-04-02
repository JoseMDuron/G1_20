var UrlPedido_Proveedor = 'http://52.152.236.67:90/G1_20/controller/pedidos_proveedor.php?op=GetPedidos_Proveedor';
var UrlPostPedido_Proveedor = 'http://52.152.236.67:90/G1_20/controller/pedidos_proveedor.php?op=InsertPedido_Proveedor';
var UrlGetPedido_Proveedor = 'http://52.152.236.67:90/G1_20/controller/pedidos_proveedor.php?op=GetPedido_Proveedor';
var UrlUpdatePedido_Proveedor = 'http://52.152.236.67:90/G1_20/controller/pedidos_proveedor.php?op=UpdatePedido_Proveedor';
var UrlDeletePedido_Proveedor = 'http://52.152.236.67:90/G1_20/controller/pedidos_proveedor.php?op=DeletePedido_Proveedor';

$(document).ready(function(){
    CargarPedidos_Proveedor();
});

function CargarPedidos_Proveedor(){
    $.ajax({
        url: UrlPedido_Proveedor,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';

            for(i=0; i < MiItems.length; i++){
                Valores +=  '<tr>' +
                '<td>'+ MiItems[i].ID +'</td>'+
                '<td>'+ MiItems[i].ID_SOCIO +'</td>'+
                '<td>'+ MiItems[i].FECHA_PEDIDO +'</td>'+
                '<td>'+ MiItems[i].DETALLE +'</td>'+
                '<td>'+ MiItems[i].SUB_TOTAL +'</td>'+
                '<td>'+ MiItems[i].TOTAL_ISV +'</td>'+
                '<td>'+ MiItems[i].TOTAL +'</td>'+
                '<td>'+ MiItems[i].FECHA_ENTREGA +'</td>'+
                '<td>'+ MiItems[i].ESTADO +'</td>'+
                '<td>' +
                '<button class="btn btn-info" onclick="CargarPedido_Proveedor(' + MiItems[i].ID + ')">Editar</button>' + 
                '<button class="btn btn-outline-danger" onclick="EliminarPedido_Proveedor(' + MiItems[i].ID + ')">Eliminar</button>' + 
                '<td>' +
                '</tr>';
            $('.Pedido_Proveedor').html(Valores);
            }
        }
    });
}

function AgregarPedido_Proveedor(){

    var datospedido_proveedor = {
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_PEDIDO:$('#FECHA_PEDIDO').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_ENTREGA:$('#FECHA_ENTREGA').val(),
        ESTADO:$('#ESTADO').val()
    };

    var datospedido_proveedorjson = JSON.stringify(datospedido_proveedor);

    $.ajax({
        url: UrlPostPedido_Proveedor,
        type: 'POST',
        data: datospedido_proveedorjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
        },
        error: function(){
            alert('Error al insertar el pedido');
        }
    });
    alert('Pedido Insertado');
}

function CargarPedido_Proveedor(idpedido_proveedor){
    var datospedido_proveedor = { 
        ID: idpedido_proveedor
    };

    var datospedido_proveedorjson = JSON.stringify(datospedido_proveedor);

    $.ajax({
        url:UrlGetPedido_Proveedor,
        type: 'POST',
        data: datospedido_proveedorjson,
        dataType: 'JSON',
        contenttype: 'application/json',
        success: function (response){
            var MiItems =  response;
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            $('#FECHA_PEDIDO').val(MiItems[0].FECHA_PEDIDO);
            $('#DETALLE').val(MiItems[0].DETALLE);
            $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL);
            $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
            $('#TOTAL').val(MiItems[0].TOTAL);
            $('#FECHA_ENTREGA').val(MiItems[0].FECHA_ENTREGA);
            $('#ESTADO').val(MiItems[0].ESTADO);
            var btnactualizar = '<input type="submit" id="btnalerta" onclick="ActualizarPedido_Proveedor('+ MiItems[0].ID +' )" value="Actualizar" class="btn btn-secondary"></input>'
            $('.btnpedido_proveedor').html(btnactualizar);
        }

    });

}

function ActualizarPedido_Proveedor(idpedido_proveedor){
    var datospedido_proveedor = {
        ID:idpedido_proveedor,

        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_PEDIDO:$('#FECHA_PEDIDO').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_ENTREGA:$('#FECHA_ENTREGA').val(),
        ESTADO:$('#ESTADO').val()
    };

    var datospedido_proveedorjson = JSON.stringify(datospedido_proveedor);

    $.ajax({
         url: UrlUpdatePedido_Proveedor,
         type: 'PUT',
         data: datospedido_proveedorjson,
         datatype: 'JSON',
         contentType:'application/json',
        success: function(response) {
            console.log(response);
        }
    });
    alert("Pedido Actualizado");
}

function EliminarPedido_Proveedor(idpedido_proveedor){
    var datospedido_proveedor = {
        ID:idpedido_proveedor
    };

    var datospedido_proveedorjson = JSON.stringify(datospedido_proveedor);

    $.ajax({
        url: UrlDeletePedido_Proveedor,
        type: 'DELETE',
        data: datospedido_proveedorjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response){
            console.log(response);
        }
    });
    alert("Pedido Eliminado");
}