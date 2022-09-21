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

const getCookie = (name) => {
    const r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}

const fetchData = async (url, method, data) => {
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
