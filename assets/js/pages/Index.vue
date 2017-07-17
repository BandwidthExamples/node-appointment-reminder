<template>
    <b-accordions>
        <b-accordion title="New Reminder" :is-active.sync="newReminder.isActive">
            <form @submit.prevent="createReminder">
                <div class="layout layout--two--column">
                    <div class="layout__column">
                        <label>When:</label>
                        <datepicker v-model="newReminder.date" :disabled="disabledDates" required></datepicker>
                        <b-field>
                            <vue-timepicker format="hh:mm A"  v-model="newReminder.time" hide-clear-button></vue-timepicker>
                        </b-field>
                    </div>
                    <div class="layout__column">
                        <label>Repeat:</label>
                        <div class="radios">
                            <div class="radio clearfix" v-for="r in repeats" :key="r">
                                <input v-model="newReminder.repeat" type="radio" :value="r" name="repeat"></input>
                                <label @click="newReminder.repeat = r">{{r}}</label>
                            </div>
                        </div>
                    </div>
                </div>  
                <div>
                    <b-field label="Name">
                        <input type="text" v-model="newReminder.name" required maxlength="60"></input>
                    </b-field>
                    <b-field label="What" help="This text will be sent you via SMS or call at given time">
                        <textarea v-model="newReminder.content" required></textarea>
                    </b-field>
                    <b-field label="Notification">
                        <div class="radio-group clearfix">
                            <template v-for="n in notificationTypes">
                                <input v-model="newReminder.notificationType" type="radio" :value="n" :key="n.id" name="notificationType"></input>
                                <label @click="newReminder.notificationType = n">{{n}}</label>
                            </template>    
                        </div>
                    </b-field>
                </div>
                <div class="clearfix">
                    <button type="submit" class="button button--submit button--hover-go button--right pull-right" :disabled="newReminder.inProgress">Create</button>
                </div>  
            </form>
        </b-accordion>
        <b-accordion title="Reminders" :is-active.sync="remindersActive">
            <p v-if="reminders.length == 0">No reminders</p>
            <div class="table-wrap" v-if="reminders.length > 0">
                <table cellpadding="0" cellspacing="0" class="small reminders-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Time</th>
                            <th>Repeat</th>
                            <th>Enabled</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(r, index) in reminders">
                            <tr :class="{'new-row': r.isNew}" :key="r.id">
                                <td :class="{'new-cell': r.isNew}">{{r.name}}</td>
                                <td>{{r.time | datetime}}</td>
                                <td>{{r.repeat}}</td>
                                <td>
                                    <div class="toggle clearfix" @click="toggleEnabled(r)">
                                        <input type="checkbox" :checked="r.enabled" :disabled="r.inProgress"></input>
                                        <label for="toggle-solo">&nbsp;</label>
                                    </div>
                                </td>
                                <td>
                                    <button class="button button--secondary button--medium button--cancel pull-right" :disabled="r.inProgress" @click="removeReminder(r, index)">Remove</button>
                                    <button class="button button--secondary button--medium button--light button--hover-go button--right pull-right" @click="r.isContentVisible = !r.isContentVisible">{{r.isContentVisible ? 'Hide Details' : 'Details'}}</button>
                                </td>
                            </tr>
                            <tr class="details" v-show="r.isContentVisible">
                                <td colspan="5" class="open"><div><p>{{r.notificationType == 'Sms' ? 'Send SMS with text': 'Call and say'}} "{{r.content}}"</p></div></td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </b-accordion>
    </b-accordions>
</template>

<script>
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'
import VueTimepicker from 'vue2-timepicker'
import BAccordions from '@components/BAccordions.vue'
import BAccordion from '@components/BAccordion.vue'
import BField from '@components/BField.vue'
import {getData, postData, deleteData} from '../request'

export default {
    data: () => ({
        reminders: [],
        remindersActive: true,
        newReminder: {
            isActive: false,
            repeat: 'Once',
            notificationType: 'Sms',
            content: '',
            date: new Date(),
            time: {
                hh: '09',
                mm: '00',
                A: 'AM'
            }
        },
        disabledDates: {
            to: moment().add(-1, 'd').toDate()
        },
        repeats: ['Once', 'Daily', 'Weekly', 'Monthly'],
        notificationTypes: ['Sms', 'Call']
    }),
    methods: {
        createReminder(){
            const data = Object.assign({}, this.$data.newReminder)
            const date = moment(data.date).format('YYYY-MM-DD')
            data.time = moment(`${date} ${data.time.hh}:${data.time.mm} ${data.time.A}`, 'YYYY-MM-DD hh:mm a').utc().toISOString()
            delete data.isActive
            delete data.date
            postData('/reminder', data, reminder => {
                reminder.isNew = true
                reminder.isContentVisible = false
                this.$data.reminders.unshift(reminder)
                this.$data.newReminder.name = ''
                this.$data.newReminder.content = ''
                this.$data.newReminder.repeat = 'Once'
                this.$data.newReminder.notificationType = 'Sms'
                this.$data.newReminder.date = new Date()
                this.$data.newReminder.time = {
                    hh: '09',
                    mm: '00',
                    A: 'AM'
                }
            }, this.$data.newReminder)
        },
        toggleEnabled(reminder){
            postData(`/reminder/${reminder.id}/enabled`, {enabled: !reminder.enabled}, () => {
                reminder.enabled = !reminder.enabled
            }, reminder)
        },
        removeReminder(reminder, index){
            if(confirm('Are you sure?')) {
                deleteData(`/reminder/${reminder.id}`, () => {
                    this.$data.reminders.splice(index, 1)
                }, reminder)
            }
        }
    },
    beforeRouteEnter(to, from, next){
        getData('/reminder', reminders => {
            next(vm => {
                reminders.forEach(r => {
                    r.isNew = false
                    r.isContentVisible = false
                })
                vm.$data.reminders = reminders
                if (reminders.length === 0) {
                    vm.$data.newReminder.isActive = true
                }
            })
        })
    },
    components: {
        BAccordions,
        BAccordion,
        BField,
        Datepicker,
        VueTimepicker
    }
}
</script>

<style>
.time-picker input {
    height: 53px !important;
    padding-left: var(--m) !important;
}
.time-picker .dropdown {
    top: calc(53px + 2px) !important;
}
.time-picker .dropdown li {
    margin-left: 0 !important;
}
.time-picker .dropdown ul li.active, .time-picker .dropdown ul li.active:hover {
    background: var(--bw-blue) !important;
}
.pull-right{
    float: right;
}
.reminders-table{
    overflow: hidden;
}
</style>
