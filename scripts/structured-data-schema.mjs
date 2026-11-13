// Strict local contract for emitted Schema.org vocabulary, not a search-engine certification.
const text = {type:'string',minLength:1};
const url = {type:'string',format:'absolute-url'};
const object = (properties, required=Object.keys(properties)) => ({type:'object',properties,required,additionalProperties:false});
const typed = (type, properties, required=Object.keys(properties)) => object({'@type':{const:type},...properties},['@type',...required]);
const ref = object({'@id':url});
const organization = typed('EducationalOrganization', {'@id':url,name:text,url,logo:url,contactPoint:typed('ContactPoint',{telephone:{type:'string',pattern:'^\\+[0-9]{8,15}$'},contactType:text}),sameAs:{type:'array',minItems:1,items:url}},['@id','name','url','logo','contactPoint']);
const website = typed('WebSite',{'@id':url,name:text,url,inLanguage:{const:'en'},publisher:ref});
const breadcrumb = typed('BreadcrumbList',{'@id':url,itemListElement:{type:'array',minItems:2,items:typed('ListItem',{position:{type:'integer',minimum:1},name:text,item:url})}});
const person = typed('Person',{'@id':url,url,name:text,jobTitle:text,description:text,affiliation:typed('CollegeOrUniversity',{name:text})});
const faq = typed('FAQPage',{'@id':url,mainEntity:{type:'array',minItems:1,items:typed('Question',{name:text,acceptedAnswer:typed('Answer',{text})})}});
export default object({'@context':{const:'https://schema.org'},'@graph':{type:'array',minItems:2,items:{oneOf:[organization,website,breadcrumb,person,faq]}}});
