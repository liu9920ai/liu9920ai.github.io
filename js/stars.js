document.addEventListener('click', createStar);
document.addEventListener('touchstart', createStar); // 支持移动端

function createStar(e) {
    // 获取点击/触摸坐标
    const x = e.clientX || e.touches[0].clientX;
    const y = e.clientY || e.touches[0].clientY;

    // 创建星星元素
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    
    // 随机颜色和形状
    star.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24">
            <path fill="hsl(${Math.random()*360}, 100%, 50%)" 
                  d="M12 0l3.09 6.26L22 7.27l-5 4.87 1.18 6.88L12 16l-6.18 3.02L7 12.14 2 7.27l6.91-1.01L12 0z"/>
        </svg>
    `;

    // 添加到容器并设置自动移除
    document.getElementById('star-container').appendChild(star);
    setTimeout(() => star.remove(), 1000);
}
