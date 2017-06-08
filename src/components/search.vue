<template>
    <div class="banner_dairy" id="banner_dairy">
        <div class="input-group banner_search">
            <input type="text" v-model.trim="keyword" placeholder="SEARCH" class="form-control" @keyup.enter="searchBtn">
            <span class="input-group-addon search_btn" @click="searchBtn"><i class="iconfont icon-search addon_icon"></i></span>
        </div>
    </div>
</template>

<script>
import Sketch from '../assets/js/color'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            keyword: ''
        }
    },
    computed: {
        ...mapGetters({
            getArticleList: 'getArticleList'
        })
    },
    methods: {
        searchBtn(){
            this.$emit("keyword-change",this.keyword);
        }
    },
    mounted: function () {
        this.keyword = this.getArticleList.keyword;

        var MAX_PARTICLES = 200;
        var COLOURS = ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423'];

        var particles = [];
        var pool = [];
        var demo = Sketch.create({
            container: document.getElementById('banner_dairy')
        });

        demo.setup = function () {

            var i, x, y;

            for (i = 0; i < 20; i++) {
                x = ( demo.width * 0.5 ) + random(-100, 100);
                y = ( demo.height * 0.5 ) + random(-100, 100);
                demo.spawn(x, y);
            }
        };

        demo.spawn = function (x, y) {

            if (particles.length >= MAX_PARTICLES)
                pool.push(particles.shift());

            var particle = pool.length ? pool.pop() : new Particle();
            particle.init(x, y, random(5, 40));

            particle.wander = random(0.5, 2.0);
            particle.color = random(COLOURS);
            particle.drag = random(0.9, 0.99);

            var theta = random(TWO_PI);
            var force = random(2, 8);

            particle.vx = sin(theta) * force;
            particle.vy = cos(theta) * force;

            particles.push(particle);
        };

        demo.update = function () {

            var i, particle;

            for (i = particles.length - 1; i >= 0; i--) {

                particle = particles[i];

                if (particle.alive) particle.move();
                else pool.push(particles.splice(i, 1)[0]);
            }
        };

        demo.draw = function () {

            demo.globalCompositeOperation = 'lighter';

            for (var i = particles.length - 1; i >= 0; i--) {
                particles[i].draw(demo);
            }
        };

        demo.mousemove = function () {

            var particle, theta, force, touch, max, i, j, n;

            for (i = 0, n = demo.touches.length; i < n; i++) {

                touch = demo.touches[i];
                max = random(1, 4);
                for (j = 0; j < max; j++) demo.spawn(touch.x, touch.y);
            }
        };

        Date.now || (Date.now = function () {
            return +new Date
        }), function () {
            for (var e = 0, n = ["ms", "moz", "webkit", "o"], t = 0; n.length > t && !window.requestAnimationFrame; ++t) window.requestAnimationFrame = window[n[t] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[n[t] + "CancelAnimationFrame"] || window[n[t] + "CancelRequestAnimationFrame"];
            window.requestAnimationFrame || (window.requestAnimationFrame = function (n) {
                var t = Date.now(),
                    o = Math.max(0, 16 - (t - e)),
                    a = window.setTimeout(function () {
                        n(t + o)
                    }, o);
                return e = t + o, a
            }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
                clearTimeout(e)
            })
        }();

        function Particle(x, y, radius) {
            this.init(x, y, radius);
        }

        Particle.prototype = {

            init: function (x, y, radius) {
                this.alive = true;

                this.radius = radius || 10;
                this.wander = 0.15;
                this.theta = random(TWO_PI);
                this.drag = 0.92;
                this.color = '#fff';

                this.x = x || 0.0;
                this.y = y || 0.0;

                this.vx = 0.0;
                this.vy = 0.0;
            },

            move: function () {

                this.x += this.vx;
                this.y += this.vy;

                this.vx *= this.drag;
                this.vy *= this.drag;

                this.theta += random(-0.5, 0.5) * this.wander;
                this.vx += sin(this.theta) * 0.1;
                this.vy += cos(this.theta) * 0.1;

                this.radius *= 0.96;
                this.alive = this.radius > 0.5;
            },

            draw: function (ctx) {

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, TWO_PI);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        };

        var colors = [[62, 35, 255], [60, 255, 60], [255, 35, 98], [45, 175, 230], [255, 0, 255], [255, 128, 0]];
        var step = 0;
        var colorIndices = [0, 1, 2, 3];

        var gradientSpeed = 0.002;

        if (document.getElementsByClassName("sketch")[0]) {
            this.updateGradient = setInterval(function () {
                var c0_0 = colors[colorIndices[0]];
                var c0_1 = colors[colorIndices[1]];
                var c1_0 = colors[colorIndices[2]];
                var c1_1 = colors[colorIndices[3]];

                var istep = 1 - step;
                var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
                var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
                var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
                var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

                var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
                var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
                var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
                var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

                if (!document.getElementsByClassName("sketch")[0]) return false;
                var sketch = document.getElementsByClassName("sketch");
                sketch[0].style.background = "linear-gradient(to left,  "+ color1 + " 0%, " + color2 + " 100%)";
                sketch[0].style.background = "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))";
                sketch[0].style.background = "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)";

                step += gradientSpeed;
                if (step >= 1) {
                    step %= 1;
                    colorIndices[0] = colorIndices[1];
                    colorIndices[2] = colorIndices[3];

                    colorIndices[1] = ( colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
                    colorIndices[3] = ( colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

                }
            }, 10);
        }

    },
    beforeDestroy () {
        Sketch.stop();
        clearInterval(this.updateGradient);
    }
}
</script>
