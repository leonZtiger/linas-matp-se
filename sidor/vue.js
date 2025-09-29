const app = Vue.createApp({
    data() {
        return {
            projects: [],
            filterProjects:''
        }
    },
    computed: {
        numberOfProjects() {
            return this.projects.length
        },
        projectSearch() {
            // return this.projects.filter(projects => projects.Titel.includes(this.filterProjects))
            return this.projects.filter(projects =>
                projects.Titel.toLowerCase().includes(this.filterProjects.toLowerCase()) ||
                projects.Kund.toLowerCase().includes(this.filterProjects.toLowerCase()) ||
                projects.Beskrivning.toLowerCase().includes(this.filterProjects.toLowerCase())) 
        }
    },
    created() {
        axios.get('alexandraProjekt.json').then((response) => { this.projects = response.data })
    }
});

app.mount('#app');