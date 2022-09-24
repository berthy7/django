const ajaxCall = (url, data, render, callback) => {
    $.ajax({
        method: "POST",
        url: url,
        data: data,
        success: function (response) {
            if (render) $(render).html(response);
            if (callback) callback(response);
        },
        error: function (jqXHR, status, err) {
            showMessage(jqXHR.responseText, 'danger', 'remove');
        }
    });
}

const ajaxCallGet = (url, data, callback) => {
    $.ajax({
        method: "PUT",
        url: url,
        data: data,
        success: function (response) {
            if (callback) {
                // dictionary = JSON.parse(response)
                dictionary = response
                callback(dictionary)
            }
        },
        error: function (jqXHR, status, err) {
            showMessage('Error', jqXHR.responseText, 'danger', 'remove');
        }
    });
}

const ajaxCallLogin = (url, data, callback) => {
    $.ajax({
        method: "POST",
        url: url,
        data: data,
        success: function (response) {
            dictionary = JSON.parse(response);

            if (callback) callback(dictionary);
        },
        error: function (jqXHR, status, err) {
            showMessage(jqXHR.responseText, 'danger', 'remove');
        }
    });
}

// const getCookie = (name) => {
//     const r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
//     return r ? r[1] : undefined;
// }

const fetchData = async (url, method, data) => {
    console.log(url)
  try {
    const resquest = await fetch(url, {
      method: method,
      body: data,
    });

    return await resquest.json();
  } catch (error) {
    showSmallMessage("error", error);
  }
};



function ajax_call(url, data, render, callback) {
    $.ajax({
        method: "POST",
        url: url,
        data: data,
        success: function (response) {
            if (render != null) $(render).html(response);
            if (callback != null) callback(response);
        },
        error: function (jqXHR, status, err) {
            show_message(jqXHR.responseText, 'danger', 'remove');
        }
    });
}

function ajax_call_get(url, data, callback) {
    $.ajax({
        method: "PUT",
        url: url,
        data: data,
        success: function (response) {
            if (callback != null) {
                /*    dictionary = JSON.parse(response)*/
                dictionary = response
                callback(dictionary)
            }
        },
        error: function (jqXHR, status, err) {
            show_message('Error', jqXHR.responseText, 'danger', 'remove')
        }
    });
}

function ajax_call_login(url, data, callback) {
    $.ajax({
        method: "POST",
        url: url,
        data: data,
        success: function (response) {
            dictionary = JSON.parse(response)

            if (callback != null) callback(dictionary)
        },
        error: function (jqXHR, status, err) {
            show_message(jqXHR.responseText, 'danger', 'remove')
        }
    });
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
