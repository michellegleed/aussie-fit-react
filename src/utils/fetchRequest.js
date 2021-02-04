const createRequestObject = (method, body) => {
    let ro = {};
    const token = window.localStorage.getItem("token");
    if (token) {
        ro = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${token}`
            }
        }
    } else {
        ro = {
            headers: {
                "Content-Type": "application/json",
            }
        }
    }
    if (method !== "get") {
        // console.log("fetch method is ", method);
        ro.method = method;
    }
    if (body != null) {
        ro.body = JSON.stringify(body)
    }
    return ro;
}

export const fetchRequest = async (url, method = "get", body = null) => {
    const requestObject = createRequestObject(method, body);
    const response = await fetch(url, requestObject);
    const data = await response.json();
    return {
        ok: response.ok,
        status: response.status,
        data: data
    }
}