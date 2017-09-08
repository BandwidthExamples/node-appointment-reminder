<template>
    <div>
        <div class="dark-navigator">
          <div id="logo-wrap">
              <div class="logo"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA8CAYAAAApK5mGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Mzk4RjRGRUZDQTFCMTFFNjk5RDNDNDYxNkNERkFERDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Mzk4RjRGRjBDQTFCMTFFNjk5RDNDNDYxNkNERkFERDgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozOThGNEZFRENBMUIxMUU2OTlEM0M0NjE2Q0RGQUREOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozOThGNEZFRUNBMUIxMUU2OTlEM0M0NjE2Q0RGQUREOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnUWvS0AAAV+SURBVHja3Fp5iFVVGL/zxlxmNDNNMRcEx4oSbKyZ0jbMbEbKjMLSgsqiASuoqKCM/ihIkhbChqiIEotiCJcWStMW2oTKFpOxnEZFp5hEZ3GZsUnn9fuY78bpdM5933e913fpgx/v3Xe29zvLt51bks/ng/+T5GK2OwG4GfgQ2AfQrOwBngMGF5URrZASU4DGvF9WxugzMZQot9wlwDvAiVFzBAwDOrO+5SYBbxcgQ1ICDMr6GaIz8xYwVFCXztIfWSe0GJgirPsRb7vMEhoPPKjo892sq+0lwEBhfz3A+1kmVAHcoOhvQ7G0m5TQYtZaUnmz2J5ClB0aBexmDSeRw8ApwMGsrtAdCjIB26iDxV6hXMTvC5V9FX27RRG6FBin6KcDWJtlQrco+1kJ/JnC/yPP/SyF2XASIl/tGuXAb6Q04e8BW3gHkMG+PA6ha5XOZSvwaUqEuvhzAHAlsI4N92gNIe3qkHbrTYlQg+O32cB3Xt/SCpAGA915ndSmGLCVAR2ecfcCZ9ht7BWq0RxAyAHgkxSVVlfE+RzO52pI1Jaboxzw45S0mylrCviaT0YRmqEcbN1xMC2kcLojyuuAShehCo59skaIQpLvC4T8j4QP/SzvQCPkuG73lPXn1T6XHdZDwGbgA2B/DFKbgOkR5XOBsUCLSeh85SCfeXIP9wP3MhFbiNhjvO81YfpOgT29Hnja3HJVSkJfWM9lbPSWGGRoNW4HbuX65cBS4GHlWL8L6tSYW44GOlM5yFfW83LgMis+mgV8zc+vAtXsxWuTKN2COtNMwzpNaUzJ+PYzDNoCR517EjSwc4X/a3S45U5TztiPwBFDASy1ypuB+gQ1nTTQHJUzVLZGNhvf5ztip2cMwknIqVLicQltNb7fZpUd8TiVLpnHSqRQImaCNK8REhqnJPQLf44ELnIY233Cfi4EHgr6rmai5Gxhfy05w9HTSJNhjO3Z1TirYa78UcvI20a6Wqja20NCI2J4CYFnoC8V/YSOLblctZ46F7BZEdnFOCu0l20MyWRH+Q8x7ct8T50Fwr7WmoQ02dHWiMO6xyCrlVqH939SBFFT/uLIOdYda4c1oCm7PG0GsWtFCmQiUOqYSNolp1vt7rQDOI/Q3VVbEHEQo6TTOrC282kbRPLb7gv+fZlM9T4P/nuBVmWYhDGB7BqH3Kgn7PChi51LiZgGc3/gv9Ur42hzlqOs3KMEwhUqZd9QcqP+MvCTHeC1x9z3ux1bK/xDDR4yUTKRt+HzlqPrE3KxHnCF4G0xCW3yWPRnOY+mlemc+KgTaturrCPwD6FmxaADrMymKSN5du+KOUHksVwhqLcj6HvFoNGXaGxSDHqy8X098I1VvqhAe7ohXxZTvR8FXmJXqDEq0XiTIhbabsUqY4FmYdsuoJrbbVGMuQ14CqiQvklSoVilo6zBeqxVo1m/sUBS8mrO5VUZkawprwV990y0rXv5nGzjT5kY7FoUMzbZM0OVwAu8Yr1c9xCwCphk1Gvw9LvoWKNb8+FFBaGFgs5p9Yc4fp9qkLWl8lgJma7PCsXhnCm04Aes30pZC7p8x3YrEo4lOSuL86uwXY3D7ZEIuTLnecpW8/lMjBDN6OPCdiP4gGtkNicZffJ6ItkHaw9SaqpJeI42Kvb2DFbZPvk2qZSX68dahXK4TjDIvAJkEr008xXUCwnRLdp4Tx/lwDJBH6uSvPXzFfQHNghJbQXGGG0HAnVCu7YTGH48CIX3m+uFpH4D7gZeAdqEbTqTsDsaQuFK1eeTl1bgnDQumgvlFHo4FJjJ+ewkhDz0qY5YKkhDbUchB8zh97IPx1iVjSm/AhDrvW0zyCOP+WJONk7gZOEwwyOn68qf2QNZw99Tl78FGACOKch7+U0FdgAAAABJRU5ErkJggg==" alt="Bandwidth logo" /><span class="product">Appointment Reminder</span></div>
          </div>
          <nav class="main-menu">
              <template v-if="user">
                <span class="user">{{user.name}} ({{user.phoneNumber}})</span>
                <a href="#" @click.stop.prevent="logout()">Logout</a>
              </template>
              <template v-else>
                <router-link to="/login">Login</router-link>
              </template>
          </nav>
        </div>
        <div class="error-holder">
            <div class="alert alert--small centered-alert" v-if="error" @click="error=null"><p>{{error}}</p></div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import {setErrorHandler} from '../request'
import {postData} from '../request'
import bus from '../bus'
export default {
    data: () => ({
        error: '',
        user: null,
    }),
    mounted () {
				const json = window.sessionStorage.getItem('user')
				if (json) {
					this.$data.user = JSON.parse(json)
				}
				bus.$on('authorized', user => {
					this.$data.user = user
					window.sessionStorage.setItem('user', JSON.stringify(user))
        });
        setErrorHandler(err => {
            if (err === 'Unauthorized') {
                this.$router.push('/login')
                this.$data.user = null
                return
            }
            this.$data.error = err
        })
        this.$router.beforeEach((to, from, next) => {
            this.$data.error = null
            next()
        })
    },
    methods: {
        logout() {
            postData('/logout', {}, () => {
                this.$router.push({path: '/login'})
								this.$data.user = null
								window.sessionStorage.removeItem('user')
            }, {});
        }
    },
}
</script>

<style>
    .error-holder{
        min-height: 40px;
        padding: 4px;
        margin-bottom: 8px;
    }
    .centered-alert {
        display: table;
        margin: 0 auto;
    }

    .dark-navigator {
        background: #1f2a44;
        padding: 30px;
    }
    .dark-navigator a {
        color: #fff;
    }
    a#logo img {
        width: 26px;
    }
    #mobile-menu {
        color: #fff;
    }
    .logo img {
      width: 26px;
      height: 30px;
    }
    .logo .product {
      color: white;
      font-size: 22px;
      font-weight: 100;
      line-height: 30px;
      border-left: 1px solid;
      margin-left: 0.5em;
      padding-left: 0.5em;
      height: 30px;
      display: inline-block;
      position: absolute;
      font-size: 24px;
      font-family: "Overpass",Raleway,"Open Sans",arial,sans-serif;
    }
    .logo, .logo:link, .logo:hover, .logo:visited, .logo:active {
      text-decoration: none;
    }
    .main-menu {
      position: absolute;
      right: 20px;
      top: 34px;
    }
    nav {
        margin-bottom: auto;
        clear: both;
        transition: none;
    }
    nav a {
        border: none;
        margin-right: 4px;
        padding: unset;
        display: inline-block;
        opacity: 1;
        transition: all 0.2s ease;
        position: relative;
    }
    nav a:hover {
        text-transform: none;
    }
    nav a:active {
        text-transform: none;
    }
    nav:last-of-type,
    nav a:last-of-type {
        margin-right: 0 !important;
    }
    nav a:before {
        content: none;
        background: none;
        width: auto;
        height: auto;
        display: block;
        position: initial;
        bottom: auto;
        left: auto;
        cursor: default;
        pointer-events: none;
        opacity: 1;
        transition: height 0.2s ease, opacity 0.2s ease;
    }
    nav a:after {
      content: none;
      background: none;
    }
    nav a:hover:before,
    nav a.active:before {
        height: auto;
    }
    nav a:not(.active):before {
        opacity: 0.25;
    }
		nav .user {
			color: white;
			font-size: 90%;
			font-weight: 100;
			margin-right: 30px;
		}
</style>
