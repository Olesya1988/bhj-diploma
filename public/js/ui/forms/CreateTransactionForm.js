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
    const select = this.element.querySelector('.accounts-select');    
    
    Account.list(null, (err, response) => {
      if (response.success) {

        // select.innerHTML = response.data.reduce((sum, item) => sum + `<option value="${item.id}">${item.name}</option>`);

        select.innerHTML = '';
        for (let item of response.data) {
          let option = `<option value="${item.id}">${item.name}</option>`;
          let element = document.createElement('div');
          element.innerHTML = option;
          this.element.querySelector('.accounts-select').appendChild(element.firstChild);
        }
      }
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {    
    Transaction.create(data, (err, response) => {
      if (response.success) {
        this.element.reset();
        const form = new Modal(this.element.closest('.modal'));
        form.close();
        App.update();
      }
    })
  }
}