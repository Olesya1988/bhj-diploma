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
    const accountsSelect = this.element.querySelector('.accounts-select');
    
    Account.list(null, (err, response) => {
      if (response.success) {
        accountsSelect.innerHTML = '';
        response.data.forEach( item => {
          const option = document.createElement('option')
          option.value = item.id;
          option.textContent = item.name;
          accountsSelect.insertAdjacentElement('beforeend', option);
        })
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