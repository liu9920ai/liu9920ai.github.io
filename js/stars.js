// stars.js
document.addEventListener('click', function(e) {
    // 排除所有a标签及其内部元素
    if (!e.target.closest('a')) {
        createStar(e);
    }
});

document.addEventListener('touchstart', function(e) {
    // 移动端处理逻辑
    if (!e.target.closest('a')) {
        e.preventDefault(); // 防止触摸滚动干扰
        createStar(e);
    }
}, { passive: false });

function createStar(e) {
    // 获取精确坐标（包含滚动偏移）
    const x = e.pageX || e.touches[0].pageX;
    const y = e.pageY || e.touches[0].pageY;

    const star = document.createElement('div');
    star.className = 'star';
    
    // 设置基础位置
    star.style.left = x + 'px';
    star.style.top = y + 'px';

    // 随机运动参数
    const angle = Math.random() * Math.PI * 2;
    const distance = 30 + Math.random() * 80;
    const rotation = Math.random() * 360;

    // 通过CSS变量传递位移量
    star.style.setProperty('--tx', `${Math.cos(angle)*distance}px`);
    star.style.setProperty('--ty', `${Math.sin(angle)*distance}px`);

    star.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" style="transform: rotate(${rotation}deg)">
            <path fill="hsl(${Math.random()*360}, 100%, 50%)" 
                  d="M12 0l3.09 6.26L22 7.27l-5 4.87 1.18 6.88L12 16l-6.18 3.02L7 12.14 2 7.27l6.91-1.01L12 0z"/>
        </svg>
    `;

    document.getElementById('star-container').appendChild(star);
    setTimeout(() => star.remove(), 1000);
}
