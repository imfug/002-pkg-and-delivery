function format_pdf(doc){
       let pdf = {
            info: {
            title: 'Packaging & Delivery',
            author: 'IMF User Group',
            creator: 'https://imfug.com',
            producer: 'IMFUG WG Supplementals, supplementals@imfug.com',
            subject: 'Best Practices',
            keywords: 'Definitions, Supplemental',
            pageSize: 'A4',
            pageOrientation: 'portrait',
            pageMargins: 20
        },
        header: {
            alignment: 'center',
            margin: [0, 20, 0, 10],
            fontSize: 11,
            svg: '<svg width="300" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 68.58 23.26"><defs><style>.cls-1{fill:#004e8b;}.cls-2{fill:url(#linear-gradient);}.cls-3{fill:url(#linear-gradient-2);}</style><linearGradient id="linear-gradient" x1="25.51" y1="3.9" x2="68.31" y2="21.57" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#004e8b"/><stop offset="1" stop-color="#00aeef"/></linearGradient><linearGradient id="linear-gradient-2" x1="31.61" y1="7.53" x2="52.71" y2="7.53" xlink:href="#linear-gradient"/></defs><title>logo-hpa</title><polygon class="cls-1" points="18.25 8.98 6.59 8.98 6.59 0 0 0 0 23.26 6.59 23.26 6.59 13.86 18.25 13.86 18.25 23.26 24.84 23.26 24.84 0 18.25 0 18.25 8.98"/><path class="cls-2" d="M57.17,0H38a11.51,11.51,0,0,1,5.52,1.12c2.1,1.2,3.23,3.39,3.23,6.36s-1.16,5.17-3.29,6.3S38.8,15,35.7,15H31.27v8.3H44.19l2.16-4.72H59l2.07,4.72h7.5ZM48.52,14.05l4.39-9,4,9Z"/><path class="cls-3" d="M40.09,7.46c0-2.42-1.55-2.87-4.81-2.87h-4v5.88h4C38.6,10.47,40.09,9.89,40.09,7.46Z"/></svg>' 
        },
        footer: {
            stack: [ doc.footer,
            'License: CC 4.0'
            ],
            alignment: 'center',
            margin: [0, 5, 0, 5],
            fontSize: 11
        },
        content: [],
        styles: {
            titleStyle: {
                bold: true,
                margin: [0, 50, 0, 0],
                fontSize: 26,
                color: '#044c8c'  
            },
            subtitleStyle: {
                bold: false,
                margin: [0, 2, 0, 0],
                fontSize: 18,
                color: '#048cd4' 
            },
            versionStyle: {
                bold: false,
                margin: [0, 2, 0, 0],
                fontSize: 16,
                color: '#1d704c'
            },
            sectionStyle: {
                bold: true,
                margin: [0, 15, 0, 0],
                fontSize: 14,
                color: '#004e8b'
            },            
            termStyle: {
                bold: true,
                margin: [0, 10, 0, 0],
                fontSize: 13,
                color: '#0479b8'
            },
            defaultStyle: {
                fontSize: 11, 
                bold: false,
                margin: [0, 2, 0, 0]
            }
        }                 
    }
    pdf.content.push({
        text: doc.title,
        style: 'titleStyle'  
    })
    pdf.content.push({
        text: doc.subtitle,
        style: 'subtitleStyle'       
    })
    pdf.content.push({
        text: doc.version,
        style: 'versionStyle'
    })
    for(var i = 0; i < doc.sections.length; i++) {
        var sec = doc.sections[i];
        pdf.content.push({
            text: sec.position + ". " + sec.heading,
            style: 'sectionStyle'       
        })
        pdf.content.push({
            text: sec.body,
            style: 'defaultStyle'
        })
        for(var d = 0; d < doc.definitions.length; d++) {
            var def = doc.definitions[d];
            if (sec.position === 4) {
                if (!def.anti) {
                    pdf.content.push({
                        stack: [
                        { text: def.term, style: 'termStyle'},
                        { text: def.definition, style: 'defaultStyle'}
                        ],
                        unbreakable: true
                    })
                }                
            }
           if (sec.position === 5) {
                if (def.anti) {
                    pdf.content.push({
                        stack: [
                        { text: def.term, style: 'termStyle'},
                        { text: def.definition, style: 'defaultStyle'}
                        ],
                        unbreakable: true
                    })
                }                 
            }            
        }     
    }
    return pdf   
}

export {
    format_pdf
}