<template>
    <div >
       <b-row>
            <b-col class="px-2">
                <b-dropdown id="dropdown-1" :text="currentTimestamp | moment('hA MMMM Do YYYY')" class="" variant="primary"  split split-variant="outline-primary">
                    <b-dropdown-item v-on:click="setTimestamp(i)" v-for="(i,k) in index"  v-bind:key="k">
                        {{ i.timestamp | moment("hA MMMM Do YYYY") }}
                    </b-dropdown-item>
                </b-dropdown>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="6" sm="6" md=4 lg=2 xl=1 class="text-center my-2 px-2" v-for="(c,k) in current" v-bind:key="k">
                <div class="card shadow-sm py-2" v-b-popover.hover.bottom.html="popoverContent(c)" >
                    <b-row>
                        <b-col cols=12 class="pt-2">
                            <font-awesome-icon v-if="c.status=='Died' && c.gender=='F' " :icon="['fad', 'coffin-cross']" size="2x" :style="{ color: '#DF5286' }" />
                            <font-awesome-icon v-if="c.status=='Died' && c.gender=='M' " :icon="['fad', 'coffin-cross']" size="2x" :style="{ color: '#003366' }" />
                            <font-awesome-icon v-if="c.gender=='F' && c.status!='Died'"  :icon="['fad', 'female']" fixed-width size="2x" :style="{ color: '#DF5286' }" />
                            <font-awesome-icon v-if="c.gender=='M' && c.status!='Died'" :icon="['fad', 'male']"   fixed-width size="2x" :style="{ color: '#003366' }" />
                            <font-awesome-layers v-if="c.gender=='T' || c.gender=='TBA'" full-width>
                                <font-awesome-icon :icon="['fad', 'male']" size="2x" :style="{ color: '#555555' }" />
                                <font-awesome-layers-text class="text-white" transform="down-2 shrink-8" value="?" />
                            </font-awesome-layers>
                        </b-col>
                        <b-col>

                            <b-badge pill variant="dark">#{{c.case_no}}</b-badge>
                            <span class="px-2" v-html="nationalityToFlag(c.nationality)"></span>
                        </b-col>
                    </b-row>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>

    export default {
        data(){
            return {
                index: [],
                current: {},
                summary: {},
                currentTimestamp: 'Latest'
            }
        },
        props: ['source'] ,
        mounted() {
            this.loadIndex();
            this.loadTimestamp('latest');
            console.log(this);
        },
        computed: {
            popoverConfig(c) {
                 return {
                    html: true,
                    title: (c) => {
                        // Note this is called only when the popover is opened
                        return c.case_no
                    },
                    content: (c) => {
                        // Note this is called only when the popover is opened
                        return '<i class="fad fa-hospital fa-fw"></i> ' + c.hospital_admitted_to
                    }
                }
            }
        },
        methods:{
            setTimestamp: function(i){
                this.currentTimestamp = i.timestamp;
                this.loadTimestamp(i.timestamp);
                this.loadSummary(i.timestamp);
            },
            popoverContent: function(c){

                let icons = {
                    Recovered: ['badge-check','green'],
                    Admitted: ['procedures','red'],
                    Died:[ 'coffin','grey'],
                    TBA:[ 'question','purple']
                };

               
                let status_icon = icons[c.status][0];
                let status_color = icons[c.status][1];


                return    '<div><i style="color:red" class="fad fa-birthday-cake fa-fw"></i> '+c.age+'</div>'
                        + '<div><i class="fad fa-venus-mars fa-fw"></i> '+c.gender+'</div>'
                        + '<div><i style="color:blue" class="fad fa-calendar-check fa-fw"></i> '+c.date+'</div>'
                        + '<div><i class="fad fa-plane fa-fw"></i> '+c.had_recent_travel_history_abroad+'</div>'
                        + '<div><i class="fad fa-flag fa-fw"></i> '+c.nationality+'</div>'
                        + '<div><i class="fad fa-hospital fa-fw"></i> ' + c.hospital_admitted_to + '</div>'
                        + '<div><i style="color:'+status_color+'" class="fad fa-' + status_icon + ' fa-fw"></i> '+c.status+'</div>'
                        + '<div>'+c.other_information+'</div>'

                ;
            },
            nationalityToFlag (nationality){
                let flagcode = '';
                switch(nationality){
                    case 'Filipino': flagcode = 'ph'
                        break;
                    case 'American': flagcode = 'us'
                        break;
                    case 'Chinese': flagcode = 'cn'
                        break;
                    case 'Taiwanese': flagcode = 'tw'
                         break;
                    case 'Thai': flagcode = 'tw'
                         break;
                    case 'Indian': flagcode = 'in'
                        break;
                    case 'TBA': return '<span class="badge badge-pill badge-secondary">TBA</span>'
                        break;
                    default:
                    return '<span class="badge badge-pill badge-secondary">'+nationality+'</span>';
                }
                return '<img class="img-fluid" width=20 src="https://lipis.github.io/flag-icon-css/flags/4x3/' + flagcode + '.svg" />';

            },
            async loadIndex () {
                const { data } = await this.$http.get(this.source + 'index.json').then(response => (this.index = response.data))
            },
            async loadTimestamp (t) {
                const { data } = await this.$http.get(this.source + t +'.json').then(response => (this.current = response.data.reverse()))
            },
            async loadSummary (t) {
                const { data } = await this.$http.get(this.source + t +'-summary.json').then(response => (this.summary = response.data))
            },
        },
        filters: {
            reverse(items) {
                return items.splice().reverse()
            }
        }
    }
</script>
