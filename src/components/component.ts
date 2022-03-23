export interface Component {
  attachTo(parent: HTMLElement, position?: InsertPosition): void;
  removeFrom(parent: HTMLElement): void;
  attach(component: Component, position?: InsertPosition): void;
  registerEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any
  ): void;
}

export class BaseComponent<T extends HTMLElement> implements Component {
  protected readonly element: T;

  constructor(htmlString: string) {
    const template = document.createElement('template');
    // 사용자에게 전달받은 내용을 innerHTML에 바로 넣는 것은 위험하다
    template.innerHTML = htmlString;
    this.element = template.content.firstElementChild! as T;
  }
  
  attach(component: Component, position?: InsertPosition): void {
    component.attachTo(this.element, position);
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin'){
    parent.insertAdjacentElement(position, this.element);
  }

  removeFrom(parent: HTMLElement) {
    if(parent !== this.element.parentElement) throw new Error('Parent mismatch!');
    parent.removeChild(this.element);
  }

  registerEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any
  ): void {
    this.element.addEventListener(type, listener);
  }
}