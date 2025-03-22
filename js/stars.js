// stars.js
document.addEventListener('click', createStar);
document.addEventListener('touchstart', createStar);

function createStar(e) {
    const x = e.pageX || e.touches[0].pageX;
    const y = e.pageY || e.touches[0].pageY;
    
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    
    // 随机运动参数
    const angle = Math.random() * Math.PI * 2;
    const distance = 30 + Math.random() * 80;
    const rotation = Math.random() * 360;

    star.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" style="transform: rotate(${rotation}deg)">
            <path fill="hsl(${Math.random()*360}, 100%, 50%)" 
                  d="M12 0l3.09 6.26L22 7.27l-5 4.87 1.18 6.88L12 16l-6.18 3.02L7 12.14 2 7.27l6.91-1.01L12 0z"/>
        </svg>
    `;

    // 添加运动轨迹
    star.style.transform = `
        translate(-50%, -50%)
        translate(${Math.cos(angle)*distance}px, ${Math.sin(angle)*distance}px)
    `;

    star.style.animation = `star-fade 1s cubic-bezier(0.4, 0, 0.2, 1) forwards`;

    document.getElementById('star-container').appendChild(star);
    setTimeout(() => star.remove(), 1000);
}
