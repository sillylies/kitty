(function() {
    if (document.body.classList.contains('members-page')) {
        const sparkleChars = ['K', 'I', 'T', 'T', 'Y', 'H', 'A', 'C', 'K', 'E', 'R', 'S'];
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        let mouseX = 0;
        let mouseY = 0;
        let charIndex = 0;
        let lastTime = 0;
        const delay = 150; 

        function createSparkle() {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
        
            
            const maxX = window.innerWidth - 20; 
            const maxY = window.innerHeight - 20; 
        
            sparkle.style.left = Math.min(Math.max(mouseX, 0), maxX) + 'px'; 
            sparkle.style.top = Math.min(Math.max(mouseY, 0), maxY) + 'px'; 
        
            sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];
            sparkle.textContent = sparkleChars[charIndex];
        
            document.body.appendChild(sparkle);
        
            charIndex = (charIndex + 1) % sparkleChars.length; 
        
            setTimeout(() => {
                sparkle.remove();
            }, 1000); 
        }
        

        function updateMousePosition(e) {
            const now = Date.now();
            if (now - lastTime > delay) { 
                mouseX = e.clientX;
                mouseY = e.clientY;
                createSparkle();
                lastTime = now;
            }
        }

        document.addEventListener('mousemove', updateMousePosition);

        window.addEventListener('beforeunload', () => {
            document.removeEventListener('mousemove', updateMousePosition);
        });
    }
})();
