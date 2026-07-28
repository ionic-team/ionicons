class TestHeader extends HTMLElement {
  connectedCallback() {
    const header = document.createElement('header');
    header.innerHTML = `
      <a href="/" class="back-button">
        <ion-icon name="arrow-back" aria-hidden="true"></ion-icon>
        Back
      </a>
    `;
    this.appendChild(header);
  }
}

customElements.define('test-header', TestHeader);
