const app = Vue.createApp({
    data() {
        return {
            projects: [],
            filterProjects: '',
            sortBy: false
        }
    },
    computed: {
        numberOfProjects() {
            return this.projects.length
        },
        projectSearchAndSort() {
            let result = [...this.projects];
            if (this.filterProjects) {
                const searchTerm = this.filterProjects.toLowerCase();
                result = result.filter(projects =>
                    projects.Titel.toLowerCase().includes(searchTerm) ||
                    projects.Kund.toLowerCase().includes(searchTerm) ||
                    projects.Beskrivning.toLowerCase().includes(searchTerm));
            }

            if(this.sortBy) {
                result.sort((a, b) => 
                a.Titel.localeCompare(b.Titel));
            }

            return result;
        },
    },
    methods: {
        sortByTitle() {
            this.sortBy = !this.sortBy;
        }
    },
    created() {
        axios.get('alexandraProjekt.json').then((response) => { this.projects = response.data })
    }
});

app.mount('#app');