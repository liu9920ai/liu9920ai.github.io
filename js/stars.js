// stars.js
let isScrolling = false;

// 监听滚动开始
window.addEventListener('touchstart', () => {
    isScrolling = true;
});

// 监听滚动结束
window.addEventListener('touchend', () => {
    isScrolling = false;
});

document.addEventListener('click', function(e) {
    if (!isScrolling && !e.target.closest('a')) {
        createStar(e);
    }
});

document.addEventListener('touchstart', function(e) {
    if (!isScrolling && !e.target.closest('a')) {
        const touch = e.touches[0];
        createStar({
            pageX: touch.pageX,
            pageY: touch.pageY,
            target: e.target
        });
    }
}, { passive: true });

function createStar(e) {
    // 使用防抖处理高频点击
    if (window.starTimeout) return;
    window.starTimeout = setTimeout(() => {
        window.starTimeout = null;
    }, 50);

    // 获取精确坐标（包含滚动偏移）
    const x = e.pageX;
    const y = e.pageY;

    // 使用DocumentFragment优化DOM操作
    const fragment = document.createDocumentFragment();
    
    const star = document.createElement('div');
    star.className = 'star';
    
    // 使用CSS transform替代直接设置left/top
    star.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;

    // 随机运动参数
    const angle = Math.random() * Math.PI * 2;
    const distance = 30 + Math.random() * 80;
    const rotation = Math.random() * 360;

    star.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" 
             style="transform: rotate(${rotation}deg);
                    animation: star-fade 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;">
            <path fill="hsl(${Math.random()*360}, 100%, 50%)" 
                  d="M12 0l3.09 6.26L22 7.27l-5 4.87 1.18 6.88L12 16l-6.18 3.02L7 12.14 2 7.27l6.91-1.01L12 0z"/>
        </svg>
    `;

    fragment.appendChild(star);
    document.getElementById('star-container').appendChild(fragment);

    // 自动清理（优化内存）
    setTimeout(() => {
        star.style.opacity = 0;
        setTimeout(() => star.remove(), 300);
    }, 700);
}
