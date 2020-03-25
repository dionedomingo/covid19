<template>
    <div >
        <b-form-datepicker id="example-datepicker" v-model="currentDate" 
            today-button
            reset-button
            close-button 
            :max='new Date()'
            class="mb-2">
        </b-form-datepicker>
       <multiselect v-model="countrySelected"  :max-height="250" :options="countryOptions" :multiple="true" :close-on-select="true" :clear-on-select="true" :preserve-search="true" placeholder="Pick countries to show" label="name" track-by="name" :preselect-first="true">
            <template slot="selection" slot-scope="{ values, search, isOpen }">
                <span class="multiselect__single_" v-if="values.length &amp;&amp; !isOpen">
                    <span class="multiselect__tag" v-for="(c,k) in values" v-bind:key="k">{{c.name}}</span>
                </span>
            </template>
        </multiselect>
        
        <div class="p-2">
            <div v-if="timeseries.data.result">
                <country v-if="countrySelected.some(item => item.code === code )" :code="code" :data="data" v-for="(data,code) in timeseries.data.result" v-bind:key="code"></country>       
            </div>
        </div>
      
        <apexchart hidden width="500" type="bar" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>

<script>
const moment = require('moment')
import Multiselect from 'vue-multiselect'
  // register globally
Vue.component('multiselect', Multiselect)
const iso = require('iso-3166-1');

    export default {
        components: { Multiselect },
        data(){
            return {
                countryOptions:[
                   { name:"Philippines", code: "PHL"}, {name: "Denmark" , code: 'DNK' }
                ],
                countrySelected: (localStorage.countrySelected ? JSON.parse(localStorage.countrySelected) : [
                   { name:"Philippines", code: "PHL"}, {name: "Denmark" , code: 'DNK' }
                ]),
                index: [],
                current: {},
                summary: {},
                currentTimestamp: 'Latest',
                timeseries: {data:{result:[]}},
                currentDate: new Date() ,
                api: {
                    global :'https://covidapi.info/api/v1/global',
                    timeseries: 'https://covidapi.info/api/v1/global/timeseries',
                    latest: 'https://covidapi.info/api/v1/latest-date',
                },
                chartOptions: {
                    chart: {
                    id: 'vuechart-example',
                    },
                    xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
                    },
                },
                series: [{
                    name: 'Vue Chart',
                    data: [30, 40, 45, 50, 49, 60, 70, 81]
                }]
            }
        },
        props: ['source'] ,
        watch: {
            currentDate: function(){
               this.getTimeseries()
            },
            timeseries: function(){
                let countries = Object.keys(this.timeseries.data.result);
                this.countryOptions = [];
                countries.forEach(function (code, i) {
                      this.countryOptions.push({
                        name: this.toCountry(code).country,
                        code: code 
                    });
                },this);
            },
            countrySelected(obj){
                localStorage.countrySelected = JSON.stringify( obj );
            }
        },
        mounted() {
            const cors = require('cors');
            this.getLatest()
            this.getTimeseries()
        },
        methods:{
             toCountry: function(code){
                const o = {
                    country: 'Unknown'
                };
                const oiso = iso.whereAlpha3(code);
                if(!oiso){
                    return {
                        country: code + ' ? '
                    };
                }
                return {...o,...oiso};
            },
            nameWithVal ({ name, val }) {
                return '${name} — [${val}]'
            },
            async getLatest (){
                this.currentDate = new Date().toJSON().slice(0,10);
                //const { data } = await this.$http.get(this.api.latest ,{crossdomain:true}).then(response => (this.currentDate = moment(response.data).add(1,'days')))
            },
            async getTimeseries (){
                let aWeekAgo = new Date(this.currentDate);
                aWeekAgo.setDate(aWeekAgo.getDate()-12);
                try {
                    const { data } = await this.axios.get(this.api.timeseries + '/' + aWeekAgo.toJSON().slice(0,10) + '/' + this.currentDate,{crossdomain:true}).then(response => ( this.timeseries = response ))
                 } catch (e) {
                    console.error('error',e)
                }
            }
        },
        filters: {
            reverse(items) {
                return items.splice().reverse()
            }
        }
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>