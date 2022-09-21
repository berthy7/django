var class_item = '.item-form';
var id_table = '#data_table';

$(document).ready( function () {
    reload_table();
});

function load_table(data_tb) {
    var tabla = $(id_table).DataTable({
        destroy: true,
        data: data_tb,
        deferRender:    true,
        scrollCollapse: true,
        scroller:       true,
        columns: [
            { title: "ID", data: "id" },
            { title: "Codigo", data: "codigo" },
            { title: "Numero", data: "numero" },
            { title: "Estado", data: "estado",
                render: function(data, type, row) {
                    return '\
                    <div title="' + row.estado + '">\
                        <input id="enabled' + row.id + '" type="checkbox" class="chk-col-indigo enabled" onclick="set_enable(this)" data-id="' + row.id + '" ' + row.check + ' ' + row.disable + '>\
                        <label for="enabled' + row.id + '"></label>\
                    </div>'
                }
            },
            { title: "Acciones", data: "id",
                render: function(data, type, row) {
                     const dataObject = JSON.stringify(row);
                    a = ''
                    if (row.disable === '') {
                        a += `\
                            <button data-object='${dataObject}'  type="button" class="btn bg-teal waves-effect" title="Editar" onclick="edit_item(this)">\
                                <i class="material-icons">edit</i>\
                            </button>`
                    }
                    if (row.delete) {
                        a += '\
                            <button data-json="' + data + '"  type="button" class="btn btn-danger waves-effect" title="Eliminar" onclick="delete_item(this)">\
                                <i class="material-icons">clear</i>\
                            </button>'
                    }
                    if (a === '') a = 'Sin permisos';
                    return a
                }
            },
            { title: "Estado", visible: false, data: "estado",
                render: function(data, type, row) {
                    return data? 'Activo': 'Inactivo'
                }
            }
        ],
        dom: "Bfrtip",
        buttons: [],
        "order": [ [0, 'desc'] ],
        columnDefs: [ { width: '10%', targets: [0] }, { width: '27.5%', targets: [1, 2] }, { width: '20%', targets: [3] }, { width: '15%', targets: [4] } ],
        "initComplete": function() {}
    });
    tabla.draw()
}

function clean_data() {
    $(class_item).val('')
    $(class_item).selectpicker('render')
}

function reload_table() {
    $.ajax({
        method: "GET",
        url: '/domicilio/list',
        dataType: 'json',
        async: false,
        success: function (response) {
            load_table(response)
        },
        error: function (jqXHR, status, err) {
        }
    });
}

$('#new').click(function() {
    clean_data()
    $('.item-form').parent().removeClass('focused')

    $('#update').hide()
    $('#insert').show()
});

$('#insert').on('click', function() {
    notvalid = false;

    if (!notvalid) {
        objeto = JSON.stringify({
            'contrato': $('#contrato').val(),
            'fechai': $('#fechai').val(),
            'fechaf': $('#fechaf').val(),
            'codigo': $('#codigo').val(),
            'nombre': $('#nombre').val(),
            'cant_casas':  $('#cant_casas').val(),
            'cant_departamentos': $('#cant_departamentos').val(),
            'cant_residentes': $('#cant_residentes').val(),
            'cant_vehiculos': $('#cant_vehiculos').val(),
            'cant_tarjetas': $('#cant_tarjetas').val(),
            'ip_publica': $('#ip_publica').val(),
            'ip_privada': $('#ip_privada').val(),
            'puerto': $('#puerto').val(),
            'singuardia':document.getElementById('singuardia').checked,
            'invitacionpaselibre':document.getElementById('invitacionpaselibre').checked,
            'invitacionmultiple':document.getElementById('invitacionmultiple').checked
        })

        ajax_call('condominio_insert', {
            object: objeto,
            _xsrf: getCookie("_xsrf")
        }, null, function (response) {
            self = JSON.parse(response);

            if (self.success) {
                show_msg_lg('success', self.message, 'center')
                setTimeout(function () {
                    $('#modal').modal('hide')
                    reload_table()
                }, 2000);
            }
            else Swal.fire('Error. Comuniquese con soporte tecnico', self.message, 'error')
        })
    }
    else show_toast('warning', 'Por favor, ingresa todos los campos requeridos (*).');
});

function edit_item(e) {
    const self = JSON.parse(e.dataset.object);

    clean_data()

    console.log(self)

    $('#id').val(self.id)
    $('#contrato').val(self.contrato)
    $('#fechai').val(self.fechai)
    $('#fechaf').val(self.fechaf)
    $('#codigo').val(self.codigo)
    $('#nombre').val(self.nombre)
    $('#cant_casas').val(self.cant_casas)
    $('#cant_departamentos').val(self.cant_departamentos)
    $('#cant_residentes').val(self.cant_residentes)
    $('#cant_vehiculos').val(self.cant_vehiculos)
    $('#cant_tarjetas').val(self.cant_tarjetas)
    $('#ip_publica').val(self.ip_publica)
    $('#ip_privada').val(self.ip_privada)
    $('#puerto').val(self.puerto)
    document.getElementById('singuardia').checked=self.singuardia
    document.getElementById('invitacionpaselibre').checked=self.invitacionpaselibre
    document.getElementById('invitacionmultiple').checked=self.invitacionmultiple


    clean_form()
    verif_inputs('')
    $('.item-form').parent().addClass('focused')
    $('#insert').hide()
    $('#update').show()
    $('#modal').modal('show')

}

$('#update').click(function() {
    notvalid = validationInputSelectsWithReturn("modal");


    if (!notvalid) {
        objeto = JSON.stringify({
            'id': $('#id').val(),
            'contrato': $('#contrato').val(),
            'fechai': $('#fechai').val(),
            'fechaf': $('#fechaf').val(),
            'codigo': $('#codigo').val(),
            'nombre': $('#nombre').val(),
            'cant_casas': $('#cant_casas').val(),
            'cant_departamentos': $('#cant_departamentos').val(),
            'cant_residentes': $('#cant_residentes').val(),
            'cant_vehiculos': $('#cant_vehiculos').val(),
            'cant_tarjetas': $('#cant_tarjetas').val(),
            'ip_publica': $('#ip_publica').val(),
            'ip_privada': $('#ip_privada').val(),
            'puerto': $('#puerto').val(),
            'singuardia':document.getElementById('singuardia').checked,
            'invitacionpaselibre':document.getElementById('invitacionpaselibre').checked,
            'invitacionmultiple':document.getElementById('invitacionmultiple').checked
        })

        ajax_call('condominio_update', {
            _xsrf: getCookie("_xsrf"),
            object: objeto
        }, null, function(response) {

            self = JSON.parse(response);
            console.log(self)
            if (self.success) {
                show_msg_lg('success', self.message, 'center')
                setTimeout(function () {
                    $('#modal').modal('hide')
                    reload_table()
                }, 2000);
            }
            else Swal.fire('Error. Comuniquese con soporte tecnico', self.message, 'error')
        })
    }
    else show_toast('warning', 'Por favor, ingresa todos los campos requeridos (*).');
})

function set_enable(e) {
    cb_delete = e
    b = $(e).prop('checked')

    if (!b) {
        cb_title = "¿Está seguro de que desea dar de baja la condominio?"
        cb_text = ""
        cb_type = "warning"
    } else {
        cb_title ="¿Está seguro de que desea dar de alta la condominio?"
        cb_text = ""
        cb_type = "info"
    }

    Swal.fire({
        icon: cb_type,
        title: cb_title,
        text: cb_text,
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: '#009688',
        cancelButtonColor: '#ef5350',
        confirmButtonText: 'Aceptar',
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.value) {
            $(cb_delete).prop('checked', !$(cb_delete).is(':checked'))

            if (b) $(cb_delete).parent().prop('title', 'Activo');
            else $(cb_delete).parent().prop('title', 'Inhabilitado');

            objeto =JSON.stringify({
                id: parseInt($(cb_delete).attr('data-id')),
                estado: b
            })

            ajax_call('condominio_state', {
                object: objeto, _xsrf: getCookie("_xsrf")}, null,
                function (response) {
                    self = JSON.parse(response)
                    icono = self.success? 'success': 'warning'
                    show_msg_lg(icono, self.message, 'center')
                    setTimeout(function() {
                        reload_table()
                    }, 2000);
                }
            )
        }
        else if (result.dismiss === 'cancel') $(cb_delete).prop('checked', !$(cb_delete).is(':checked'));
        else if (result.dismiss === 'esc') $(cb_delete).prop('checked', !$(cb_delete).is(':checked'));
    })
}

function delete_item(e) {
    Swal.fire({
        icon: "warning",
        title: "¿Está seguro de que desea eliminar permanentemente la condominio?",
        text: "",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: '#009688',
        cancelButtonColor: '#ef5350',
        confirmButtonText: 'Aceptar',
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.value) {
            objeto = JSON.stringify({
                'id': parseInt(JSON.parse($(e).attr('data-json')))
            })

            ajax_call('condominio_delete', {
                object: objeto,_xsrf: getCookie("_xsrf")}, null,
                function (response) {
                    self = JSON.parse(response);

                    if (self.success) {
                        show_msg_lg('success', self.message, 'center')
                        setTimeout(function () {
                            reload_table()
                        }, 2000);
                    }
                    else show_toast('warning', self.message);
                }
            );
        }
    })
}
