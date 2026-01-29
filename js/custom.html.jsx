class TypeWriterComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const tagType = this.getAttribute('con') || 'p';
        const userStyle = this.getAttribute('style') || "";
        
        // ১. স্পিড অ্যাট্রিবিউট নেওয়া (যদি না থাকে তবে ডিফল্ট ১০০ হবে)
        const customSpeed = parseInt(this.getAttribute('speed')) || 100;
        
        const fullContent = this.innerHTML.trim();
        this.innerHTML = ''; 

        const element = document.createElement(tagType);
        element.setAttribute('style', userStyle); 
        
        if (!element.style.color) {
            element.style.color = 'black';
        }
        
        element.style.display = 'inline-block';
        element.style.borderRight = '2px solid';
        
        this.appendChild(element);

        let i = 0;
        const type = () => {
            if (i < fullContent.length) {
                // <br> ট্যাগ হ্যান্ডেল করা
                if (fullContent.substring(i, i + 4).toLowerCase() === '<br>') {
                    element.innerHTML += '<br>';
                    i += 4;
                } else {
                    element.innerHTML += fullContent.charAt(i);
                    i++;
                }
                // ২. কাস্টম স্পিড ব্যবহার করা
                setTimeout(type, customSpeed);
            } else {
                element.style.borderRight = 'none';
            }
        };

        type();
    }
}

customElements.define('type-writer', TypeWriterComponent);

class CopyCodeSimple extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const codeText = this.innerHTML.trim();
        const bgColor = this.getAttribute('bg') || '#1e293b'; // ডিফল্ট ডার্ক ব্যাকগ্রাউন্ড
        const textColor = this.getAttribute('color') || '#f8fafc'; // ডিফল্ট সাদা টেক্সট

        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block; /* এটি অটোমেটিক নতুন লাইন তৈরি করবে */
                margin: 15px 0;
            }
            .code-box {
                background: ${bgColor};
                color: ${textColor};
                padding: 12px 18px;
                border-radius: 10px;
                font-family: 'Courier New', Courier, monospace;
                font-size: 14px;
                border-left: 5px solid #4F46E5; /* পাশে একটা সুন্দর বর্ডার */
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                white-space: pre-wrap; /* কোডের স্পেস ঠিক রাখবে */
                word-break: break-all;
            }
        </style>
        <div class="code-box">${codeText}</div>
        `;
    }
}

customElements.define('cpc', CopyCodeSimple);