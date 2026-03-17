class TypeWriterComponent extends HTMLElement {
    constructor() {
        super();
        this.typingTimeout = null;
    }

    connectedCallback() {
        const tagType = this.getAttribute('con') || 'p';
        const userStyle = this.getAttribute('style') || "";
        const userClass = this.getAttribute('class') || ""; 
        const userId = this.getAttribute('id') || "";   
        const customSpeed = parseInt(this.getAttribute('speed')) || 100;
        const startDelay = parseInt(this.getAttribute('delay')) || 0;
        const isLoop = this.hasAttribute('loop');
        
        const fullContent = this.innerHTML.trim();
        this.innerHTML = ''; 

        // 1. Accessibility: Provides full text for Screen Readers
        const srOnly = document.createElement('span');
        srOnly.innerHTML = fullContent;
        Object.assign(srOnly.style, {
            position: 'absolute', width: '1px', height: '1px', 
            margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)'
        });
        this.appendChild(srOnly);

        // 2. Visual Animation Element (Hidden from Screen Readers)
        const element = document.createElement(tagType);
        element.setAttribute('aria-hidden', 'true');
        if (userClass) element.className = userClass;
        if (userId) element.id = userId;
        element.setAttribute('style', userStyle); 
        
        element.style.display = 'inline-block';
        element.style.borderRight = '2px solid';
        this.appendChild(element);

        let i = 0;
        const type = () => {
            if (i < fullContent.length) {
                if (fullContent.substring(i, i + 4).toLowerCase() === '<br>') {
                    element.innerHTML += '<br>';
                    i += 4;
                } else {
                    element.innerHTML += fullContent.charAt(i);
                    i++;
                }
                this.typingTimeout = setTimeout(type, customSpeed);
            } else if (isLoop) {
                this.typingTimeout = setTimeout(() => {
                    element.innerHTML = '';
                    i = 0;
                    type();
                }, 2000); 
            } else {
                element.style.borderRight = 'none';
            }
        };

        this.typingTimeout = setTimeout(type, startDelay);
    }
}
customElements.define('type-writer', TypeWriterComponent);