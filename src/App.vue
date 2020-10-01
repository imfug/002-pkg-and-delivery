<template>
  <div>
    <div>
      <img alt="UG-Logo" src="./assets/logo.svg" width="300">  
    </div>
    <br/>
    <div> 
      <h1>{{ title }} <br/>
      <small class="text-muted">{{ subtitle }}</small>
      </h1>
      <div>
      <span class="badge badge-success">Version {{ version }}</span>
      <span class="badge badge-warning">Status:{{ status }}</span>     
      <button type="button" class="badge badge-info" @click="createPDF">Download PDF</button></div>    
      </div>
    <section>
      <div v-for="sec in section" v-bind:key="sec">
          <h3>{{ sec.position }}. {{ sec.heading }}</h3>
          <p style="margin: 5px 0px 15px 0px;" v-html="sec.body"></p>
          <div v-for="def in definition" v-bind:key="def">        
            <div v-if="sec.position === 4">
            <div style="margin: 5px 0px 15px 0px;" v-if="!def.anti">
                <strong style="color: #0479b8;">{{ def.term }}</strong>
                <p style="white-space: pre-wrap;margin-top: 10px;">{{ def.definition }}</p>                 
            </div>
            </div>
            <div v-if="sec.position === 5">
            <div style="margin: 25px 0px 15px 0px;" v-if="def.anti">
                <strong style="color: #0479b8;">{{ def.term }}</strong>
                <p style="white-space: pre-wrap;margin-top: 10px;">{{ def.definition }}</p>                 
            </div>
            </div>          
          </div>
      </div>
    </section>    
  </div>
  <div class="footer">
  <center>
    <p><strong>{{ copyright }}</strong></p>
    <p><a v-bind:href="license" target="_blank">License</a></p>
  </center>
  </div>  
</template>
<script>
import definitions from './data/definitions.json'
import sections from './data/sections.json'
import { format_pdf } from './tools/pdf'
import pdfMake from 'pdfmake'
import pdfFonts from './js/vfs_fonts.js'

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  name: 'App',
  props: {},
  data(){
    return{
      title: "Packaging and Delivery",
      subtitle: "IMFUG | Best Practices",
      author: "IMF User Group",
      creator: "https://imfug.com",
      producer: "IMFUG WG Supplementals, supplementals@imfug.com",
      subject: "Best Practices",
      keywords: "Definitions, Supplemental",
      copyright: "© 2019 Hollywood Professional Association.",
      license: "https://creativecommons.org/licenses/by-nd/4.0",
      logo: "./assets/logo.png",
      version: 1.0,
      status: "Draft",
      definition: definitions,
      section: sections,
      doc: {}
    }
  },
  methods: {
    createPDF() {
      this.createDoc()
      this.downloadPDF()
    },
    createDoc() {
      this.doc.header = this.subtitle,
      this.doc.footer = this.copyright,
      this.doc.logo = this.logo,
      this.doc.title = this.title,
      this.doc.subtitle = this.subtitle,
      this.doc.version = "Version " + this.version,
      this.doc.sections = this.section,
      this.doc.definitions = this.definition
    },
    downloadPDF() {
        let docDefinition = format_pdf(this.doc)
        let filename = "imfug-002-bp-packaging-and-delivery-" + this.version + ".pdf"
        pdfMake.createPdf(docDefinition).download(filename)
    }    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
<style scoped>
h1 {
  size: 8pt;
  color: #044c8c;
}
h2 {
  size: 8pt;
  color: darkslategrey;
}
h3 {
  margin: 40px 0 0;
  color: #004e8b;  
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #2f5496;
}
.pre-formatted {
  white-space: pre-wrap;
}
</style>