<template>
    <form class="card wButton" @submit.prevent="$emit('submit')">
        <div class="card-image inner"><h2>{{title}}</h2></div>
        <div class="card-details inner">
            <slot></slot>
        </div>
        <div class="card-action inner"><button type="submit" class="button button--medium button--hover-go button--right" :disabled="disabled">{{actionTitle}}</button></div>
        <div class="card-action inner" v-if="$slots.footer">
            <slot name="footer"></slot>
        </div>
    </form>
</template>

<script>
export default {
    props: ['title', 'actionTitle', 'disabled']
}
</script>
