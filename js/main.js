// 技能数据
const skillsData = [
    {
        name: 'HTML5',
        icon: 'fab fa-html5',
        level: '精通',
        percentage: 95,
        description: '语义化标签、无障碍访问、SEO 优化'
    },
    {
        name: 'CSS3',
        icon: 'fab fa-css3-alt',
        level: '精通',
        percentage: 90,
        description: 'Flexbox、Grid、动画、响应式设计'
    },
    {
        name: 'JavaScript',
        icon: 'fab fa-js-square',
        level: '精通',
        percentage: 92,
        description: 'ES6+、异步编程、DOM 操作'
    },
    {
        name: 'React',
        icon: 'fab fa-react',
        level: '熟练',
        percentage: 85,
        description: '组件化开发、Hooks、状态管理'
    },
    {
        name: 'Node.js',
        icon: 'fab fa-node-js',
        level: '熟练',
        percentage: 80,
        description: 'Express、RESTful API、中间件'
    },
    {
        name: 'Python',
        icon: 'fab fa-python',
        level: '熟练',
        percentage: 78,
        description: '数据处理、自动化脚本、Web 开发'
    },
    {
        name: 'Git',
        icon: 'fab fa-git-alt',
        level: '熟练',
        percentage: 88,
        description: '版本控制、分支管理、协作开发'
    },
    {
        name: 'Database',
        icon: 'fas fa-database',
        level: '熟练',
        percentage: 75,
        description: 'MySQL、MongoDB、Redis'
    }
];

// 创建技能卡片
function createSkillCards() {
    const skillsGrid = document.querySelector('.skills-grid');

    skillsData.forEach((skill, index) => {
        const card = document.createElement('div');
        card.className = 'skill-card animate-on-scroll';
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <i class="${skill.icon} skill-icon"></i>
                    <div class="skill-name">${skill.name}</div>
                    <div class="skill-level">${skill.level}</div>
                </div>
                <div class="card-back">
                    <div class="skill-description">${skill.description}</div>
                    <div class="skill-bar">
                        <div class="skill-bar-fill" style="width: 0%"></div>
                    </div>
                </div>
            </div>
        `;

        skillsGrid.appendChild(card);
    });
}

// 初始化技能条动画
function initSkillBars() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target.querySelector('.skill-bar-fill');
                    const percentage = skillsData.find(s =>
                        entry.target.querySelector('.skill-name').textContent === s.name
                    ).percentage;
                    bar.style.width = `${percentage}%`;
                }
            });
        },
        { threshold: 0.5 }
    );

    document.querySelectorAll('.skill-card').forEach(card => observer.observe(card));
}

// 平滑滚动导航
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    // 创建技能卡片
    createSkillCards();

    // 初始化打字机效果
    const typewriterElement = document.getElementById('typewriter');
    const texts = [
        '全栈开发工程师',
        '热爱编程的技术爱好者',
        '创造优雅的解决方案',
        'Lucky you!'
    ];
    new Typewriter(typewriterElement, texts, {
        typingSpeed: 80,
        deletingSpeed: 40,
        pauseTime: 2000
    });

    // 初始化滚动动画
    new ScrollAnimator();

    // 初始化导航栏滚动效果
    new NavbarScroll();

    // 初始化技能条动画
    initSkillBars();

    // 初始化平滑滚动
    initSmoothScroll();

    // 添加加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
