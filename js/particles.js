// 粒子动画类
class ParticleAnimation {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 150 };
        this.particleCount = 80;
        this.connectionDistance = 120;

        this.init();
        this.animate();
        this.addEventListeners();
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this));
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        this.connectParticles();
        requestAnimationFrame(() => this.animate());
    }

    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectionDistance) {
                    const opacity = 1 - (distance / this.connectionDistance);
                    this.ctx.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.3})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    addEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });

        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
}

// 粒子类
class Particle {
    constructor(animation) {
        this.animation = animation;
        this.x = Math.random() * this.animation.canvas.width;
        this.y = Math.random() * this.animation.canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = (Math.random() - 0.5) * 1;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        // 边界检测
        if (this.x > this.animation.canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y > this.animation.canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
        }

        // 鼠标交互
        if (this.animation.mouse.x != null && this.animation.mouse.y != null) {
            const dx = this.x - this.animation.mouse.x;
            const dy = this.y - this.animation.mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.animation.mouse.radius) {
                const force = (this.animation.mouse.radius - distance) / this.animation.mouse.radius;
                const angle = Math.atan2(dy, dx);
                this.x += Math.cos(angle) * force * 2;
                this.y += Math.sin(angle) * force * 2;
            }
        }

        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw() {
        this.animation.ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        this.animation.ctx.beginPath();
        this.animation.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.animation.ctx.fill();
    }
}

// 初始化粒子动画
document.addEventListener('DOMContentLoaded', () => {
    new ParticleAnimation();
});
