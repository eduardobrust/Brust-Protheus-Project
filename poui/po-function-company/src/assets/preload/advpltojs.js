(codeType, content)=> {
  if (codeType == 'urlprotheus') {
  sessionStorage['urlprotheus'] = content;
  console.log('urlprotheus', content);
  }
}