<template>
    <div>
        <div class="tab-drawer" :class="{'active': isActive}" @click="$emit('update:isActive', !isActive)">{{title}}</div>
        <div class="content" v-show="isActive">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title', 'isActive']
}
</script>
