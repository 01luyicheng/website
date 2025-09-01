document.addEventListener('DOMContentLoaded', function() {

    // --- Parallax Effect ---
    const heroBackground = document.getElementById('particles-js');
    window.addEventListener('scroll', () => {
        const offset = window.pageYOffset;
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${offset * 0.3}px)`;
        }
    });

    // --- Particles.js Initialization ---
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#00aaff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#00aaff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            }
        },
        retina_detect: true
    });

    // --- Terminal Typing Animation ---
    const terminalContent = document.getElementById('terminal-content');
    if(terminalContent) {
        const lines = [
            { text: '$ whoami', type: 'command', delay: 200 },
            { text: '> 陆奕丞 / Lu Yicheng', type: 'output', delay: 300 },
            { text: '$ cat /etc/issue', type: 'command', delay: 200 },
            { text: '> Z-Gen AI Native', type: 'output', delay: 300 },
            { text: '$ ./hobbies', type: 'command', delay: 200 },
            { text: '> [Hacker, Creator, Astronomer, Radio Amateur(BG5DRE)]', type: 'output', delay: 300 },
            { text: '$ echo "Hello, World. Think Different."', type: 'command', delay: 200 },
            { text: '> Hello, World. Think Different.', type: 'output', delay: 500 }
        ];
        let lineIndex = 0;

        function processLine() {
            if (lineIndex < lines.length) {
                const currentLine = lines[lineIndex];
                if (currentLine.type === 'command') {
                    typeCommand(currentLine);
                } else {
                    showOutput(currentLine);
                }
            } else {
                terminalContent.innerHTML += '<span class="cursor"></span>';
            }
        }

        function typeCommand(line) {
            let charIndex = 0;
            const typeChar = () => {
                if (charIndex < line.text.length) {
                    terminalContent.innerHTML += line.text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeChar, 50);
                } else {
                    terminalContent.innerHTML += '<br>';
                    lineIndex++;
                    setTimeout(processLine, line.delay);
                }
            }
            typeChar();
        }

        function showOutput(line) {
            terminalContent.innerHTML += `${line.text}<br>`;
            lineIndex++;
            setTimeout(processLine, line.delay);
        }
        
        setTimeout(processLine, 1000);
    }

    // --- Scroll Reveal Animation on Scroll ---
    const scrollElements = document.querySelectorAll('.scroll-reveal');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    }

    // Initial check in case elements are already in view
    handleScrollAnimation();

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // --- Cursor Follower Animation ---
    const cursorFollower = document.querySelector('.cursor-follower');
    if (cursorFollower) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        let isMoving = false;

        // 鼠标移动事件
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (!isMoving) {
                isMoving = true;
                animateCursor();
            }
        });

        // 鼠标离开页面时隐藏
        document.addEventListener('mouseleave', () => {
            cursorFollower.style.opacity = '0';
        });

        // 鼠标进入页面时显示
        document.addEventListener('mouseenter', () => {
            cursorFollower.style.opacity = '1';
        });

        function animateCursor() {
            // 使用缓动效果让跟随更平滑
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;

            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';

            // 继续动画直到足够接近鼠标位置
            if (Math.abs(mouseX - followerX) > 0.5 || Math.abs(mouseY - followerY) > 0.5) {
                requestAnimationFrame(animateCursor);
            } else {
                isMoving = false;
            }
        }

        // 初始化光标位置到屏幕中心
        followerX = window.innerWidth / 2;
        followerY = window.innerHeight / 2;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
    }

    // --- Modal Popup Functionality ---
    const modal = document.getElementById('welcomeModal');
    const closeModal = document.querySelector('.close-modal');

    // 显示弹窗
    function showModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }

    // 关闭弹窗
    function hideModal() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // 恢复背景滚动
    }

    // 页面加载完成后显示弹窗
    setTimeout(showModal, 1000);

    // 点击关闭按钮关闭弹窗
    if (closeModal) {
        closeModal.addEventListener('click', hideModal);
    }

    // 点击弹窗外部关闭弹窗
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            hideModal();
        }
    });

    // ESC键关闭弹窗
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            hideModal();
        }
    });

});
