<template>
    <div>
        <div class="error-holder">
            <div class="alert alert--small centered-alert" v-if="error" @click="error=null"><p>{{error}}</p></div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import {setErrorHandler} from '../request'
export default {
    data: () => ({
        error: ''
    }),
    mounted () {
        setErrorHandler(err => {
            if (err === 'Unauthorized') {
                this.$router.push('/login')
                return
            }
            this.$data.error = err
        })
        this.$router.beforeEach((to, from, next) => {
            this.$data.error = null
            next()
        })
    },
}
</script>

<<style>
    .error-holder{
        min-height: 40px;
        padding: 4px;
        margin-bottom: 8px;
    }
    .centered-alert {
        display: table;
        margin: 0 auto;
    }
</style>
