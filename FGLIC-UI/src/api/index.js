import { create } from "apisauce";
import CryptoJS from "crypto-js";

const clientApi = create({
	//baseURL: process.env.REACT_APP_API_END_POINT + "/api/v1/",
    baseURL: "https://lfagentapigw-rsg.azure-api.net/POSMicroservice/Generic/api/",
});


const _encrypt = (msg, key) => {
	msg = typeof msg == "object" ? JSON.stringify(msg) : msg;
	var salt = CryptoJS.lib.WordArray.random(128 / 8);

	key = CryptoJS.PBKDF2(key, salt, {
		keySize: 256 / 32,
		iterations: 10,
	});

	var iv = CryptoJS.lib.WordArray.random(128 / 8);

	var encrypted = CryptoJS.AES.encrypt(msg, key, {
		iv: iv,
		padding: CryptoJS.pad.Pkcs7,
		mode: CryptoJS.mode.CBC,
	});
	return salt.toString() + iv.toString() + encrypted.toString();
};



const get = clientApi.get;
clientApi.get = async (url, params, axiosConfig) => {
	
	const response = await get(url, null, {
	});
	return response;
};
const post = clientApi.post;
clientApi.post = async (url, params, axiosConfig) => {
	const response = await post(url, params, {
        headers: {
            "Ocp-Apim-Subscription-Key":"dc2821ba8f7a42e291c8e473aedafadb"
        }
		// headers: {
		// 	Authorization: `Bearer ${user.access_token}`,
		// 	AuthInformation: userProfileInfo?.id
		// 		? _encrypt(
		// 			`{CustomerId:"${userProfileInfo?.id}",Action:"${action || "view"
		// 			}", FeatureId:"${currentScreenTabId ||currentScreenId}"}`,
		// 			userProfileInfo.sk
		// 		)
		// 		: "",
		// },
	});
	return response;
};
const put = clientApi.put;
clientApi.put = async (url, params, axiosConfig) => {
	
	const response = await put(url, params, {
		headers: {
			
		},
	});
	return response;
};
const delete1 = clientApi.delete;
clientApi.delete = async (url, params, axiosConfig) => {
	
	const response = await delete1(url, params, {
		
	});
	
	return response;
};


export {
	clientApi,
};