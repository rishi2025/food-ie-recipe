import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Time out after ${s} seconds`))
        }, s * 1000);
    })
};

export const AJAX = async function (url, uploadData = undefined) {
    try {
        let res;
        if (uploadData) {
            res = await Promise.race([fetch(url, {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(uploadData),
            }),
            timeout(TIMEOUT_SEC)]);
        }

        else 
            res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);

        return data;
    } catch (err) {
        throw err;
    }
}

// export const getJSON = async function (url) {
//     try {
//         const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
//         const data = await res.json();

//         if (!res.ok) throw new Error(`${data.message} (${res.status})`);

//         return data;
//     } catch (err) {
//         throw err;
//     }
// };

// export const sendJSON = async function (url, uploadData) {
//     try {
//         const res = await Promise.race([fetch(url, {
//             method: 'POST',

//             headers: {
//                 'Content-Type': 'application/json'
//             },

//             body: JSON.stringify(uploadData),
//         }),
//             timeout(TIMEOUT_SEC)]);

//         const data = await res.json();
//         if (!res.ok) throw new Error(`${data.message} (${res.status})`);

//         return data;
//     } catch (err) {
//         throw err;
//     }
// };