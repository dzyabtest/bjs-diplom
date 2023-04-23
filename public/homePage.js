"use strict";

let btnLogout = new LogoutButton();

btnLogout.action = () => {
    ApiConnector.logout((res) => {
        if (res.success) {
            location.reload();
        }
    });
}

ApiConnector.current((res) => {
    if (res.success) {
        let data = res.data;
        ProfileWidget.showProfile(data);
    }

});

let rates = new RatesBoard();

function getRates() {
    ApiConnector.getStocks((res) => {
    if (res.success) {
        let data = res.data;
        rates.clearTable();
        rates.fillTable(data);
    }

    });
}

const rateInterval = setInterval(getRates(), 60000);

let money = new MoneyManager();
let favor = new FavoritesWidget();

ApiConnector.getFavorites((res) => {
    if (res.success) {
        let data = res.data;
        favor.clearTable();
        favor.fillTable(data);
        money.updateUsersList(data);
    }
});

money.addMoneyCallback = (data) => {
    if (data.amount) {
        ApiConnector.addMoney(data, (res) => {
            if (res.success) {
                let data = res.data;
                ProfileWidget.showProfile(data);
                favor.setMessage(true, 'Деньги зачислены.');
            }
            else {
                favor.setMessage(false, res.error);
            }
        });  
    }
}

money.conversionMoneyCallback = (data) => {
    if (data.fromAmount) {
        ApiConnector.convertMoney(data, (res) => {
            if (res.success) {
                let data = res.data;
                ProfileWidget.showProfile(data);
                favor.setMessage(true, 'Конвертация выполнена.');
            }
            else {
                favor.setMessage(false, res.error);
            }
        });  
    }
}

money.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (res) => {
        if (res.success) {
            let data = res.data;
            ProfileWidget.showProfile(data);
            favor.setMessage(true, 'Перевод выполнен.');
        }
        else {
            favor.setMessage(false, res.error);
        }
    });  

}

favor.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (res) => {
        if (res.success) {
            let data = res.data;
            favor.clearTable();
            favor.fillTable(data);
            money.updateUsersList(data);
            favor.setMessage(true, 'Пользователь добавлен.');
        }
        else {
            favor.setMessage(false, res.error);
        }
    });  

}

favor.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (res) => {
        if (res.success) {
            let data = res.data;
            favor.clearTable();
            favor.fillTable(data);
            money.updateUsersList(data);
            favor.setMessage(true, 'Пользователь удален.');
        }
        else {
            favor.setMessage(false, res.error);
        }
    });  

}

