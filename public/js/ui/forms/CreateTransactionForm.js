/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let user = User.current();
    let select = this.element.querySelector('select');

    if (user) {
      Account.list(user.id, function (err, response) {
        if (response && response.success) {
          select.options.length = 0;

          for (let i = 0; i < response.data.length; i++) {
            const element = response.data[i];
            let newOption = new Option(element.name, element.id);
            select.options[select.options.length] = newOption;
          }
        }        
      })
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    let callback = () => {   
      if (response.success) {
        this.element.reset();
        if (this.element.id === "new-expense-form") {
          App.getModal('newExpense').close();
        }
        if (this.element.id === "new-income-form") {
          App.getModal('newIncome').close();
        }
        App.update();
      }
    }
    Transaction.create(data, callback);
  }
}