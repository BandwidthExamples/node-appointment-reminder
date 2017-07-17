<template>
    <b-spaced-container>
        <b-form title='Phone Number Verification' action-title='Send' @submit='send' :disabled="inProgress">
            <b-field label="Code from SMS" help="Code from received SMS">
                <input type="text" v-model="code" required></input>
            </b-field>
        </b-form>
    </b-spaced-container>
</template>
<script>

import BSpacedContainer from '@components/BSpacedContainer.vue'
import BForm from '@components/BForm.vue'
import BField from '@components/BField.vue'
import {postData} from '../request'

export default {
    data: () => ({
        code: '',
        inProgress: false
    }),
    methods: {
        send() {
            const data = Object.assign({phoneNumber: this.$route.query.phoneNumber}, this.$data);
            postData('/verify-code', data, () => {
                this.$router.replace('/');
            }, this.$data);
        }
    },
    components: {
        'b-form': BForm,
        'b-field': BField,
        'b-spaced-container': BSpacedContainer
    }
}
</script>
