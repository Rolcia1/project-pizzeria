import {
  select
} from '../settings.js';
import AmountWidget from '../components/AmountWidget.js';

class CartProduct {
  constructor(menuProduct, element) {
    const thisCartProduct = this;
    thisCartProduct.id = menuProduct.id;
    thisCartProduct.name = menuProduct.name;
    thisCartProduct.priceSingle = menuProduct.priceSingle;
    thisCartProduct.price = menuProduct.price * menuProduct.amount;
    thisCartProduct.amount = menuProduct.amount;
    //console.log(thisCartProduct.amount);
    thisCartProduct.inputValue = element.querySelector(select.widgets.amount.input);

    thisCartProduct.getElements(element);
    thisCartProduct.initAmountWidget();
    thisCartProduct.initActions();

  }

  getElements(element) {
    const thisCartProduct = this;
    thisCartProduct.dom = {};
    thisCartProduct.dom.wrapper = element;
    thisCartProduct.dom.amountWidget = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.amountWidget);
    thisCartProduct.dom.price = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.price);
    thisCartProduct.dom.edit = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.edit);
    thisCartProduct.dom.remove = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.remove);
  }

  initAmountWidget() {
    const thisCartProduct = this;

    thisCartProduct.amountWidget = new AmountWidget(thisCartProduct.dom.amountWidget);
    thisCartProduct.dom.amountWidget.addEventListener('updated', function() {
      thisCartProduct.amount = thisCartProduct.amountWidget.value;
      thisCartProduct.price = thisCartProduct.priceSingle * thisCartProduct.amountWidget.value;
      thisCartProduct.dom.price.innerHTML = thisCartProduct.price;
      thisCartProduct.inputValue.innerHTML = thisCartProduct.amount;
    });
  }

  remove() {
    const thisCartProduct = this;

    const event = new CustomEvent('remove', {
      bubbles: true,
      detail: {
        cartProduct: thisCartProduct,
      },
    });
    thisCartProduct.dom.wrapper.dispatchEvent(event);
  }

  initActions() {
    const thisCartProduct = this;

    thisCartProduct.dom.edit.addEventListener('click', function(event) {
      event.preventDefault();
    });
    thisCartProduct.dom.remove.addEventListener('click', function(event) {
      event.preventDefault();
      thisCartProduct.remove();
    });
  }

  getData() {
    const thisCartProduct = this;

    const prod = {};
    prod.id = thisCartProduct.id;
    prod.name = thisCartProduct.name;
    prod.amount = thisCartProduct.amount;
    prod.priceSingle = thisCartProduct.priceSingle;
    prod.price = thisCartProduct.price;
    prod.param = thisCartProduct.param;


    return prod;

  }


}
export default CartProduct;