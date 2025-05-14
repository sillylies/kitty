document.addEventListener('DOMContentLoaded', () => {
   
    const boxContain = document.querySelector('.box-contain');

  
    if (!boxContain) {
        console.error("Box element not found!");
        return;
    }

   
    document.addEventListener('mousemove', (event) => {
      
        const mouseX = event.clientX;
        const mouseY = event.clientY;

      
        let offsetX = (mouseX / window.innerWidth - 0.5) * 30; 
        let offsetY = (mouseY / window.innerHeight - 0.5) * -30;

        
        offsetX = Math.min(Math.max(offsetX, -15), 15); 
        offsetY = Math.min(Math.max(offsetY, -15), 15);

        
        boxContain.style.transform = `perspective(1500px) rotateX(${offsetY}deg) rotateY(${offsetX}deg)`;
    });
});
