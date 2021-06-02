
const template = document.createElement('template');
template.innerHTML = `
<style>
  h3 {
    color: coral;  
  }
  </style>
  <div class="user-card">
  <p><slot name="teste" /></p>
  <h3> </h3>
  <button id="toggle-info"> Button Test </button>
  </div>
`;
// Creating a class that extends from HTMLElement class
class UserCard extends HTMLElement {
    constructor() {
        super();

        this.showH3 = true; 

        // Using shadow dom do render the element
        // using it because otherwise the style would be global 
        this.attachShadow({ mode: 'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        // passing some atributes to template  to element be rendered on dom
        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
    }

    //function called when event occours
    toggleTest() {
        console.log(this.getAttribute('name'));
        this.showH3 = !this.showH3;
        const element = this.shadowRoot.querySelector('h3')
        if(this.showH3 ) {
          element.style.display = 'block';
        } 
        else {
            element.style.display = 'none';
        }
    }
    // adding event listener to the web component
    connectedCallback() {
        this.shadowRoot.querySelector('#toggle-info')
        .addEventListener('click', () => this.toggleTest());
    }
     // removes event listener from the web component
    disconnectedCallback() {
        this.shadowRoot.querySelector('#toggle-info')
        .removeEventListener();
    }
}

//Defining how the custom tag will be named 
window.customElements.define('user-card', UserCard);