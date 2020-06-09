<template>
    <div class="card">
        <slot name="questionCounter"></slot>
        <slot name="question"></slot>
        <slot name="answers"></slot>
    </div>
</template>

<script>
    export default {
    }
</script>

<style scoped>
.card {
    border: 1px solid black;
    border-radius: 2em;
    padding: 1em;
}
</style>