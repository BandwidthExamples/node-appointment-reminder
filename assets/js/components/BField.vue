<template>
    <div class="form-input clearfix">
        <label>{{label}}</label>
        <slot></slot>
        <div class="help" v-if="help">{{help}}</div>
    </div>
</template>

<script>
export default {
    props: ['label', 'help']
}
</script>
