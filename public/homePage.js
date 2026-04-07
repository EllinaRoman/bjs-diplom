const logout = new LogoutButton();
logout.action = () => {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        }
    })
};

ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});


const rates = new RatesBoard();
const getRates = () => {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            rates.clearTable();
            rates.fillTable(response.data);
        }
    })
}
getRates();
setInterval(getRates, 60000);


const money = new MoneyManager;
money.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(true, "Баланс пополнен");
        } else {
            money.setMessage(false, response.error);
        }
    });
}

money.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(true, "Конвертация выполнена");
        } else {
            money.setMessage(false, response.error);
        }
    });
}

money.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(true, "Перевод выполнен");
        } else {
            money.setMessage(false, response.error);
        }
    });
}


const favorites = new FavoritesWidget();
ApiConnector.getFavorites((response) => {
    if (response.success) {
        favorites.clearTable();
        favorites.fillTable(response.data);
        money.updateUsersList(response.data)
    }
}
)

favorites.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            favorites.setMessage(true, 'Пользователь добавлен');
            favorites.clearTable();
            favorites.fillTable(response.data);
            money.updateUsersList(response.data)
        } else {
            favorites.setMessage(false, response.error);
        }
    })
}

favorites.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            favorites.setMessage(true, 'Пользователь удален');
            favorites.clearTable();
            favorites.fillTable(response.data);
            money.updateUsersList(response.data)
        } else {
            favorites.setMessage(false, response.error);
        }
    })
}


