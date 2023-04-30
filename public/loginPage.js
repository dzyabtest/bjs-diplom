"use strict";

let userForm = new UserForm();

userForm.loginFormCallback = data => {
    ApiConnector.login(data, (res) => {

        if (res.success) {
            location.reload();
        }
        else {
//            alert('Неправильный логин или пароль!');
            userForm.setLoginErrorMessage('Неправильный логин или пароль!');
        }
    });

}

userForm.registerFormCallback = data => {
    ApiConnector.register(data, (res) => {

        if (res.success) {
            location.reload();
        }
        else {
//            alert('Неправильный логин или пароль!');
            userForm.setRegisterErrorMessage('Неправильный логин или пароль!');
        }
    });

}