import { BaseComponent } from "../component.js";
export class InputDialog extends BaseComponent {
    constructor() {
        super(`
      <dialog class="dialog">
          <div class="dialog__container">
            <button class="close">&times;</button>
            <div id="dialog__body"></div>
            <button class="dialog__submit">ADD</button>
          </div>
        </dialog>`);
        const closeButton = this.element.querySelector('.close');
        closeButton.onclick = () => {
            this.closeListener && this.closeListener();
        };
        const submitButton = this.element.querySelector('.dialog__submit');
        submitButton.onclick = () => {
            this.submitListener && this.submitListener();
        };
    }
    setOnCloseListener(listener) {
        this.closeListener = listener;
    }
    setOnSubmitListener(listener) {
        this.submitListener = listener;
    }
    addChild(child) {
        const body = this.element.querySelector('#dialog__body');
        child.attachTo(body);
    }
}
