const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
	constructor(x, y, radius, color) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
	}

	draw() {
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}
}

class Projectile {
	constructor(x, y, radius, color, velocity) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.velocity = velocity;
	}
	
	draw() {
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}

	update() {
		this.draw();
		this.x= this.x + this.velocity.x;
		this.y= this.y + this.velocity.y;
	}
}

class Enemy {
	constructor(x, y, radius, color, velocity) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.velocity = velocity;
	}
	
	draw() {
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}

	update() {
		this.draw();
		this.x= this.x + this.velocity.x;
		this.y= this.y + this.velocity.y;
	}
}

function spawnEnemy() {
	setInterval(() => {

		const radius =Math.random() * (30 - 4) + 4;

		let x;
		let y;

		if(Math.random() < 0.5) {
			x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
			y = Math.random() * canvas.height;
		} else {
			x = Math.random() * canvas.width;
			y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
		}
		
		const color = 'green';
		const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
	
	const velocity = {
		x: Math.cos(angle),
		y: Math.sin(angle)
	}

		enemies.push(new Enemy(x,y,radius,color,velocity));

	}, 1000);
}

const x = canvas.width / 2;
const y = canvas.height / 2;

const player = new Player(x, y, 10,'black');

var hp = 1000;
var bulletCount = 0;

const projectiles = [];
const enemies = [];

let animationId;

function animate()
{
	animationId = requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	player.draw();
	projectiles.forEach((projectile, index) => {
	projectile.update();

	//화면 밖으로 나간 총알 삭제
	if(projectile.x + projectile.radius < 0
	 || projectile.x - projectile.radius > canvas.width
	 || projectile.y + projectile.radius < 0
	 || projectile.y - projectile.radius > canvas.height) {
		setTimeout(() => {

				bulletCount--;
				projectiles.splice(index, 1);
			}, 0);
	}
});	

	enemies.forEach((enemy, index) => {
		enemy.update();

		const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);

		//게임 종료 및 Player 피격판정
		if(dist - enemy.radius - player.radius < 1) {
			hp = hp - enemy.radius;
			console.log(hp);
			if(hp < 0)
			{
			alert("You are Loser!");
			cancelAnimationFrame(animationId);
			setTimeout(() => { location.reload();
			}, 1000);
		}
		}


		projectiles.forEach((projectile, projectileIndex) => {
			const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

			//적 피격 판정
			if(dist - enemy.radius - projectile.radius < 1)
			{
				bulletCount--;
				
				setTimeout(() => {
				enemies.splice(index, 1);
				projectiles.splice(projectileIndex, 1);
			}, 0);
			}
		});
	});
}

window.addEventListener('click', (event) => 
{
	bulletCount++;
	console.log(projectiles);
	console.log(bulletCount);
	const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2);
	
	const velocity = {
		x: Math.cos(angle),
		y: Math.sin(angle)
	}
	if(bulletCount < 6)
	{
	projectiles.push(new Projectile(canvas.width / 2, canvas.height / 2, 5, 'red', velocity))
}
});

animate();
spawnEnemy();