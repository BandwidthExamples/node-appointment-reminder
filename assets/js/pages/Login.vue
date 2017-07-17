<template>
    <b-spaced-container>
        <b-form title='Login' action-title='Login' @submit='login' :disabled="inProgress">
            <b-field label="Phone Number" help="Your registered phone number">
                <input type="tel" v-model="phoneNumber" required></input>
            </b-field>
            <div slot="footer">
                <router-link to="/register">Register new user</router-link>
            </div>
        </b-form>
    </b-spaced-container>
</template>
<script>
import BSpacedContainer from '@components/BSpacedContainer.vue'
import BForm from '@components/BForm.vue'
import BField from '@components/BField.vue'
import {postData} from '../request'
import normalizePhoneNumber from '../phone-number'

export default {
    data: () => ({
        phoneNumber: '',
        inProgress: false
    }),
    methods: {
        login() {
            this.$data.phoneNumber = normalizePhoneNumber(this.$data.phoneNumber)
            postData('/login', this.$data, () => {
                this.$router.push({path: '/verifyCode', query: {phoneNumber: this.$data.phoneNumber}});
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
