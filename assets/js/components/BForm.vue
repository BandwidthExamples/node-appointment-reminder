<template>
    <form class="form layout__column layout__column--bordered" @submit.prevent="$emit('submit')">
        <h3>{{title}}</h3>
        <slot></slot>
        <div class=""><button type="submit" class="button button--medium button--hover-go button--right" :disabled="disabled">{{actionTitle}}</button></div>
        <div class="footer" v-if="$slots.footer">
            <slot name="footer"></slot>
        </div>
    </form>
</template>

<script>
export default {
    props: ['title', 'actionTitle', 'disabled']
}
</script>

<style>
  .form {
    padding: var(--m);
    background: white;
  }
  .footer {
    margin-top: var(--m);
  }
</style>
