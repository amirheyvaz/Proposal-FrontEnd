import axios from 'axios';
import crypto from 'crypto-js';
import * as actionTypes from './ActionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (UserInfo) => {
    return dispatch => {
        dispatch(authStart());
        // var key = CryptoJS.enc.Utf8.parse('8080808080808080');  
        // var iv = CryptoJS.enc.Utf8.parse('8080808080808080');  
        
        // var encryptedlogin = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(UserInfo.Password), key,  
        //     {
        //     keySize: 128 / 8,   
        //     iv: iv,  
        //     mode: CryptoJS.mode.CBC,  
        //     padding: CryptoJS.pad.Pkcs7 
        // });  

        // const encryptionType = 'aes-256-cbc';
        // const encryptionEncoding = 'base64';
        // const bufferEncryption = 'utf-8';

        // const Ckey = 'ABCDEFGHJKLMNOPQRSTUVWXYZABCDEF';
        // const Civ = 'ABCDEFGHIJKLMNOP';

        // const val =  UserInfo.Password;
        // const key = Buffer.from(Ckey, bufferEncryption);
        // const iv = Buffer.from(Civ, bufferEncryption);
        // const cipher = crypto.createCipheriv(encryptionType, key, iv);
        // let encrypted = cipher.update(val, bufferEncryption, encryptionEncoding);
        // encrypted += cipher.final(encryptionEncoding);

        let url = 'http://localhost:7357/api/Authentication/GetToken/' + UserInfo.Username + '/' + UserInfo.Password;
        
        axios.post(url)
            .then(response => {
                const expirationTime = 90;
                const expirationDate = new Date(new Date().getTime() + expirationTime * 60 * 1000);
                localStorage.setItem('token', response.data);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', UserInfo.Username);
                dispatch(authSuccess(response.data, UserInfo.Username));
                dispatch(checkAuthTimeout(expirationTime * 60));
            })
            .catch(err => {
                let error = "خطا در برقراری ارتباط با سرور"
                if(err.response && err.response.status == 401){
                    error = "نام کاربری یا رمز عبور وارد شده اشتباه است";
                }
                dispatch(authFail(error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};