<template>
    <span> {{ Timestamp | moment("from") }}</span>
</template>

<script>

    export default {
    props: {
        Timestamp: String,
    },
}
</script>