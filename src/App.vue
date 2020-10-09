<template>
  <div>
    <div class="spacer"> 
      <img alt="UG-Logo" src="./assets/logo.svg" width="300">  
    </div>
    <div> 
      <h1>{{ title }}<br/>
      <small class="text-muted">{{ subtitle }}</small>
      </h1>
      <div>
        <span class="ug-badge-version">Version {{ version }}</span>
        <span class="ug-badge-status">Status:{{ status }}</span>     
        <button type="button" class="ug-button" @click="createPDF"><i class="fa fa-download"></i> Download PDF</button>
        <a href="https://github.com/imfug/002-pkg-and-delivery"><button type="button" class="ug-button-git"><i class="fa fa-git"></i> Repsoitory</button></a>
      </div>    
     </div>
    <section>
      <div v-for="sec in section" v-bind:key="sec">
          <h3>{{ sec.position }}. {{ sec.heading }}</h3>
          <p style="margin: 5px 0px 15px 0px;" v-html="sec.body"></p>
          <div v-for="def in definition" v-bind:key="def">        
            <div v-if="sec.position === 4">
              <div style="margin: 25px 0px 15px 0px;"  v-if="!def.anti">
                  <strong style="color: #0479b8;">{{ def.term }}</strong>
                  <p>{{ def.definition }}</p>                 
              </div>
            </div>
            <div v-if="sec.position === 5">
              <div style="margin: 25px 0px;" v-if="def.anti">
                  <strong style="color: #0479b8;">{{ def.term }}</strong>
                  <p>{{ def.definition }}</p>                 
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

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
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
  margin: 0 4em;
  position: absolute;
  width: 100%;
  max-width: 667px;
  white-space: pre-wrap;
  font-family: Arial, Helvetica, sans-serif;     
}
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
a {
  color: #2f5496;
}
.pre-formatted {
  white-space: pre-wrap;
}
.text-muted {
  color: #6c757d !important;
}
.ug-badge-version {
  background-color: #5cb85c;  
  color: white;
  border: 2px solid  #5cb85c;  
  padding: 5px 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  font-weight: bold;  
  margin: 5px; 
}
.ug-badge-status {
  background-color: #f0ad4e; 
  color: white;
  border: 2px solid #f0ad4e;  
  padding: 5px 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  font-weight: bold;
  margin: 5px; 
}
.ug-button {
  background-color: white;
  color: black; 
  border: 2px solid #0479b8;  
  padding: 5px 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  font-weight: bold;
  margin: 5px;
  cursor: pointer;
}
.ug-button:hover {
  transform: scale(1.1);
}
.ug-button-git {
  background-color: black;
  color: white; 
  border: 2px solid black;  
  padding: 5px 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  font-weight: bold;  
  margin: 5px;
  cursor: pointer;
}
.ug-button-git:hover {
  transform: scale(1.1);
}
.spacer {
  padding-top: 15px;
}
.term-color {
  color: #0479b8;
}
</style>